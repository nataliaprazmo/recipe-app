import { apiClient } from "../../api/api-client";

export async function getFromEndpoint<T>(endpoint: string): Promise<T> {
	return apiClient.get(endpoint);
}

export async function getFromEndpointById<T>(
	getEndpoint: (id: string) => string,
	id: string
): Promise<T> {
	return apiClient.get(getEndpoint(id));
}

export async function searchFromEndpoint<T>(
	getSearchEndpoint: (term: string) => string,
	searchTerm: string
): Promise<T> {
	return apiClient.get(getSearchEndpoint(searchTerm));
}
