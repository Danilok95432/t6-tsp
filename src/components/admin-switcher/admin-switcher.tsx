import React, { type FC, type ReactNode, useRef } from 'react'
import cn from 'classnames'
import { useController, useFormContext } from 'react-hook-form'

import styles from './index.module.scss'
import { SectionSwitcherArrowSVG } from 'src/UI/icons/sectionSwitcherArrowSVG'

type AdminSwitcherProps = {
	name: string
	children: ReactNode
	className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const AdminSwitcher: FC<AdminSwitcherProps> = ({ children, name, className, ...props }) => {
	const { register, getValues, control, setValue, resetField } = useFormContext()

	useController({
		name,
		control,
		defaultValue: true,
	})

	const switcherRef = useRef<HTMLDivElement>(null)
	const handleCheckboxChange = () => {
		setValue(name, !getValues(name))
		const sectionInputs = switcherRef.current
			?.closest('section')
			?.querySelectorAll('input, textarea') as NodeListOf<HTMLInputElement | HTMLTextAreaElement>
		if (sectionInputs) {
			sectionInputs.forEach((inputEl) => {
				if (inputEl.name === name) return
				resetField(inputEl.name)
			})
		}
	}

	return (
		<h2
			className={cn(className, styles.adminSwitcher, { [styles.activeSwitcher]: getValues(name) })}
			ref={switcherRef}
			onClick={handleCheckboxChange}
		>
			<input {...register(name)} {...props} type='checkbox' />
			<SectionSwitcherArrowSVG />
			<span>{children}</span>
		</h2>
	)
}
