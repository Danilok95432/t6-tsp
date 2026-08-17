import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import styles from './index.module.scss'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { GallerySection } from './components/gallery-section/gallery-section'
import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { useParams } from 'react-router-dom'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

type MainSectionProps = {
	photo?: ImageItemWithText[]
	photos?: ImageItemWithText[]
	activated?: boolean
}

export const MainSection: FC<MainSectionProps> = ({ photo, photos, activated = false }) => {
	const { id } = useParams()
	return (
		<AdminSection isBlock={false} className={styles.infoSection}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='shortTitle'
					label='Краткое название организатора *'
					placeholder='Краткое название организатора'
					margin='0 0 20px 0'
					maxWidth='1140px'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
			<FlexRow className={styles.adminRow}>
				<div className={styles.inputWrapper}>
					<ControlledInput
						name='title'
						label='Полное название организатора *'
						placeholder='Полное название организатора'
						maxWidth='1140px'
						disabled={activated}
						locked={activated}
					/>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_type}>
						<InfoIconSvg />
					</Tooltip>
				</div>
				<p className={styles.disclaimer}>
					Для того, чтобы сменить официальное полное название активированного организатора,{' '}
					<a href='/'>обратитесь к администратору</a>
				</p>
			</FlexRow>
			<ReactDropzone
				label='Логотип *'
				name='photo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px'
				previewVariant='sm-img'
				imgtype='org'
				fileImages={photo}
				className={styles.dropzone}
			/>
			<GallerySection images={photos} idItem={id} />
			<FlexRow className={styles.adminRow}>
				<ControlledInput
					name='short'
					label='Краткая информация об организаторе'
					placeholder='Введите текст...'
					isTextarea
					height='100px'
					margin='0 0 20px 0'
				/>
			</FlexRow>
			<QuillEditor
				name='full'
				label='Полная информация об организаторе'
				$heightEditor='150px'
				$maxWidth='1140px'
				$width='100%'
				className={styles.editor}
			/>
			<FlexRow className={styles.adminRow}>
				<div className={styles.inputWrapper}>
					<ControlledInput
						name='region'
						label='Регион и населенный пункт *'
						placeholder='Регион и населенный пункт'
						maxWidth='1140px'
						isTextarea
						height='80px'
						locked={activated}
						disabled={activated}
					/>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
				<p className={styles.disclaimer}>
					Для того, чтобы сменить регион и населенный пункт местонахождения активированного
					организатора, <a href='/'>обратитесь к администратору</a>
				</p>
			</FlexRow>
			<FlexRow className={styles.adminRow}>
				<div className={styles.inputWrapper}>
					<ControlledInput
						name='urAdress'
						label='Юридический адрес *'
						placeholder='Юридический адрес'
						maxWidth='1140px'
						isTextarea
						height='80px'
						locked={activated}
						disabled={activated}
					/>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
				</div>
				<p className={styles.disclaimer}>
					Для того, чтобы сменить юридический адрес активированного организатора,{' '}
					<a href='/'>обратитесь к администратору</a>
				</p>
			</FlexRow>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='factAdress'
					label='Фактический адрес *'
					placeholder='Фактический адрес'
					margin='0 0 20px 0'
					maxWidth='1140px'
					isTextarea
					height='80px'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoIconSvg />
				</Tooltip>
			</div>
		</AdminSection>
	)
}
