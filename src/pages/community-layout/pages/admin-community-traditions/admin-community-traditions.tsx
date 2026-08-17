import { type FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type TraditionsInputs, traditionsSchema } from './schema'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { TitleSection } from './components/title-section/title-section'
import { GallerySection } from './components/gallery-section/gallery-section'
import { TraditionsElements } from './components/traditions-elements/traditions-elements'

export const AdminCommunityTraditions: FC = () => {
	const methods = useForm<TraditionsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(traditionsSchema),
		defaultValues: {},
	})

	const onSubmit: SubmitHandler<TraditionsInputs> = async (data) => {
		console.log(data)
	}

	return (
		<>
			<Helmet>
				<title>Традиции Атманова Угла</title>
			</Helmet>
			<AdminContent title='Традиции Атманова Угла' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<TitleSection />
						<GallerySection />
					</form>
				</FormProvider>
				<TraditionsElements />
			</AdminContent>
		</>
	)
}
