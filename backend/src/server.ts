"use strict";

import dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./plugins/prisma";
import metadataRoutes from "./routes/metadata.route";
import userRoutes from "./routes/user.route";
import { recipeRoutes } from "./routes/recipe.route";
import { ingredientRoutes } from "./routes/ingredient.route";
import auth from "./plugins/auth";
import authRoutes from "./routes/auth.route";

const fastify = Fastify({
	logger: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
});

// allow frontend
fastify.register(cors, {
	origin: "http://localhost:3000",
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
	credentials: true,
});

// register plugins
fastify.register(prisma);
fastify.register(auth);

// register routes
fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(metadataRoutes, { prefix: "/api" });
fastify.register(userRoutes, { prefix: "/api/users" });
fastify.register(ingredientRoutes, { prefix: "/api/ingredients" });
fastify.register(recipeRoutes, { prefix: "/api/recipes" });

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
		console.log(fastify.printRoutes());
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
