const Pentacle: React.FC<{
	imageSrc: string;
}> = ({ imageSrc }) => {
	const radius = 24;
	const size = 300;

	const midPoint = (2 / 3) * size;
	const pathData = `
    M ${radius},0 
    L ${size - radius},0 
    A ${radius},${radius} 0 0 1 ${size},${radius}
    L ${size},${midPoint - radius} 
    A ${radius},${radius} 0 0 1 ${size - radius},${midPoint} 
    L ${midPoint + 2 * radius},${midPoint} 
    A ${2 * radius},${2 * radius} 1 0 0 ${midPoint},${midPoint + 2 * radius} 
    L ${midPoint},${size - radius} 
    A ${radius},${radius} 0 0 1 ${midPoint - radius},${size}
    L ${radius},${size} 
    A ${radius},${radius} 0 0 1 0,${size - radius}
    L 0,${radius}
    A ${radius},${radius} 0 0 1 ${radius},0 
    Z
  `;
	return (
		<div className="w-full aspect-square relative">
			<svg
				viewBox="0 0 300 300"
				className="w-full h-full absolute top-0 left-0"
			>
				<defs>
					<clipPath id="pentacleClipPath">
						<path d={pathData} />
					</clipPath>
				</defs>
				<image
					href={imageSrc}
					width="100%"
					height="100%"
					clipPath="url(#pentacleClipPath)"
					preserveAspectRatio="xMidYMid slice"
				/>
			</svg>
			<svg
				viewBox="0 0 300 300"
				className="w-full h-full absolute top-0 left-0"
			>
				<path
					d={pathData}
					fill="black"
					opacity="0.15"
					clipPath="url(#pentacleClipPath)"
				/>
			</svg>
		</div>
	);
};

export default Pentacle;
