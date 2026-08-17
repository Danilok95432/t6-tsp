import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

type MainSectionProps = {
	photo?: ImageItemWithText[]
}

export const MainSection: FC<MainSectionProps> = ({ photo }) => {
	return (
		<AdminSection innerClassName={styles.mainSectionInner} titleText='Основные данные'>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='title'
					label='Название объекта *'
					placeholder='например, Мастерская керамики...'
					margin='0 0 20px 0'
				/>

				<Tooltip text='Подсказка' position='top'>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<ReactDropzone
				label='Основное изображение'
				name='photo'
				prompt='JPEG, PNG, 500х500px, не более 2.5 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px 0'
				previewVariant='sm-img'
				imgtype='objects'
				fileImages={photo}
			/>

			<div className={styles.inputWrapper}>
				<ControlledInput
					name='mainDesc'
					label='Краткое описание объекта *'
					placeholder='Поле ввода текста описания'
					margin='0 0 20px 0'
					height='105px'
					isTextarea
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.mainDescrTooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>

			<div className={styles.inputWrapper}>
				<ControlledInput
					name='descList'
					label='Полное описание объекта *'
					placeholder='Поле ввода текста статьи'
					margin='0 0 10px 0'
					height='250px'
					isTextarea
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.descListTooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
