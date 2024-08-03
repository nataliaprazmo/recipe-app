export class ValidationError extends Error {
	constructor(public errors: string[]) {
		super(`Validation failed: ${errors.join(", ")}`);
		this.name = "ValidationError";
	}
}
