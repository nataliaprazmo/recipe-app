import { cookies } from "next/headers";
import { ApiError } from "./api-error";

const DEFAULT_API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiClientConfig {
	baseURL?: string;
	defaultHeaders?: Record<string, string>;
}

export class ApiClient {
	private readonly baseURL: string;
	private readonly defaultHeaders: Record<string, string>;

	constructor({
		baseURL = DEFAULT_API_BASE_URL,
		defaultHeaders = { "Content-Type": "application/json" },
	}: ApiClientConfig = {}) {
		this.baseURL = baseURL;
		this.defaultHeaders = defaultHeaders;
	}

	private isServer(): boolean {
		return typeof window === "undefined";
	}

	private async getAuthHeaders(): Promise<Record<string, string>> {
		if (!this.isServer()) return {};
		try {
			const cookieStore = await cookies();
			const token = cookieStore.get("token");
			return token ? { Cookie: `token=${token.value}` } : {};
		} catch (error) {
			console.warn("Could not access cookies:", error);
			return {};
		}
	}

	private async buildRequestConfig(
		options: RequestInit
	): Promise<RequestInit> {
		const authHeaders = await this.getAuthHeaders();

		const headers: Record<string, string> = {
			...this.defaultHeaders,
			...(options.headers as Record<string, string>),
			...authHeaders,
		};

		const config: RequestInit = {
			...options,
			headers,
		};

		if (!this.isServer()) {
			config.credentials = "include";
		}

		return config;
	}

	private async handleResponse<T>(response: Response): Promise<T> {
		const data = await response.json();
		if (!response.ok) {
			throw new ApiError(
				response.status,
				data.message || "API Error",
				data
			);
		}
		return data;
	}

	async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;
		const config = await this.buildRequestConfig(options);
		const response = await fetch(url, config);
		return this.handleResponse<T>(response);
	}

	get<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}

	post<T>(
		endpoint: string,
		data: unknown,
		options?: RequestInit
	): Promise<T> {
		return this.request<T>(endpoint, {
			...options,
			method: "POST",
			body: JSON.stringify(data),
		});
	}
}

export const apiClient = new ApiClient();
