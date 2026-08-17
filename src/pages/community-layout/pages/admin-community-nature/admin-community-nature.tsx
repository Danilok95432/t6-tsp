import { useEffect, useState, type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	useGetNatureCommunityQuery,
	useSaveNatureCommunityMutation,
} from 'src/store/community/community.api'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { type NatureInputs, natureSchema } from './schema'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { TitleSection } from './components/title-section/title-section'
import { GallerySection } from './components/gallery-section/gallery-section'
import { ArticleSection } from './components/article-section/article-section'

export const AdminCommunityNature: FC = () => {
	const { data: aboutNatureData } = useGetNatureCommunityQuery(null)
	const [saveNatureCommunity] = useSaveNatureCommunityMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<NatureInputs>({
		mode: 'onBlur',
		resolver: yupResolver(natureSchema),
		defaultValues: {
			photos: [],
			gallerySection: false,
			bottomDescsSection: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<NatureInputs> = async (data) => {
		try {
			const res = await saveNatureCommunity(transformToFormData(data))

			if (res) markAsSent(true)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		if (aboutNatureData) {
			const { articleName, topDescs, bottomDescs } = aboutNatureData
			methods.reset({
				articleName,
				topDescs,
				bottomDescs,
				gallerySection: false,
				bottomDescsSection: false,
			})
		}
	}, [aboutNatureData])

	return (
		<>
			<Helmet>
				<title>История</title>
			</Helmet>
			<AdminContent title='Природа' link='https://атманов-угол.рф/about/about-nature'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<TitleSection />
						<GallerySection images={aboutNatureData?.photos} />
						<ArticleSection />
						<AdminControllers isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
