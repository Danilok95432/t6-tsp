/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { type FC } from 'react'
import { useFormContext, useController, type FieldError } from 'react-hook-form'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ErrorMessage } from '@hookform/error-message'
import ru from 'date-fns/locale/ru'
import cn from 'classnames'

import styles from './index.module.scss'

registerLocale('ru', ru)

type ControlledDateInputProps = {
	className?: string
	classNameDatePicker?: string
	label?: string
	name: string
	dateFormat?: string
	showTimeSelect?: boolean
	showTimeSelectOnly?: boolean
	timeFormat?: string
	placeholder?: string
	margin?: string
	dynamicError?: FieldError | undefined
	timeIntervals?: number
}

export const ControlledDateInput: FC<ControlledDateInputProps> = ({
	name,
	className,
	classNameDatePicker,
	label,
	dateFormat,
	showTimeSelect = false,
	showTimeSelectOnly = false,
	timeFormat = 'HH:mm',
	timeIntervals = 15,
	placeholder,
	margin,
	dynamicError,
	...props
}) => {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const {
		field: { ref, value, onChange, ...inputProps },
	} = useController({
		name,
		control,
	})

	const parseDate = (dateString: string | Date | null): Date | null => {
		if (!dateString) return null
		if (dateString instanceof Date) return dateString
		const isoString = dateString.includes('T') ? dateString : dateString.replace(' ', 'T')

		return new Date(isoString)
	}

	const handleChange = (date: Date | null) => {
		onChange(date)
	}

	return (
		<div className={cn(styles.dateInputWrapper, className)} style={{ margin }}>
			<label className={cn({ [styles._noValid]: errors[name] })}>
				{label && <p>{label}</p>}
				<DatePicker
					{...inputProps}
					{...props}
					ref={ref}
					locale='ru'
					selected={parseDate(value)}
					onChange={handleChange}
					dateFormat={dateFormat ?? (showTimeSelect ? 'dd-MM-yyyy HH:mm' : 'dd-MM-yyyy')}
					timeFormat={timeFormat}
					timeIntervals={timeIntervals}
					timeCaption='Время'
					placeholderText={placeholder}
					showTimeSelect={showTimeSelect}
					showTimeSelectOnly={showTimeSelectOnly}
					calendarClassName={classNameDatePicker}
				/>
			</label>

			{dynamicError && <p className={styles.warningMessage}>{dynamicError.message}</p>}
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
