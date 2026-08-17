import React, { type FC, type ReactNode } from 'react'
import styled from 'styled-components'
import { AddFIlePlusSvg } from 'src/UI/icons/addFIlePlusSVG'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type StyledAddButtonProps = {
	children: ReactNode
	icon?: ReactNode
	$margin?: string
	$padding?: string
}

const StyledAddButton = styled.button<StyledAddButtonProps>`
	margin: ${({ $margin }) => $margin ?? '0'};
	padding: ${({ $padding }) => $padding ?? '0'};
	background: none;
	display: flex;
	align-items: center;
	gap: 6px;
	span {
		border-bottom: 1px dotted #002c47;
		font-size: 14px;
		font-weight: 600;
		color: #002c47;
	}
	svg {
		min-width: 13px;
	}
`

export const AddButton: FC<StyledAddButtonProps & ButtonProps> = ({
	children,
	$margin,
	$padding,
	icon,
	...props
}) => {
	return (
		<StyledAddButton type='button' $margin={$margin} $padding={$padding} {...props}>
			{icon ?? <AddFIlePlusSvg />}
			<span>{children}</span>
		</StyledAddButton>
	)
}
