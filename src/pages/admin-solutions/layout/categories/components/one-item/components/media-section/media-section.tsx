import { type SelOption } from 'src/types/select'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import styles from './index.module.scss'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { type ImageItemWithText } from 'src/types/photos'
import { type FileItem } from 'src/types/files'

type MainSectionProps = {
	parentsOption?: SelOption[]
	img?: ImageItemWithText[]
	images?: ImageItemWithText[]
	documents?: FileItem[]
	idItem?: string
}

export const MediaSection: FC<MainSectionProps> = ({
	parentsOption,
	img,
	images,
	documents,
	idItem,
}) => {
	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Изображения категории. Первое в списке — основное'
			titleStyleClass={styles.title}
		>
			<ReactDropzone
				label='Изображение (305x286)'
				name='img'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='item'
				fileImages={img}
				className={styles.img}
			/>
			{/* <ReactDropzone
				margin='30px 0 0 0'
				previewVariant='img-list'
				label='Изображения для слайдера внутри карточки товара'
				variant='culture'
				name='images'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				maxFiles={8}
				fileImages={localeImages}
				syncAdd={syncAddImagesHandler}
				syncEdit={syncEditImagesHandler}
				imgtype='item_images'
				dzAreaClassName={styles.eventGalleryController}
				multiple
				customOpenModal={
					<AddButton
						onClick={handleOpenModal}
						icon={<AddImageCulturePlusSVG />}
						$padding='44px 60px'
					>
						{' '}
					</AddButton>
				}
				customUploadBtn={
					<AddButton
						onClick={handleOpenModal}
						icon={<AddImageCulturePlusSVG />}
						$padding='44px 60px'
					>
						{' '}
					</AddButton>
				}
			/> */}
			{/* <h2 className={styles.subTitle}>Документы</h2>
			<ReactDropzoneFiles
				previewVariant='text'
				variant='text'
				removeIcon={<RemoveFileSvg />}
				name='documents'
				accept={{
					'application/pdf': ['.pdf'],
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
				}}
				maxFiles={7}
				files={documents}
				fileType='item'
				multiple
				customUploadBtn={<AddButton>Добавить файл</AddButton>}
				className={styles.img}
			/> */}
		</AdminSection>
	)
}
