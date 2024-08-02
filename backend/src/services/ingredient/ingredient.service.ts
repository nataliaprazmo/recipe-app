import { Ingredient, PrismaClient } from "@prisma/client";
import {
	CreateIngredientInput,
	ResolvedIngredient,
} from "../../types/ingredient.types";
import { IngredientResolver } from "./ingredientResolver.service";
import { IngredientCreator } from "./ingredient-creator.service";
import { IngredientReader } from "./ingredientReader.service";
import { IngredientNormalizer } from "./ingredient-normalizer.service";

type PrismaTransactionClient = Parameters<
	Parameters<PrismaClient["$transaction"]>[0]
>[0];

export class IngredientService {
	private resolver: IngredientResolver;
	private creator: IngredientCreator;
	private reader: IngredientReader;
	private normalizer: IngredientNormalizer;

	constructor(private prisma: PrismaClient) {
		this.resolver = new IngredientResolver();
		this.creator = new IngredientCreator(prisma);
		this.reader = new IngredientReader(prisma);
		this.normalizer = new IngredientNormalizer();
	}

	async resolveIngredients(
		ingredientInputs: CreateIngredientInput[],
		tx: PrismaTransactionClient
	): Promise<ResolvedIngredient[]> {
		return await this.resolver.resolveIngredients(ingredientInputs, tx);
	}

	async createIngredient(input: CreateIngredientInput): Promise<Ingredient> {
		return await this.creator.createIngredient(input);
	}

	async createManyIngredients(
		inputs: CreateIngredientInput[]
	): Promise<Ingredient[]> {
		return await this.creator.createManyIngredients(inputs);
	}

	async getIngredientById(id: string): Promise<Ingredient | null> {
		return await this.reader.getIngredientById(id);
	}

	async getIngredientByName(name: string): Promise<Ingredient | null> {
		return await this.reader.getIngredientByName(name);
	}

	async getIngredientsByNames(names: string[]): Promise<Ingredient[]> {
		return await this.reader.getIngredientsByNames(names);
	}

	async getAllIngredients(
		limit?: number,
		offset?: number
	): Promise<Ingredient[]> {
		return await this.reader.getAllIngredients(limit, offset);
	}

	async searchIngredients(
		searchTerm: string,
		limit?: number
	): Promise<Ingredient[]> {
		return await this.reader.searchIngredients(searchTerm, limit);
	}

	async getIngredientsCount(): Promise<number> {
		return await this.reader.getIngredientsCount();
	}

	normalizeIngredientName(name: string): string {
		return this.normalizer.normalizeIngredientName(name);
	}

	validateIngredientName(name: string): boolean {
		return this.normalizer.validateIngredientName(name);
	}

	formatIngredientNameForDisplay(name: string): string {
		return this.normalizer.formatIngredientNameForDisplay(name);
	}
}
