import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { MainButton } from 'src/UI/MainButton/MainButton'

import styles from './index.module.scss'

export const InfoSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<ControlledSelect
				name='type_list'
				label='Тип документа *'
				selectOptions={[{ label: 'Тип не выбран', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<GridRow
				$alignItems='center'
				$gap='15px'
				$mdGap='5px'
				$template='auto / minmax(180px, 180px) minmax(180px, 180px)'
			>
				<ControlledDateInput
					name='date'
					label='Дата документа *'
					dateFormat='dd.MM.yyyy'
					margin='0 0 20px 0'
				/>
				<ControlledInput name='number' label='Номер документа *' margin='0 0 20px 0' />
			</GridRow>
			<FlexRow className={styles.titleRow}>
				<ControlledInput
					name='title'
					label='Название документа *'
					maxWidth='638px'
					margin='0 0 20px 0'
				/>
				<MainButton className={styles.autoFillBtn}>Автоназвание</MainButton>
			</FlexRow>
			<FlexRow className={styles.sumRow}>
				<ControlledInput name='sum' label='Сумма документа' maxWidth='180px' margin='0 0 20px 0' />
				<p>₽</p>
			</FlexRow>
			<ControlledInput
				name='comment'
				label='Комментарий *'
				maxWidth='750px'
				margin='0 0 20px 0'
				isTextarea
				height='80px'
			/>
			<ReactDropzoneFiles
				label='Загруженные сканы'
				name='scans'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 40px 0'
				previewVariant='text'
				variant='text'
				files={[]}
			/>
		</AdminSection>
	)
}
