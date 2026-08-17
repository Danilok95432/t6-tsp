import { type FC, type PropsWithChildren } from 'react'
import styled from 'styled-components'

type ContainerProps = PropsWithChildren<{
	$padding?: string
	$paddingMobile?: string
	$width?: string
	$margin?: string
	$position?: string
	className?: string
}>

const StyledContainer = styled.div<ContainerProps>`
	max-width: ${({ $width }) => $width ?? '1920px'};
	padding: ${({ $padding }) => $padding ?? '0 30px'};
	margin: ${({ $margin }) => $margin ?? '0 auto'};
	position: ${({ $position }) => $position ?? 'relative'};
	@media (max-width: 768px) {
		padding: ${({ $paddingMobile }) => $paddingMobile ?? '0 15px'};
	}
`
export const Container: FC<ContainerProps> = (props) => {
	return <StyledContainer {...props} />
}
