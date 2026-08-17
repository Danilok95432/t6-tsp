import React, { type FC, type InputHTMLAttributes, memo } from 'react'
import { IMaskInput, type IMaskInputProps } from 'react-imask'
import styled from 'styled-components'

import { SearchTableIconSvg } from 'src/UI/icons/searchTableIconSVG'
import { DateTableIconSvg } from 'src/UI/icons/dateTableIconSVG'

type TableSearchProps = {
	handleSearch: (e: string) => void
}

type StyledTableSearchProps = {
	$variant?: 'text' | 'date'
}

type InputProps = InputHTMLAttributes<HTMLInputElement>
type MaskProps = IMaskInputProps<HTMLInputElement>

const StyledTableSearchInput = styled.div<StyledTableSearchProps>`
	position: relative;

	input {
		width: 100%;
		height: 35px;
		border: 1px solid #afafaf;
		border-radius: 3px;
		font-size: 14px;
		padding: ${({ $variant }) => {
			if ($variant === 'date') return '0 30px 0 10px'
			return '0 10px 0 30px'
		}};
		background: ${({ $variant }) => {
			if ($variant === 'date') return '0 30px 0 10px'
			return '0 10px 0 30px'
		}};
	}

	span {
		height: 15px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		${({ $variant }) =>
			$variant === 'date'
				? `
					right: 10px; 
				`
				: `
					left: 10px; 
				`}
	}
`

export const TableSearchInput: FC<
	(InputProps | MaskProps) & TableSearchProps & StyledTableSearchProps
> = memo(({ handleSearch, $variant, ...rest }) => {
	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleSearch(e.currentTarget.value.toLowerCase())
	}

	if ($variant === 'date')
		return (
			<StyledTableSearchInput $variant={$variant}>
				<span>
					<DateTableIconSvg />
				</span>
				<IMaskInput onChange={onChangeSearchInput} {...(rest as MaskProps)} />
			</StyledTableSearchInput>
		)

	return (
		<StyledTableSearchInput $variant={$variant}>
			<span>
				<SearchTableIconSvg />
			</span>
			<input onChange={onChangeSearchInput} {...(rest as InputProps)} />
		</StyledTableSearchInput>
	)
})

TableSearchInput.displayName = 'TableSearchInput'
