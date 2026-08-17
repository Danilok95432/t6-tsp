import { useEffect, useState, type FC } from 'react'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
	type EventContentInputs,
	eventContentSchema,
} from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-content/schema'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import {
	useGetContentByEventIdQuery,
	useSaveEventContentInfoMutation,
} from 'src/store/events/events.api'
import { booleanToNumberString, currentDateString, formatDateToYYYYMMDD } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { PromoSection } from './components/promo-section/promo-section'
import { InfoSection } from './components/info-section/info-section'
import { PreviewSection } from './components/preview-section/preview-section'
import { PlacementSection } from './components/placement-section/placement-section'
import { GallerySection } from './components/gallery-section/gallery-section'
import { LinksSection } from './components/links-section/links-section'
import { DocsSection } from './components/docs-section/docs-section'

export const AdminEventContent: FC = () => {
	const { id = '0' } = useParams()
	const { data: contentInfoData } = useGetContentByEventIdQuery(id)
	const [saveEventContentInfo] = useSaveEventContentInfoMutation()

	const methods = useForm<EventContentInputs>({
		mode: 'onBlur',
		resolver: yupResolver(eventContentSchema),
		defaultValues: {
			hide_placements: false,
			hide_gallery: false,
			hide_links: false,
			hide_documents: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<EventContentInputs> = async (data) => {
		const eventId = id
		const eventInfoFormData = new FormData()

		eventInfoFormData.append('id', eventId)

		data.placements?.forEach((placement, index) => {
			eventInfoFormData.append(`placements_title[${index}]`, placement.title)
			eventInfoFormData.append(`placements_desc[${index}]`, placement.desc)
			eventInfoFormData.append(`placements_location[${index}]`, placement.location)
		})

		data.links?.forEach((link, index) => {
			eventInfoFormData.append(`links_title[${index}]`, link.title)
			eventInfoFormData.append(`links_link[${index}]`, link.link)
			eventInfoFormData.append(`links_desc[${index}]`, link.desc)
			eventInfoFormData.append(`links_date[${index}]`, formatDateToYYYYMMDD(link.date))
		})

		eventInfoFormData.append('linksBlock_title', data.linksBlock_title ?? '')
		eventInfoFormData.append('hide_placements', booleanToNumberString(data.hide_placements))
		eventInfoFormData.append('hide_gallery', booleanToNumberString(data.hide_gallery))
		eventInfoFormData.append('hide_links', booleanToNumberString(data.hide_links))
		eventInfoFormData.append('hide_documents', booleanToNumberString(data.hide_documents))

		eventInfoFormData.append('infoblock.title', data.infoblock?.title ?? '')
		eventInfoFormData.append('infoblock.short', data.infoblock?.short ?? '')
		eventInfoFormData.append('infoblock.link_text', data.infoblock?.link_text ?? '')
		eventInfoFormData.append('infoblock.link_url', data.infoblock?.link_url ?? '')
		eventInfoFormData.append(
			'infoblock.reg_participants',
			booleanToNumberString(data.infoblock?.reg_participants),
		)
		eventInfoFormData.append(
			'infoblock.reg_guests',
			booleanToNumberString(data.infoblock?.reg_guests),
		)

		const res = await saveEventContentInfo(eventInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (contentInfoData) {
			const modifiedContentInfoData = { ...contentInfoData }
			if (modifiedContentInfoData.links) {
				modifiedContentInfoData.links = modifiedContentInfoData.links.map((link) => {
					if (link.date === '0000-00-00') {
						return { ...link, date: currentDateString() }
					}
					return link
				})
			}
			methods.reset(modifiedContentInfoData)
		}
	}, [contentInfoData, methods.reset])

	return (
		<AdminContent className={styles.eventContentPage}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<PreviewSection logo={contentInfoData?.photo} />
					<PlacementSection />
					<GallerySection images={contentInfoData?.photos} idItem={id} />
					<DocsSection files={contentInfoData?.documents} />
					<LinksSection />
					<PromoSection images={contentInfoData?.promo} idItem={id} />
					<InfoSection photo={contentInfoData?.infoblock?.photo} />
					<AdminControllers
						variant={'2'}
						outLink={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`}
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
