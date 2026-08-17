import React, { type FC, type ReactNode } from 'react'

import styled from 'styled-components'
import { AdminPromptIconSvg } from 'src/UI/icons/adminPromptIconSVG'

type PromptInputWrapperProps = {
	children: ReactNode
	className?: string
	$margin?: string
	$template?: string
	$padding?: string
	$maxWidth?: string
}

type PromptInputBtnProps = {
	promptContent: string | ReactNode
}

const StyledPromptInput = styled.div<PromptInputWrapperProps>`
	max-width: ${({ $maxWidth }) => $maxWidth ?? '100%'};
	margin: ${({ $margin }) => $margin ?? '0 0 20px 0'};
	grid-template: ${({ $template }) => $template ?? 'auto/minmax(405px, 1fr) 17px'};
	display: grid;
	align-items: start;
	column-gap: 10px;

	@media (max-width: 768px) {
		grid-template: auto/1fr 17px;
	}

	.prompt-content {
		display: none;
		position: absolute;
		left: 30px;
		background: #ffffff;
		border-radius: 5px;
		padding: 14px 17px;
		font-size: 13px;
		color: #000000;
		box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.15);
		&::before {
			content: '';
			position: absolute;
			width: 15px;
			height: 100%;
			left: -15px;
			background: transparent;
		}

		a {
			color: #002c47;
			border-bottom: 1px solid #89c2e5;
			font-weight: 600;
		}
	}

	.prompt-trigger {
		padding: ${({ $padding }) => $padding ?? '31px 0 0 0'};
		width: min-content;
		display: flex;
		align-items: center;
		position: relative;
		cursor: pointer;

		& > svg {
			width: 17px;
			height: 18px;
			cursor: pointer;
		}

		&:hover {
			.prompt-content {
				display: block;
				width: max-content;
			}
		}
	}
`

export const PromptInput: FC<PromptInputWrapperProps & PromptInputBtnProps> = ({
	children,
	promptContent,
	className,
	...props
}) => {
	return (
		<StyledPromptInput className={className} {...props}>
			{children}
			<div className='prompt-trigger'>
				<AdminPromptIconSvg />
				<div className='prompt-content'>{promptContent}</div>
			</div>
		</StyledPromptInput>
	)
}
