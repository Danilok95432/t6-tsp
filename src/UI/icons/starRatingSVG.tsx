import { type FC } from 'react'

type StarRatingSVGProps = {
	active?: boolean
	strokeColor?: string
	fillColor?: string
}

export const StarRatingSVG: FC<StarRatingSVGProps> = ({
	active = false,
	strokeColor = '#049CBD',
	fillColor = '#049CBD',
}) => {
	return (
		<svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			{/* Основной путь с заливкой и обводкой */}
			<path
				d='M11.9957 2.91122L14.1662 9.27415C14.2294 9.46229 14.3524 9.62456 14.5163 9.73618C14.6803 9.84779 14.8763 9.90261 15.0743 9.89226H22.1308L16.4366 13.7555C16.2727 13.8679 16.1503 14.0311 16.0879 14.2199C16.0256 14.4087 16.0269 14.6128 16.0915 14.8008L18.2529 21.091L12.5315 17.146C12.3772 17.0461 12.1976 16.9925 12.0138 16.9915C11.8302 16.9935 11.6509 17.047 11.4962 17.146L5.77478 21.091L7.9362 14.8008C8.00083 14.6128 8.00208 14.4087 7.93975 14.2199C7.87741 14.0311 7.75494 13.8679 7.5911 13.7555L1.90602 9.8559H8.96243C9.15281 9.85639 9.33854 9.79698 9.49336 9.68606C9.64818 9.57515 9.76425 9.41833 9.82518 9.23779L11.9866 2.94758Z'
				fill={active ? fillColor : 'none'}
				stroke={strokeColor}
				strokeWidth='1.5'
			/>
		</svg>
	)
}
