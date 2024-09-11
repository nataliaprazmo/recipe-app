import NavContainer from "../nav/nav-container";
import Button from "../ui/button";
import SignupForm from "./sign-up-form";
import SignupContainer from "./signup-container";

export default function SignUp() {
	return (
		<div className="mb-12">
			<NavContainer logoDark={false}>
				<Button
					variant="filled"
					color="secondary"
					size="medium"
					link="/signin"
					text="Sign in"
				/>
			</NavContainer>
			<SignupContainer
				page="signup"
				title="Join Our Culinary Community!"
				text="Sign up to explore a world of delicious recipes, save your favorites, and share your culinary creations with others. Your culinary adventure starts here!"
			>
				<SignupForm />
			</SignupContainer>
		</div>
	);
}
