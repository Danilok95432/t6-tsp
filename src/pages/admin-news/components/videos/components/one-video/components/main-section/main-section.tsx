import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { CustomText } from 'src/components/custom-text/custom-text'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type MultiSelOption, type SelOption } from 'src/types/select'

type MainSectionProps = {
	photo?: ImageItemWithText[]
	chainedEvent?: SelOption[]
	chainedVids?: MultiSelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ photo, chainedVids, chainedEvent }) => {
	return (
		<AdminSection isBlock={false}>
			<ControlledInput
				name='title'
				label='Название записи (не больше 200 символов)'
				isTextarea
				height='56px'
				margin='0 0 20px 0'
			/>
			<CustomText $margin='0 0 5px 0' $fontWeight='600'>
				Дата публикации
			</CustomText>
			<ControlledDateInput
				className={adminStyles.adminDateInput}
				name='itemdate'
				dateFormat='yyyy-MM-dd'
				placeholder='гггг-мм-дд'
				margin='0 0 20px 0'
			/>
			<ControlledSelect
				name='events'
				label='Связанное событие'
				selectOptions={chainedEvent ?? [{ label: 'Выберите событие', value: '0' }]}
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='short'
				label='Описание записи'
				isTextarea
				height='78px'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='vkvideo'
				label='Ссылка на видео'
				placeholder='Введите текст ссылки на запись'
				margin='0 0 20px 0'
			/>
			<ControlledInput
				name='vkexport'
				label='Текст кода для вставки (экспорт)'
				isTextarea
				height='78px'
				margin='0 0 20px 0'
			/>
			<ReactDropzone
				label='Основное изображение'
				name='photo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='videos'
				fileImages={photo}
				text='Если Вас не устраивает изображение, автоматически подставляемое видеохостингом, Вы можете загрузить свой вариант.'
			/>
		</AdminSection>
	)
}
