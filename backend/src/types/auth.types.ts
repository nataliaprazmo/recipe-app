export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthResult {
	success: boolean;
	user?: {
		id: string;
		email: string;
	};
	token?: string;
	error?: string;
}
