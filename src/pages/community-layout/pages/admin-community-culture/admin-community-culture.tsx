import { useCallback, useEffect, useState, type FC } from 'react'
import {
	type EtnoInputs,
	etnoSchema,
} from 'src/pages/community-layout/pages/admin-community-culture/schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { transformToFormData } from 'src/helpers/utils'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import { FlexRow } from 'src/components/flex-row/flex-row'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { CultureElements } from 'src/pages/community-layout/pages/admin-community-culture/components/culture-elements/culture-elements'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'

import styles from './index.module.scss'
import { useActions } from 'src/hooks/actions/actions'
import { useGetNewIdImageQuery } from 'src/store/uploadImages/uploadImages.api'
import { ImageModal } from 'src/modals/images-modal/images-modal'
import { type ImageItemWithText } from 'src/types/photos'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import {
	useGetEtnoEditQuery,
	useGetVidsListQuery,
	useSaveEtnosportMutation,
} from 'src/store/vids/vids.api'

export const AdminCommunityCulture: FC = () => {
	const { data: etnoData } = useGetEtnoEditQuery(null)
	const { data: etnoList } = useGetVidsListQuery(null)
	const [localeImages, setLocaleImages] = useState<ImageItemWithText[]>(etnoData?.photos ?? [])
	const [saveEtnosport] = useSaveEtnosportMutation()

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
		setLocaleImages(etnoData?.photos ?? [])
	}, [etnoData?.photos])

	const methods = useForm<EtnoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(etnoSchema),
		defaultValues: {
			photos: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<EtnoInputs> = async (data) => {
		try {
			const res = await saveEtnosport(transformToFormData(data))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (etnoData) {
			methods.reset({ ...etnoData })
		}
	}, [etnoData])

	return (
		<>
			<Helmet>
				<title>Русский этноспорт</title>
			</Helmet>

			<AdminContent title='Русский этноспорт' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<QuillEditor $heightEditor='310px' name='anonstext' label='Текст-анонс' />
						<ReactDropzone
							margin='30px 0 0 0'
							label={`Галерея изображений (${etnoData?.photos?.length} из 8)`}
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
				<CultureElements vids={etnoList?.vids.filter((vid) => vid.is_etnosport)} />
			</AdminContent>
		</>
	)
}
