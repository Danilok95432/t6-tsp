import { type FC, useEffect } from 'react'
import { type FilterTableInput } from 'src/types/global'

import { IMaskInput } from 'react-imask'
import cn from 'classnames'

import { useActions } from 'src/hooks/actions/actions'
import Select from 'react-dropdown-select'

import styles from './index.module.scss'

type TableFiltrationProps = {
	filterInputs: FilterTableInput[]
}

export const TableFiltration: FC<TableFiltrationProps> = ({ filterInputs }) => {
	const { setTableFiltration, clearTableFiltration } = useActions()

	const handleChangeFiltration = (key: string, value: string) => {
		setTableFiltration({ key, value })
	}

	useEffect(() => {
		return () => {
			clearTableFiltration()
		}
	}, [])

	return (
		<>
			{filterInputs.map(({ name, placeholder, type, options = [], label = '' }) => {
				if (type === 'date') {
					return (
						<IMaskInput
							className={cn(styles.filterInput, styles._date)}
							key={name}
							name={name}
							mask='00.00.0000'
							placeholder={placeholder}
							onChange={(e) => handleChangeFiltration(name, e.currentTarget.value)}
						/>
					)
				} else if (type === 'date-range') {
					return (
						<IMaskInput
							className={cn(styles.filterInput, styles._dateRange)}
							key={name}
							name={name}
							mask='00.00.0000 — 00.00.0000'
							placeholder={placeholder || 'дд.мм.гггг — дд.мм.гггг'}
							onAccept={(value: string) => handleChangeFiltration(name, value)}
							lazy={false}
							definitions={{
								'0': /\d/,
							}}
						/>
					)
				} else if (type === 'number-range') {
					return (
						<IMaskInput
							className={cn(styles.filterInput, styles._numberRange)}
							key={name}
							name={name}
							mask='num ₽ — num ₽'
							blocks={{
								num: {
									mask: Number,
									thousandsSeparator: ' ',
									scale: 2,
									radix: '.',
									mapToRadix: [','],
									min: 0,
									max: 99999999,
								},
							}}
							placeholder={placeholder || 'от ₽ — до ₽'}
							onAccept={(value: string) => handleChangeFiltration(name, value)}
						/>
					)
				} else if (type === 'select') {
					return (
						<div key={name}>
							{label && <label className={styles.label}>{label}</label>}
							<Select
								className={cn(styles.filterInput, styles._select)}
								placeholder={placeholder}
								options={options.map((option) => ({
									value: option.value,
									label: option.label,
								}))}
								values={[]}
								onChange={(selectedValues) => {
									if (selectedValues.length > 0) {
										handleChangeFiltration(name, selectedValues[0].value)
									} else {
										handleChangeFiltration(name, '')
									}
								}}
								searchable={false}
								dropdownPosition='auto'
							/>
						</div>
					)
				} else if (type === 'special-select') {
					return (
						<div key={name}>
							{label && <label className={styles.label}>{label}</label>}
							<Select
								className={cn(styles.filterInput, styles._specialSelect)}
								key={name}
								placeholder={placeholder}
								options={options.map((option) => ({
									value: option.value,
									label: option.label,
								}))}
								labelField={label}
								values={[]}
								onChange={(selectedValues) => {
									if (selectedValues.length > 0) {
										handleChangeFiltration(name, selectedValues[0].value)
									} else {
										handleChangeFiltration(name, '')
									}
								}}
								searchable={false}
								dropdownPosition='auto'
							/>
						</div>
					)
				}
				return (
					<>
						{label && <label className={styles.label}>{label}</label>}
						<input
							className={cn(styles.filterInput, styles._text)}
							key={name}
							placeholder={placeholder}
							onChange={(e) => handleChangeFiltration(name, e.currentTarget.value)}
						/>
					</>
				)
			})}
		</>
	)
}
