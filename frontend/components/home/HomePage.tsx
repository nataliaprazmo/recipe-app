import Button from "../Button";
import NavContainer from "../nav/NavContainer";
import Hero from "./Hero";

export default function HomePage() {
	return (
		<>
			<NavContainer>
				<Button
					variant="filled"
					color="primary"
					size="large"
					text="Get started"
				/>
			</NavContainer>{" "}
			<Hero />
		</>
	);
}
