export class NotFoundError extends Error {
	constructor(what: string, id: string) {
		super(`${what} with id ${id} not found`);
		this.name = `${what}NotFoundError`;
	}
}
