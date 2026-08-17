import { type FC } from 'react'

type AddSupportRequestSVGProps = {
	active?: boolean
}

export const AddSupportRequestSVG: FC<AddSupportRequestSVGProps> = ({ active }) => {
	return (
		<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect
				width='12.9981'
				height='0.60658'
				transform='matrix(0 -1 0.999995 0.00305792 6.5625 13.5)'
				fill={active ? 'black' : 'white'}
				stroke={active ? 'black' : 'white'}
				strokeLinejoin='round'
			/>
			<path
				d='M13.5 7.4375L0.501855 7.4375L0.5 6.83092L13.4981 6.83092L13.5 7.4375Z'
				fill={active ? 'black' : 'white'}
				stroke={active ? 'black' : 'white'}
				strokeLinejoin='round'
			/>
		</svg>
	)
}
