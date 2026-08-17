import { Link, useParams } from 'react-router-dom'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { AddButton } from 'src/UI/AddButton/AddButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { FlexRow } from 'src/components/flex-row/flex-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { useActions } from 'src/hooks/actions/actions'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { transformToFormData } from 'src/helpers/utils'
import { type funInfoInputs, funInfoSchema } from './schema'
import { useGetVidInfoQuery, useSaveVidInfoMutation } from 'src/store/vids/vids.api'

export const FunInfo = () => {
	const { id = '0' } = useParams()
	const { data: vidInfo } = useGetVidInfoQuery(id)
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(vidInfo?.mainphoto ?? [])
	const [saveVidInfo] = useSaveVidInfoMutation()

	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'about_etno',
		idItem: id,
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
				imgtype='about_etno'
				syncAddHandler={syncAddImagesHandler}
				syncEditHandler={syncEditImagesHandler}
			/>,
		)
	}

	useEffect(() => {
		setLocaleImages(vidInfo?.mainphoto ?? [])
	}, [vidInfo?.mainphoto])

	const methods = useForm<funInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(funInfoSchema),
		defaultValues: {
			mainphoto: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<funInfoInputs> = async (data) => {
		try {
			const res = await saveVidInfo(transformToFormData(data))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (vidInfo) {
			methods.reset({ ...vidInfo })
		}
	}, [vidInfo])

	return (
		<>
			<Helmet>
				<title>Одна игра</title>
			</Helmet>
			<AdminContent className={styles.gameInfoPage}>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAboutFun}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
				<h3>Информация</h3>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<ControlledInput
							name='title'
							label='Наименование элемента *'
							maxWidth='1140px'
							margin='0 0 20px 0'
						/>
						<ReactDropzone
							label='Фотография *'
							name='mainphoto'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='0 0 20px 0'
							previewVariant='sm-img'
							imgtype='about_etno'
							fileImages={vidInfo?.mainphoto}
						/>

						<QuillEditor name='desc' label='Текст-анонс' $heightEditor='105px' $maxWidth='1140px' />
						<ReactDropzone
							margin='30px 0 20px 0'
							label='Галерея изображений'
							previewVariant='img-list'
							variant='culture'
							name='photos'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							maxFiles={8}
							fileImages={localeImages}
							syncAdd={syncAddImagesHandler}
							syncEdit={syncEditImagesHandler}
							imgtype='about_etno'
							dzAreaClassName={styles.gameGalleryController}
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
						<QuillEditor
							name='bottomDesc'
							label='Текст статьи'
							$heightEditor='105px'
							$maxWidth='1140px'
						/>
						<FlexRow $margin='40px 0 45px 0' $gap='15px'>
							<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
								Сохранить
							</AdminButton>
							<AdminButton as='link' to='/' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAboutFun}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
			</AdminContent>
		</>
	)
}
