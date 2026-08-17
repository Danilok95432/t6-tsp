import { type SelOption } from 'src/types/select'

import React, { type SelectHTMLAttributes } from 'react'

import styles from './index.module.scss'
import cn from 'classnames'
import { SelectArrowSvg } from 'src/UI/icons/selectArrowSVG'

type MainSelectProps = {
	items: SelOption[]
	wrapperClassName?: string
	onChange?: (value: string) => void
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>

export const MainSelect = React.forwardRef<HTMLSelectElement, MainSelectProps>((props, ref) => {
	const { items, wrapperClassName, onChange, ...rest } = props

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (onChange) {
			onChange(e.target.value)
		}
	}

	return (
		<div className={cn(styles.selectWrapper, wrapperClassName)}>
			<select {...rest} ref={ref} onChange={handleChange}>
				{items.map((el) => (
					<option key={el.value} value={el.value}>
						{el.label}
					</option>
				))}
			</select>
			<SelectArrowSvg />
		</div>
	)
})

MainSelect.displayName = 'MainSelect'
