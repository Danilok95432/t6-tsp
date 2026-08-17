import { type FC } from 'react'

type PlusIconSvgProps = {
	fill?: string
}

export const PlusIconSvg: FC<PlusIconSvgProps> = ({ fill = '#113770' }) => {
	return (
		<svg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect
				width='15'
				height='0.7'
				transform='matrix(0 -1 0.999995 0.00305792 7.99823 16)'
				fill={fill}
				stroke={fill}
				strokeWidth='0.5'
			/>
			<path
				d='M16.0021 9L1.00214 9L0.999997 8.3L16 8.3L16.0021 9Z'
				fill={fill}
				stroke={fill}
				strokeWidth='0.5'
			/>
		</svg>
	)
}
