import NavContainer from "../nav/nav-container";
import Button from "../ui/button";
import SignupContainer from "./SignupContainer";

export default function SignIn() {
	return (
		<div className="mb-12">
			<NavContainer logoDark={false}>
				<Button
					variant="filled"
					color="secondary"
					size="medium"
					link="/signup"
					text="Sign up"
				/>
			</NavContainer>
			<SignupContainer
				page="signin"
				title="Welcome back!"
				text="Sign in to access your saved recipes, discover new culinary delights, and join our vibrant food-loving community. Your next favorite dish awaits!"
			/>
		</div>
	);
}
