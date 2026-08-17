import { useCallback, useEffect, useState, type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
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
		imgtype: 'events_photo',
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
				imgtype='events_photo'
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
			titleText='Галерея'
			sectionName='gallery'
			additionalNodeForHead={
				<SwitchedRadioBtns
					name='hide_gallery'
					contentRadio1='Показать всем'
					contentRadio2='Скрыть'
				/>
			}
		>
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
			{/*
			<Container
				className={styles.formInputsGallery}
				$padding='0px 0 15px 0'
				$paddingMobile='0px 0 15px 0'
			>
				<p className={styles.linkDesc}>
					Ваш план обслуживания не предусматривает хранения большого объема контента (изображений и
					видео) на серверах Системы. <br /> Для размещения фотографий в галерее Вашего отделения
					подключите их методом указания прямых ссылок на сторонних хостингах.
				</p>
				<FlexRow $direction='row' $gap='9px' $alignItems='center' $maxWidth='921px' $wrap='nowrap'>
					<ControlledInput
						label='Название изображения *'
						name='title'
						placeholder='Добавьте название'
						width='100%'
					/>
					<ControlledInput
						label='Автор изображения'
						name='author'
						placeholder='Добавьте имя автора'
						width='100%'
					/>
				</FlexRow>
				<ControlledInput
					label='Ссылка на фото Вконтакте *'
					name='link'
					placeholder='https://vk.com/...'
					maxWidth='921px'
					margin='15px 0 5px 0'
				/>
			</Container>
			<AdminButton $height='35px' $padding='0 21px' type='button'>
				Сохранить ссылку
			</AdminButton>
			*/}
		</AdminSection>
	)
}
