import React, { type FC, type ReactNode } from 'react'

import styled from 'styled-components'

type CustomTextProps = {
	children: string | ReactNode
	className?: string
	$margin?: string
	$padding?: string
	$fontSize?: string
	$fontWeight?: string
	$lineHeight?: string
	$fontStyle?: string
	$maxWidth?: string
	$color?: string
} & React.CSSProperties

const StyledCustomText = styled.p<CustomTextProps>`
	margin: ${({ $margin }) => $margin ?? '0'};
	padding: ${({ $padding }) => $padding ?? '0'};
	font-size: ${({ $fontSize }) => $fontSize ?? '14px'};
	font-weight: ${({ $fontWeight }) => $fontWeight ?? '400'};
	line-height: ${({ $lineHeight }) => $lineHeight};
	font-style: ${({ $fontStyle }) => $fontStyle ?? 'normal'};
	max-width: ${({ $maxWidth }) => $maxWidth ?? 'initial'};
	color: ${({ $color }) => $color ?? '#000000'};
`

export const CustomText: FC<CustomTextProps> = ({ children, className, ...props }) => {
	return (
		<StyledCustomText className={className} {...props}>
			{children}
		</StyledCustomText>
	)
}
