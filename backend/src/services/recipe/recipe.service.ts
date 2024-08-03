import { PrismaClient } from "@prisma/client";
import {
	BasicRecipe,
	CreateRecipeInput,
	FullRecipe,
	UpdateRecipeInput,
} from "../../types/recipe.types";
import { RecipeCreator } from "./recipe-creator.service";
import { RecipeReader } from "./recipe-reader.service";
import { RecipeEditor } from "./recipe-editor.service";
import { RecipeRemover } from "./recipe-remover.service";

export class RecipeService {
	private recipeCreator: RecipeCreator;
	private recipeReader: RecipeReader;
	private recipeEditor: RecipeEditor;
	private recipeRemover: RecipeRemover;

	constructor(private prisma: PrismaClient) {
		this.recipeCreator = new RecipeCreator(prisma);
		this.recipeReader = new RecipeReader(prisma);
		this.recipeEditor = new RecipeEditor(prisma);
		this.recipeRemover = new RecipeRemover(prisma);
	}

	async createRecipe(
		input: CreateRecipeInput,
		ownerId: string
	): Promise<FullRecipe> {
		return await this.recipeCreator.createRecipe(input, ownerId);
	}

	async getRecipeById(
		id: string,
		userId?: string
	): Promise<FullRecipe | null> {
		return await this.recipeReader.getRecipeById(id, userId);
	}

	async getRecipesByUser(
		userId: string,
		includePrivate: boolean = true
	): Promise<BasicRecipe[]> {
		return await this.recipeReader.getRecipesByUser(userId, includePrivate);
	}

	async getRecipeOfTheDay(): Promise<BasicRecipe | null> {
		return await this.recipeReader.getRecipeOfTheDay();
	}

	async getPublicRecipes(
		limit?: number,
		offset?: number
	): Promise<BasicRecipe[]> {
		return await this.recipeReader.getPublicRecipes(limit, offset);
	}

	async updateRecipe(
		id: string,
		input: UpdateRecipeInput,
		userId: string
	): Promise<FullRecipe> {
		return await this.recipeEditor.updateRecipe(id, input, userId);
	}

	async toggleRecipePrivacy(id: string, userId: string): Promise<FullRecipe> {
		return await this.recipeEditor.toggleRecipePrivacy(id, userId);
	}

	async deleteRecipe(id: string, userId: string): Promise<void> {
		return await this.recipeRemover.deleteRecipe(id, userId);
	}
}
