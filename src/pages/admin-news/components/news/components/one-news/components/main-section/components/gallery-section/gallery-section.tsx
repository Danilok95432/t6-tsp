import { useCallback, useEffect, useState, type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
// import { ControlledInput } from 'src/components/controlled-input/controlled-input'
// import { AdminButton } from 'src/UI/AdminButton/AdminButton'
// import { Container } from 'src/UI/Container/Container'
// import { FlexRow } from 'src/components/flex-row/flex-row'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'
import { AddButton } from 'src/UI/AddButton/AddButton'

import styles from './index.module.scss'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { useActions } from 'src/hooks/actions/actions'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'

type GallerySectionProps = {
	images?: ImageItemWithText[]
	idItem?: string
}

export const GallerySection: FC<GallerySectionProps> = ({ images, idItem }) => {
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(images ?? [])
	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'news_photo',
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
				imgtype='news_photo'
				syncAddHandler={syncAddImagesHandler}
				syncEditHandler={syncEditImagesHandler}
			/>,
		)
	}

	useEffect(() => {
		setLocaleImages(images ?? [])
	}, [images])

	return (
		<ReactDropzone
			margin='30px 0 0 0'
			previewVariant='img-list'
			variant='culture'
			name='photos'
			accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
			maxFiles={8}
			fileImages={localeImages}
			syncAdd={syncAddImagesHandler}
			syncEdit={syncEditImagesHandler}
			imgtype='events_photo'
			dzAreaClassName={styles.eventGalleryController}
			multiple
			customOpenModal={
				<AddButton onClick={handleOpenModal} icon={<AddImageCulturePlusSVG />} $padding='44px 60px'>
					{' '}
				</AddButton>
			}
			customUploadBtn={
				<AddButton onClick={handleOpenModal} icon={<AddImageCulturePlusSVG />} $padding='44px 60px'>
					{' '}
				</AddButton>
			}
		/>
	)
}
