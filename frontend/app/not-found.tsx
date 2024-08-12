import Button from "@/components/Button";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-h2 font-bold text-grey-800">
				404 - Page not found
			</h2>
			<p className="mt-3 mb-12 text-p3 text-grey-700 font-medium">
				Oops! The page you&apos;re looking for does not exist.
			</p>
			<Button
				color="primary"
				size="medium"
				text="Go back home"
				variant="filled"
				link="/"
			/>
		</div>
	);
}
