const Pentacle: React.FC<{
	size: number;
	radius: number;
	imageSrc: string;
}> = ({ size, radius, imageSrc }) => {
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
		<>
			<svg width={size} height={size}>
				<defs>
					<clipPath id="pentacleClipPath">
						<path d={pathData} />
					</clipPath>
				</defs>
				<image
					href={imageSrc}
					width={size}
					height={size}
					clipPath="url(#pentacleClipPath)"
					preserveAspectRatio="xMidYMid slice"
				/>
			</svg>
			<svg
				width={size}
				height={size}
				style={{ position: "absolute", top: 0, left: 0 }}
			>
				<path
					d={pathData}
					fill="black"
					opacity="0.15"
					clipPath="url(#pentacleClipPath)"
				/>
			</svg>
		</>
	);
};

export default Pentacle;
