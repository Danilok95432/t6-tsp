import { useCallback, useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type FunInputs, funSchema } from './schema'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { GamesElements } from './components/games-elemets/games-elements'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { transformToFormData } from 'src/helpers/utils'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { useActions } from 'src/hooks/actions/actions'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { type ImageItemWithText } from 'src/types/photos'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

import styles from './index.module.scss'
import {
	useGetFunEditQuery,
	useGetVidsListQuery,
	useSaveFunMutation,
} from 'src/store/vids/vids.api'

export const AdminCommunityGames: FC = () => {
	const { data: funData } = useGetFunEditQuery(null)
	const { data: funList } = useGetVidsListQuery(null)
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(funData?.photos ?? [])
	const [saveGameCommunity] = useSaveFunMutation()

	const { refetch: getNewId } = useGetNewIdImageQuery({
		imgtype: 'about_etno',
		idItem: '',
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
		setLocaleImages(funData?.photos ?? [])
	}, [funData?.photos])

	const methods = useForm<FunInputs>({
		mode: 'onBlur',
		resolver: yupResolver(funSchema),
		defaultValues: {
			photos: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<FunInputs> = async (data) => {
		try {
			const res = await saveGameCommunity(transformToFormData(data))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (funData) {
			methods.reset({ ...funData })
		}
	}, [funData])

	return (
		<>
			<Helmet>
				<title>Игры Атманова Угла</title>
			</Helmet>

			<AdminContent title='Исконные забавы' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<QuillEditor $heightEditor='310px' name='anonstext' label='Текст-анонс*' />

						<ReactDropzone
							margin='30px 0 0 0'
							label={`Галерея изображений (${funData?.photos?.length} из 8)`}
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
						<FlexRow $margin='25px 0 50px 0' $gap='15px'>
							<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
								Сохранить
							</AdminButton>
							<AdminButton as='link' to='/' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<GamesElements vids={funList?.vids.filter((vid) => !vid.is_etnosport)} />
			</AdminContent>
		</>
	)
}
