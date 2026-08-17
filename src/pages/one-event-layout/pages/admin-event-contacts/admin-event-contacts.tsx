import { useEffect, useState, type FC } from 'react'
import {
	type EventContactsInputs,
	eventContactsSchema,
} from 'src/pages/one-event-layout/pages/admin-event-contacts/schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	useGetContactsByEventIdQuery,
	useSaveEventContactInfoMutation,
} from 'src/store/events/events.api'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { InfoSection } from 'src/pages/one-event-layout/pages/admin-event-contacts/components/info-section/info-section'
import { RoutesSection } from 'src/pages/one-event-layout/pages/admin-event-contacts/components/routes-section/routes-section'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { booleanToNumberString } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import styles from './index.module.scss'

export const AdminEventContacts: FC = () => {
	const { id = '0' } = useParams()
	const { data: contactsInfoData } = useGetContactsByEventIdQuery(id)
	const [saveEventContactsInfo] = useSaveEventContactInfoMutation()

	const methods = useForm<EventContactsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(eventContactsSchema),
		defaultValues: {
			hide_telphone: false,
			hide_tg: false,
			hide_email: false,
			hide_pathways: false,
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<EventContactsInputs> = async (data) => {
		const eventId = id
		const eventInfoFormData = new FormData()

		eventInfoFormData.append('id', eventId)

		data.pathways?.forEach((pathway, index) => {
			eventInfoFormData.append(`pathways_title[${index}]`, pathway.title)
			eventInfoFormData.append(`pathways_desc[${index}]`, pathway.desc)
			eventInfoFormData.append(`pathways_location[${index}]`, pathway.location)
		})

		eventInfoFormData.append('website', data.website)
		eventInfoFormData.append('contact_tg', data.contact_tg)
		eventInfoFormData.append('contact_telphone', data.contact_telphone)
		eventInfoFormData.append('contact_email', data.contact_email)
		eventInfoFormData.append('hide_telphone', booleanToNumberString(data.hide_telphone))
		eventInfoFormData.append('hide_tg', booleanToNumberString(data.hide_tg))
		eventInfoFormData.append('hide_email', booleanToNumberString(data.hide_email))
		eventInfoFormData.append('hide_pathways', booleanToNumberString(data.hide_pathways))

		const res = await saveEventContactsInfo(eventInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (contactsInfoData) {
			methods.reset({ ...contactsInfoData })
		}
	}, [contactsInfoData])

	return (
		<AdminContent className={styles.eventContactsPage}>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку событий
			</Link>
			<h3>Контакты</h3>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<InfoSection />
					<RoutesSection />
					<AdminControllers
						variant={'2'}
						outLink={`/${AdminRoute.AdminEventsList}`}
						isSent={isSent}
						actionHandler={setAction}
					/>
				</form>
			</FormProvider>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку событий
			</Link>
		</AdminContent>
	)
}
