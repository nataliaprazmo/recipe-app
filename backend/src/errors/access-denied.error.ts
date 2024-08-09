export class AccessDeniedError extends Error {
	constructor(what: string, id: string) {
		super(`Access denied to ${what} ${id}`);
		this.name = `${what}AccessDeniedError`;
	}
}
