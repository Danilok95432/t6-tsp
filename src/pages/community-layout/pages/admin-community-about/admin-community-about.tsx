import { type FC, useEffect, useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import {
	type CommunityInputs,
	communitySchema,
} from 'src/pages/community-layout/pages/admin-community-about/schema'

import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { TitleSection } from 'src/pages/community-layout/pages/admin-community-about/components/title-section/title-section'
import { GallerySection } from 'src/pages/community-layout/pages/admin-community-about/components/gallery-section/gallery-section'
import { ArticleSection } from 'src/pages/community-layout/pages/admin-community-about/components/article-section/article-section'
import { booleanToNumberString, transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useGetAboutEditQuery, useSaveAboutMutation } from 'src/store/vids/vids.api'

export const AdminCommunityAbout: FC = () => {
	const { data: aboutCommunityData } = useGetAboutEditQuery(null)
	const [saveAboutCommunity] = useSaveAboutMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<CommunityInputs>({
		mode: 'onBlur',
		resolver: yupResolver(communitySchema),
		defaultValues: {
			logo: [],
			photoGallery: [],
			gallerySection: false,
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<CommunityInputs> = async (data) => {
		try {
			const serverData = {
				...data,
				caption_show: booleanToNumberString(data.caption_show),
			}
			const res = await saveAboutCommunity(transformToFormData(serverData))
			if (res) markAsSent(true)
		} catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		if (aboutCommunityData) {
			const { caption, mainDescs, descs, caption_show: captionShow } = aboutCommunityData
			methods.reset({ caption, mainDescs, descs, articleSection: true, caption_show: captionShow })
		}
	}, [aboutCommunityData])

	return (
		<>
			<Helmet>
				<title>О премии</title>
			</Helmet>
			<AdminContent title='Детали и история' link='https://атманов-угол.рф/about'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<TitleSection logo={aboutCommunityData?.logo} />
						<GallerySection images={aboutCommunityData?.photoGallery} />
						<ArticleSection />
						<AdminControllers isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
