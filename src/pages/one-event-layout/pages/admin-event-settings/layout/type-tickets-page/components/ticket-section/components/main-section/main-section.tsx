import { FlexRow } from 'src/components/flex-row/flex-row'
import styles from './index.module.scss'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { useEffect, type FC } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type MainSectionProps = {
	idx?: number
}

export const MainSection: FC<MainSectionProps> = ({ idx }) => {
	const { control, setValue } = useFormContext()

	const ticketsLimit = useWatch({
		control,
		name: `ticket_types[${idx}].ticketsLimit`,
	})

	const priceValue = useWatch({
		control,
		name: `ticket_types[${idx}].price`,
	})

	const refunddaylimit = useWatch({
		control,
		name: `ticket_types[${idx}].refunddaylimit`,
	})

	useEffect(() => {
		if (priceValue === '' || priceValue == null) {
			setValue(`ticket_types[${idx}].price`, '0.00')
		}
		if (ticketsLimit === '' || ticketsLimit == null) {
			setValue(`ticket_types[${idx}].ticketsLimit`, '0')
		}
		if (refunddaylimit === '' || refunddaylimit == null) {
			setValue(`ticket_types[${idx}].refunddaylimit`, '0')
		}
	}, [priceValue, refunddaylimit, ticketsLimit, setValue, idx])

	return (
		<FlexRow className={styles.mainSection}>
			<FlexRow className={styles.ticketsRow}>
				<ControlledInput
					name={`ticket_types[${idx}].title`}
					label='Название билета *'
					maxWidth='800px'
				/>
				<ControlledInput
					name={`ticket_types[${idx}].ticketsLimit`}
					label='В продаже, не более'
					maxWidth='200px'
				/>
			</FlexRow>
			<FlexRow className={styles.commerceRow}>
				<FlexRow className={styles.priceRow}>
					<ControlledInput
						name={`ticket_types[${idx}].price`}
						label='Стоимость билета *'
						maxWidth='200px'
					/>
					<p>рублей РФ</p>
				</FlexRow>
				<FlexRow className={styles.customCheck}>
					<ControlledCheckbox name={`ticket_types[${idx}].use_refund`} type='checkbox' />
					<FlexRow className={styles.customLabel}>
						<p>Возможен возврат не позднее, чем за</p>
						<ControlledInput
							name={`ticket_types[${idx}].refunddaylimit`}
							className={styles.inputCustom}
						/>
						<p>дней до события</p>
					</FlexRow>
				</FlexRow>
			</FlexRow>
		</FlexRow>
	)
}
