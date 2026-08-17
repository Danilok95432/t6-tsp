import {
	type VidInfoInputs,
	vidInfoSchema,
} from 'src/pages/culture-element-layout/pages/etnosport-info/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback, useEffect, useState } from 'react'
import { transformToFormData } from 'src/helpers/utils'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { type ImageItemWithText } from 'src/types/photos'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { useGetVidInfoQuery, useSaveVidInfoMutation } from 'src/store/vids/vids.api'

export const EtnosportInfo = () => {
	const { id = '0' } = useParams()
	const { data: vidInfo } = useGetVidInfoQuery(id)
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(vidInfo?.mainphoto ?? [])
	const [saveCultureInfo] = useSaveVidInfoMutation()

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

	const methods = useForm<VidInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(vidInfoSchema),
		defaultValues: {
			mainphoto: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<VidInfoInputs> = async (data) => {
		try {
			const res = await saveCultureInfo(transformToFormData(data))
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
				<title>Информация</title>
			</Helmet>
			<AdminContent className={styles.cultureInfoPage}>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAboutEtnosport}`}
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
						<ControlledSelect
							name='vid'
							label='Вид участия *'
							margin='0 0 20px 0'
							selectOptions={[{ label: 'Не выбрано', value: '0' }]}
							className={styles.selectVid}
						/>
						<ReactDropzone
							label='Изображение вида *'
							name='mainphoto'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='0 0 20px 0'
							previewVariant='sm-img'
							imgtype='about_etno'
							fileImages={vidInfo?.mainphoto}
						/>
						<QuillEditor
							name='desc'
							label='Первый текстовый блок'
							$maxWidth='1140px'
							$heightEditor='105px'
						/>
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
							dzAreaClassName={styles.cultureGalleryController}
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
							label='Второй текстовый блок'
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
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAboutEtnosport}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
			</AdminContent>
		</>
	)
}
