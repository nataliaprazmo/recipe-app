import { CreateStepInput } from "../../types/recipe-step.types";

export function validateSteps(
	steps: CreateStepInput[],
	errors: string[]
): void {
	if (!steps || steps.length === 0) {
		errors.push("At least one recipe step is required");
		return;
	}

	const stepNumbers = steps.map((s) => s.stepNumber).sort((a, b) => a - b);
	const expected = Array.from({ length: steps.length }, (_, i) => i + 1);
	if (!arraysEqual(stepNumbers, expected)) {
		errors.push("Step numbers must be sequential starting from 1");
	}

	steps.forEach((step, index) => {
		const position = index + 1;

		if (!step.name?.trim()) {
			errors.push(`Step ${position}: name is required`);
		} else if (step.name.trim().length > 255) {
			errors.push(
				`Step ${position}: name must be less than 255 characters`
			);
		}

		if (!step.bullets || step.bullets.length === 0) {
			errors.push(
				`Step ${position}: at least one instruction is required`
			);
		} else {
			step.bullets.forEach((bullet, bulletIndex) => {
				if (!bullet?.trim()) {
					errors.push(
						`Step ${position}, instruction ${
							bulletIndex + 1
						}: content is required`
					);
				} else if (bullet.trim().length > 1000) {
					errors.push(
						`Step ${position}, instruction ${
							bulletIndex + 1
						}: content must be less than 1000 characters`
					);
				}
			});
		}
	});
}

function arraysEqual(a: number[], b: number[]): boolean {
	return a.length === b.length && a.every((val, i) => val === b[i]);
}
