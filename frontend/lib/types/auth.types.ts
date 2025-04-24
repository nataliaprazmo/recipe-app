export type SignUpState = {
	errors?: {
		fullName?: string[];
		email?: string[];
		password?: string[];
		passwordConfirm?: string[];
		general?: string[];
	};
	message?: string | null;
};

export type SignInState = {
	errors?: {
		email?: string[];
		password?: string[];
		general?: string[];
	};
	message?: string | null;
};

export type User = {
	id: string;
	name: string;
	email: string;
	createdAt?: string;
	updatedAt?: string;
};

export type AuthResponse = {
	user: User;
	token?: string;
	message: string;
};
