export default function ImageSkeleton() {
	return (
		<div className="w-full aspect-[895/500] bg-gray-200 rounded-3xl lg:rounded-4xl shadow-s2 animate-pulse">
			<div className="w-full h-full flex items-center justify-center">
				<div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
			</div>
		</div>
	);
}
