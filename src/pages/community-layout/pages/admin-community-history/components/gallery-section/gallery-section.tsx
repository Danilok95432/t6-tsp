import { useCallback, useEffect, useState, type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { useActions } from 'src/hooks/actions/actions'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'

type GallerySectionProps = {
	images?: ImageItemWithText[]
}

export const GallerySection: FC<GallerySectionProps> = ({ images }) => {
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(images ?? [])
	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'about_history',
		idItem: '',
	})
	const addImage = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const { openModal } = useActions()

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

	const handleOpenModal = async () => {
		const newId = await addImage()
		openModal(
			<ImageModal
				id={newId}
				imgtype='about_history'
				syncAddHandler={syncAddImagesHandler}
				syncEditHandler={syncEditImagesHandler}
			/>,
		)
	}

	useEffect(() => {
		setLocaleImages(images ?? [])
	}, [images])

	return (
		<AdminSection titleText='Галерея' sectionName='gallerySection'>
			<ReactDropzone
				previewVariant='img-list'
				name='photos'
				imgtype='about_history'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				maxFiles={7}
				fileImages={localeImages}
				syncAdd={syncAddImagesHandler}
				syncEdit={syncEditImagesHandler}
				multiple
				customOpenModal={<AddButton onClick={handleOpenModal}>Добавить изображение</AddButton>}
			/>
		</AdminSection>
	)
}
