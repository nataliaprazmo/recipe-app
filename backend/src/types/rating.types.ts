import { Rating } from "@prisma/client";

export type CreateRatingInput = Omit<Rating, "id">;

export type RatingBase = Pick<Rating, "recipeId" | "userId">;
