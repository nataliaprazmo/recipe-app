import Fastify from "fastify";
import prisma from "./plugins/prisma";
import fastifyJwt from "@fastify/jwt";
import metadataRoutes from "./routes/metadata.route";
import userRoutes from "./routes/user.route";

const fastify = Fastify();

// register plugins
fastify.register(prisma);

declare module "@fastify/jwt" {
	interface FastifyJWT {
		user: {
			id: string;
			email: string;
		};
	}
}

// register routes
fastify.register(metadataRoutes, { prefix: "/api" });
fastify.register(userRoutes, { prefix: "/api/users" });

const port = parseInt(process.env.PORT || "5000");
const host = process.env.HOST || "127.0.0.1";

fastify.get("/", async (request, reply) => {
	return { message: "Welcome to the FOODI App!" };
});

const listeners = ["SIGINT", "SIGTERM"];
listeners.forEach((signal) => {
	process.on(signal, async () => {
		await fastify.close();
		process.exit(0);
	});
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
