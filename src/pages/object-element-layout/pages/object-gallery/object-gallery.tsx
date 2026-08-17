import { objectGallerySchema, type ObjectGalleryInputs } from './schema'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetGalleryObjectInfoQuery } from 'src/store/objects/objects.api'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { GallerySection } from './components/gallery-section/gallery-section'
// import { LinkSection } from './components/link-section/link-section'
// import { AdminButton } from 'src/UI/AdminButton/AdminButton'

export const ObjectGallery = () => {
	const { id } = useParams()
	const { data: objectGalleryData } = useGetGalleryObjectInfoQuery(id ?? '')
	const methods = useForm<ObjectGalleryInputs>({
		mode: 'onBlur',
		resolver: yupResolver(objectGallerySchema),
		defaultValues: {
			link: '',
		},
	})

	const onSubmit: SubmitHandler<ObjectGalleryInputs> = (data) => {
		methods.reset()
		console.log(data)
	}
	return (
		<>
			<Helmet>
				<title>Галерея</title>
			</Helmet>
			<AdminContent
				title='Галерея'
				$backgroundColor='#ffffff'
				$height='0'
				$padding='33px 20px 100px 28px'
			>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<GallerySection images={objectGalleryData?.photos} idItem={id} />
						{/* <LinkSection />
						<AdminButton type='submit' $height='35px'>
							Сохранить ссылку
						</AdminButton>
						*/}
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
