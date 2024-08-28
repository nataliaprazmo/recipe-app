import { ApiError } from "./api-error";

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export class ApiClient {
	private baseURL: string;

	constructor(baseURL: string = API_BASE_URL) {
		this.baseURL = baseURL;
	}

	async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
		const url = `${this.baseURL}${endpoint}`;

		const config: RequestInit = {
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			...options,
		};

		const response = await fetch(url, config);
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

	get<T>(endpoint: string): Promise<T> {
		return this.request<T>(endpoint, {
			method: "GET",
		});
	}

	post<T>(endpoint: string, data: unknown): Promise<T> {
		return this.request<T>(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}
}

export const apiClient = new ApiClient();
