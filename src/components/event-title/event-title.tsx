import React, { type FC } from 'react'
import styled from 'styled-components'

type EventTitleInnerProps = {
	title: string
	dates: [string, string]
	address: string
}
type EventTitleProps = {
	$margin?: string
	className?: string
} & React.CSSProperties

const StyledEventTitle = styled.div<EventTitleProps>`
	padding: 0 0 23px;
	border-bottom: 1px solid #e3dddd;
	max-width: 970px;
	margin: ${({ $margin }) => $margin ?? '0 0 30px 0'};
	h2 {
		color: #000000;
		font-size: 25px;
		font-weight: 700;
		margin-bottom: 5px;
		line-height: 1.6;
	}
	p {
		font-size: 14px;
		color: #000000;
	}
`

export const EventTitle: FC<EventTitleProps & EventTitleInnerProps> = ({
	title,
	dates,
	address,
	className,
	$margin,
}) => {
	return (
		<StyledEventTitle className={className} $margin={$margin}>
			<h2>{title}</h2>
			<p>
				{dates[0]} — {dates[1]}, {address}
			</p>
		</StyledEventTitle>
	)
}
