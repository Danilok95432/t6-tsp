import { useEffect, useState, type FC } from 'react'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	useGetLocationCommunityQuery,
	useSaveLocationCommunityMutation,
} from 'src/store/community/community.api'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import {
	type LocationInputs,
	locationSchema,
} from 'src/pages/community-layout/pages/admin-community-location/schema'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { MailSection } from 'src/pages/community-layout/pages/admin-community-location/components/mail-section/mail-section'
import { PhoneSection } from 'src/pages/community-layout/pages/admin-community-location/components/phones-section/phone-section'
import { EmailsSection } from 'src/pages/community-layout/pages/admin-community-location/components/emails-section/emails-section'
import { MapSection } from 'src/pages/community-layout/pages/admin-community-location/components/map-section/map-section'
import { GallerySection } from './components/gallery-section/gallery-section'

export const AdminCommunityLocation: FC = () => {
	const { data: aboutLocationData } = useGetLocationCommunityQuery(null)
	const [saveLocationCommunity] = useSaveLocationCommunityMutation()

	const methods = useForm<LocationInputs>({
		mode: 'onBlur',
		resolver: yupResolver(locationSchema),
		defaultValues: {
			mailSection: false,
			phoneSection: false,
			emailsSection: false,
			photos: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const onSubmit: SubmitHandler<LocationInputs> = async (data) => {
		console.log(data)
		const renameData = {
			mapCoords: data.mapCoords,
			mailAddress: data.mailAddress ?? '',
			'phone.contact': data.phoneOwner ?? '',
			'phone.formatNumber': data.phoneNumber ?? '',
			'email.contact': data.emailOwner ?? '',
			'email.email': data.emailAddress ?? '',
		}

		try {
			const res = await saveLocationCommunity(transformToFormData(renameData))

			if (res) markAsSent(true)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (aboutLocationData) {
			const { mapCoords, mailAddress, phone, email } = aboutLocationData

			methods.reset({
				mapCoords,
				mailAddress,
				phoneOwner: phone.contact,
				phoneNumber: phone.formatNumber,
				emailOwner: email.contact,
				emailAddress: email.email,
			})
		}
	}, [aboutLocationData])

	return (
		<>
			<Helmet>
				<title>Карта и маршруты</title>
			</Helmet>
			<AdminContent title='Карта и маршруты' link='https://атманов-угол.рф/about/about-contacts'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MapSection />
						<GallerySection images={aboutLocationData?.photos} />
						<MailSection />
						<PhoneSection />
						<EmailsSection />
						<AdminControllers isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
