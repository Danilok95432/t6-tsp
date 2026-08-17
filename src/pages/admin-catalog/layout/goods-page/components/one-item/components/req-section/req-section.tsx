import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { useFormContext, useWatch } from 'react-hook-form'

export const ReqSection = () => {
	const { control } = useFormContext()

	// Отслеживаем значение поля use_weight
	const useWeight = useWatch({
		control,
		name: 'use_weight',
		defaultValue: false, // значение по умолчанию (не выбран)
	})
	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Данные товара'
			titleStyleClass={styles.title}
		>
			<ControlledCheckbox
				name='use_weight'
				type='checkbox'
				label='Весовой товар'
				$margin=' 0 0 20px 0'
			/>
			{useWeight ? (
				<div className={styles.weightGroup}>
					<ControlledInput name='weight_one' label='Вес 1 единицы, гр. *' margin='0 0 20px 0' />
					<ControlledInput
						name='weight_price_kg'
						label='Вес 1 кг товара, руб. *'
						margin='0 0 20px 0'
						isSum
					/>
					<ControlledInput
						name='weight_default'
						label='Вес по умолчанию, гр. *'
						margin='0 0 20px 0'
					/>
				</div>
			) : (
				<ControlledInput name='item_weight' label='Вес нетто, гр. *' margin='0 0 20px 0' />
			)}
			<ControlledInput name='item_width' label='Ширина, мм *' margin='0 0 20px 0' />
			<ControlledInput name='item_length' label='Длина, мм *' margin='0 0 20px 0' />
			<ControlledInput name='item_height' label='Высота, мм *' margin='0 0 20px 0' />
		</AdminSection>
	)
}
