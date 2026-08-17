import styled from 'styled-components'
import React, { type FC, type ReactNode } from 'react'

type StyledGridRowProps = {
	$margin?: string
	$gap?: string
	$alignItems?: string
	$template?: string
	$mdTemplate?: string
	$mdGap?: string
	$maxWidth?: string
	$width?: string
	$padding?: string
	$borderBottom?: string
	children: ReactNode
	className?: string
} & React.CSSProperties

const StyledGridRow = styled.div<StyledGridRowProps>`
	margin: ${({ $margin }) => $margin ?? '0'};
	padding: ${({ $padding }) => $padding ?? '0'};
	border-bottom: ${({ $borderBottom }) => $borderBottom ?? 'none'};
	display: grid;
	gap: ${({ $gap }) => $gap ?? '10px'};
	max-width: ${({ $maxWidth }) => $maxWidth ?? '100%'};
	width: ${({ $width }) => $width ?? '100%'};
	align-items: ${({ $alignItems }) => $alignItems ?? 'start'};
	grid-template: ${({ $template, className }) =>
		className ? '' : ($template ?? 'auto / 1fr 1fr')};
	@media (max-width: 1024px) {
		grid-template: ${({ $mdTemplate }) => $mdTemplate ?? '1fr 1fr / 1fr'};
		gap: ${({ $mdGap, $gap }) => $mdGap ?? $gap ?? '10px'};
		align-items: center;
	}
`

export const GridRow: FC<StyledGridRowProps> = ({ children, ...props }) => {
	return <StyledGridRow {...props}>{children}</StyledGridRow>
}
