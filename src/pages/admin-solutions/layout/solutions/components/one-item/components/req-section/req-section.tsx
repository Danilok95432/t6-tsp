import { useFormContext, useFieldArray } from 'react-hook-form'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { PlusIconSvg } from 'src/UI/icons/plusIconSVG'
import { type OneSolutionInputs } from '../../schema'
import { CloseMiniSVG } from 'src/UI/icons/closeMiniSVG'
import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

// const equipmentOptions = [
// 	{ label: 'Оборудование 1', value: '1' },
// 	{ label: 'Оборудование 2', value: '2' },
// ]

type ReqProps = {
	toolsOptions?: SelOption[]
}

export const ReqSection: FC<ReqProps> = ({ toolsOptions = [{ label: '', value: '' }] }) => {
	const { control, getValues, setValue } = useFormContext<OneSolutionInputs>()
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'equipmentList',
	})

	const handleAdd = () => {
		const toolValueRaw = getValues('tools')
		const countValue = getValues('count')

		let toolValue: string | undefined
		if (Array.isArray(toolValueRaw)) {
			const first = toolValueRaw[0]
			if (first) {
				toolValue = typeof first === 'string' ? first : first.value
			}
		} else if (typeof toolValueRaw === 'string') {
			toolValue = toolValueRaw
		}

		if (!toolValue || !countValue) {
			console.warn('Не выбрано оборудование или не указано количество')
			return
		}

		const selectedOption = toolsOptions.find((opt) => opt.value === toolValue)
		const label = selectedOption ? selectedOption.label : toolValue
		const quantity = Number(countValue)

		if (isNaN(quantity) || quantity <= 0) {
			console.warn('Некорректное количество')
			return
		}

		append({ name: label, quantity })
		setValue('tools', '')
		setValue('count', '')
	}

	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Оборудование'
			titleStyleClass={styles.title}
		>
			{fields.length > 0 && (
				<div className={styles.equipList}>
					{fields.map((field, index) => (
						<div key={field.id} className={styles.listItem}>
							<span>
								{field.name} ({field.quantity})
							</span>
							<div className={styles.removeBtn} onClick={() => remove(index)}>
								<CloseMiniSVG />
							</div>
						</div>
					))}
				</div>
			)}

			<FlexRow className={styles.toolsRow}>
				<ControlledSelect
					selectOptions={toolsOptions}
					label='Добавить оборудование'
					name='tools'
					className={styles.tools}
				/>
				<ControlledInput className={styles.countTools} name='count' />
				<button className={styles.addBtn} type='button' onClick={handleAdd}>
					<PlusIconSvg fill='#ffffff' />
					<p>Добавить</p>
				</button>
			</FlexRow>

			<ControlledInput
				name='price1'
				label='Цена оборудования (автоматический расчет)'
				margin='0 0 20px 0'
			/>
			<ControlledInput name='price2' label='Цена материалов' margin='0 0 20px 0' />
			<ControlledInput name='price3' label='Цена работ (проект и монтаж)' margin='0 0 20px 0' />
			<ControlledInput name='short' label='Краткое описание' isTextarea margin='0 0 20px 0' />
			<QuillEditor
				name='full'
				label='Полное описание страницы'
				$heightEditor='150px'
				$maxWidth='1140px'
			/>
		</AdminSection>
	)
}
