import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { PlusIconSvg } from 'src/UI/icons/plusIconSVG'

export const ReqSection = () => {
	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Оборудование'
			titleStyleClass={styles.title}
		>
			<FlexRow className={styles.toolsRow}>
				<ControlledSelect
					selectOptions={[
						{ label: 'Оборудование 1', value: '1' },
						{ label: 'Оборудование 2', value: '2' },
					]}
					label='Добавить оборудование'
					name='tools'
					className={styles.tools}
				/>
				<ControlledInput className={styles.countTools} name='count' />
				<button className={styles.addBtn}>
					<PlusIconSvg fill='#ffffff' />
					<p>Добавить</p>
				</button>
			</FlexRow>
			<ControlledInput
				name='toolPrice'
				label='Цена оборудования (автоматический расчет)'
				margin='0 0 20px 0'
			/>
			<ControlledInput name='materialsPrice' label='Цена материалов' margin='0 0 20px 0' />
			<ControlledInput name='workPrice' label='Цена работ (проект и монтаж)' margin='0 0 20px 0' />
			<ControlledInput name='short_desc' label='Краткое описание' isTextarea margin='0 0 20px 0' />
			<QuillEditor
				name='desc'
				label='Полное описание страницы'
				$heightEditor='150px'
				$maxWidth='1140px'
			/>
		</AdminSection>
	)
}
