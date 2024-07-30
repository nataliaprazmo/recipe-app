import Fastify from "fastify";

const fastify = Fastify();

const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || "127.0.0.1";

fastify.get("/", async (request, reply) => {
	return { message: "Hello!" };
});

const start = async () => {
	try {
		await fastify.listen({ port, host });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
