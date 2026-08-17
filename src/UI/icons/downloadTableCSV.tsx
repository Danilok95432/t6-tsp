import { type FC } from 'react'

type DownloadTableCSVProps = {
	color?: string
}

export const DownloadTableCSV: FC<DownloadTableCSVProps> = ({ color = '#184F71' }) => {
	return (
		<svg width='18' height='15' viewBox='0 0 18 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clipPath='url(#clip0_3473_42866)'>
				<path
					d='M15.4839 0H2.41935C1.08387 0 0 1.08387 0 2.41935V14.2742C0 14.671 0.329032 15 0.725806 15H17.1774C17.5742 15 17.9032 14.671 17.9032 14.2742V2.41935C17.9032 1.08387 16.8194 0 15.4839 0ZM16.4516 2.41935V3.69677H5.21613V1.45161H15.4839C16.0161 1.45161 16.4516 1.8871 16.4516 2.41935ZM2.41935 1.45161H3.76452V3.69677H1.45161V2.41935C1.45161 1.8871 1.8871 1.45161 2.41935 1.45161ZM1.45161 5.14839H3.76452V13.5484H1.45161V5.14839ZM5.21613 13.5484V5.14839H16.4516V13.5484H5.21613Z'
					fill={color}
				/>
				<path
					d='M13.5134 6.15625H11.9166V10.2498H9.83594L12.1101 12.524C12.4488 12.8627 12.9908 12.8627 13.3295 12.524L15.6037 10.2498H13.523V6.15625H13.5134Z'
					fill={color}
				/>
			</g>
			<defs>
				<clipPath id='clip0_3473_42866'>
					<rect width='17.9032' height='15' fill='white' />
				</clipPath>
			</defs>
		</svg>
	)
}
