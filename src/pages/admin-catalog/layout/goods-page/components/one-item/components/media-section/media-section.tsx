import { type SelOption } from 'src/types/select'
import { useCallback, useEffect, useState, type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import styles from './index.module.scss'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { RemoveFileSvg } from 'src/UI/icons/removeFileSVG'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { type ImageItemWithText } from 'src/types/photos'
import { type FileItem } from 'src/types/files'
import { useActions } from 'src/hooks/actions/actions'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'

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
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(images ?? [])
	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'item_images',
		idItem,
	})

	const addImage = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const syncAddImagesHandler = useCallback((newImage: ImageItemWithText) => {
		setLocaleImages((prevImages) => [...prevImages, newImage])
	}, [])

	const syncEditImagesHandler = useCallback((editImage: ImageItemWithText) => {
		setLocaleImages((prevImages) => {
			return prevImages.map((image) => {
				if (image.id === editImage.id) {
					return { ...image, ...editImage }
				}
				return image
			})
		})
	}, [])

	const { openModal } = useActions()

	const handleOpenModal = async () => {
		const newId = await addImage()
		openModal(
			<ImageModal
				id={newId}
				imgtype='item_images'
				syncAddHandler={syncAddImagesHandler}
				syncEditHandler={syncEditImagesHandler}
			/>,
		)
	}

	useEffect(() => {
		setLocaleImages(images ?? [])
	}, [images])

	return (
		<AdminSection
			className={styles.mainSection}
			isBlock={false}
			titleText='Изображения товара. Первое в списке — основное'
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
			<ReactDropzone
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
			/>
			<h2 className={styles.subTitle}>Документы</h2>
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
			/>
		</AdminSection>
	)
}
