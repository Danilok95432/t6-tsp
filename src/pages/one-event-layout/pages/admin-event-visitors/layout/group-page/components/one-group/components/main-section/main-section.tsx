import { type SelOption } from 'src/types/select'
import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'

type MainSectionProps = {
	galleryOptions?: SelOption[]
	photo?: ImageItemWithText[]
}

export const MainSection: FC<MainSectionProps> = ({ photo, galleryOptions = [] }) => {
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='group_name'
					label='Название группы *'
					placeholder='Название группы'
				/>
			</div>
			<ControlledSelect
				name='type_group'
				label='Тип группы *'
				margin='0 0 20px 0'
				selectOptions={[{ label: 'Группа без указания типа', value: '1' }]}
			/>
			<GridRow $template='auto/1fr 1fr' $width='auto' $alignItems='end' $margin='0 0 20px 0'>
				<ControlledSelect
					name='region'
					label='Регион *'
					selectOptions={[{ label: 'ХМАО-Югра (86)', value: '86' }]}
				/>
				<ControlledSelect
					name='tnp'
					label='Тип населенного пункта *'
					selectOptions={[{ label: 'Город', value: '1' }]}
				/>
			</GridRow>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='group_name'
					label='Название населенного пункта *'
					placeholder='Название населенного пункта'
				/>
			</div>
			<ReactDropzone
				label='Логотип группы *'
				name='photo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px 0'
				previewVariant='sm-img'
				imgtype='visitor_photo'
				fileImages={photo}
			/>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='desc'
					label='Описание группы'
					placeholder='Начните писать текст'
					isTextarea
					height='100px'
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='group_boss'
					label='Руководитель группы *'
					placeholder='Руководитель группы'
				/>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='group_boss'
					label='Должность руководителя *'
					placeholder='Должность руководителя'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
