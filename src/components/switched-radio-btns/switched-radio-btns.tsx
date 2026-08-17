import { type FC, type ReactNode } from 'react'

import { useFormContext } from 'react-hook-form'
import cn from 'classnames'
import styled, { css } from 'styled-components'

type SwitchedRadioBtnsProps = {
	name: string
	label?: string
	contentRadio1: ReactNode
	contentRadio2: ReactNode
	valueRadio1?: boolean
	valueRadio2?: boolean
	className?: string
}

type StyledRadioBtnsProps = {
	$variant?: 'primary' | 'switcher' | 'keySwitcher'
}
const variantStyles = {
	primary: css`
		display: flex;
		gap: 30px;
		align-items: center;
		span {
			color: #000000;
			position: relative;
			padding-left: 20px;
			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 15px;
				height: 15px;
				border-radius: 50%;
				border: 1px solid #868686;
			}
		}
		._active {
			&::before {
				border: 4px solid #184f71;
			}
		}
	`,

	switcher: css`
		display: flex;
		gap: 3px;
		background: #f2f2f2;
		border-radius: 3px;
		padding: 3px;
		width: max-content;
		._active {
			color: #000000;
			background: #ffffff;
			box-shadow: 0 0 3px 0 rgba(1, 61, 86, 0.15);
			svg {
				path,
				rect {
					fill: #000000;
				}
			}
		}
		label {
			cursor: pointer;
			display: flex;
			justify-content: space-between;

			span {
				color: #868686;
				padding: 5px 14px;
				border-radius: 3px;
				display: flex;
				align-items: center;
				gap: 8px;
			}
		}
	`,
	keySwitcher: css`
		display: flex;
		gap: 0px;
		background: #f2f2f2;
		border-radius: 3px;
		padding: 3px;
		width: 100%;
		._active {
			color: #000000;
			background: #ffffff;
			box-shadow: 0 0 3px 0 rgba(1, 61, 86, 0.15);
			svg {
				path,
				rect {
					fill: #000000;
				}
			}
		}
		label {
			cursor: pointer;
			display: flex;
			justify-content: space-between;

			span {
				color: #868686;
				padding: 5px 14px;
				border-radius: 3px;
				display: flex;
				align-items: center;
				gap: 7px;
			}
		}
	`,
}

const StyledSwitchedRadioBtns = styled.div<StyledRadioBtnsProps>`
	span {
		font-size: 14px;
		cursor: pointer;
	}
	.innerBtns {
		${({ $variant }) => variantStyles[$variant ?? 'primary']};
	}

	input {
		visibility: hidden;
		opacity: 0;
		width: 0;
		height: 0;
	}

	& > p {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 5px;
		color: #000000;
	}
`

export const SwitchedRadioBtns: FC<SwitchedRadioBtnsProps & StyledRadioBtnsProps> = ({
	name,
	label,
	contentRadio1,
	contentRadio2,
	$variant,
	className,
}) => {
	const { register, setValue, watch } = useFormContext()
	const handleChange = (value: boolean) => {
		setValue(name, value)
	}

	return (
		<StyledSwitchedRadioBtns $variant={$variant} className={className}>
			{label && <p>{label}</p>}
			<div className='innerBtns'>
				<label>
					<input type='radio' {...register(name)} onChange={() => handleChange(true)} />
					<span className={cn({ _active: watch(name) })}>{contentRadio1}</span>
				</label>
				<label>
					<input type='radio' {...register(name)} onChange={() => handleChange(false)} />
					<span className={cn({ _active: !watch(name) })}>{contentRadio2}</span>
				</label>
			</div>
		</StyledSwitchedRadioBtns>
	)
}
