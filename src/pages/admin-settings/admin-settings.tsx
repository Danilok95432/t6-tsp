import { useEffect, useState, type FC } from 'react'
import { defaultMainBlocksValues, type SettingsInputs } from 'src/pages/admin-settings/schema'

import { Helmet } from 'react-helmet-async'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainBlocksSection } from 'src/pages/admin-settings/components/main-blocks-section/main-blocks-section'
// import { PromoTable } from 'src/pages/admin-settings/components/promo-table/promo-table'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useNavigate } from 'react-router-dom'
import { ContactsSection } from './components/contacts-section/contacts-section'
import { InfoSection } from './components/info-section/info-section'
import { SettingsSection } from './components/settings-section/settings-section'
import {
	useGetSettingsQuery,
	useSaveSettingsInfoMutation,
} from 'src/store/site-settings/site-settings.api'
import { booleanToNumberString } from 'src/helpers/utils'

export const AdminSettings: FC = () => {
	const methods = useForm<SettingsInputs>({
		mode: 'onBlur',
		defaultValues: defaultMainBlocksValues,
	})
	const { data } = useGetSettingsQuery(null)
	const [saveSettings] = useSaveSettingsInfoMutation()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<SettingsInputs> = async (data) => {
		const formData = new FormData()
		formData.append('use_promo', booleanToNumberString(data.use_promo))
		formData.append('use_adv', booleanToNumberString(data.use_adv))
		formData.append('use_awards', booleanToNumberString(data.use_awards))
		formData.append('use_best', booleanToNumberString(data.use_best))
		formData.append('use_mainslider', booleanToNumberString(data.use_mainslider))
		formData.append('use_catalog', booleanToNumberString(data.use_catalog))
		formData.append('use_reviews', booleanToNumberString(data.use_reviews))
		formData.append('contact_address', data.contact_address)
		formData.append('contact_email', data.contact_email)
		formData.append('contact_telphone', data.contact_telphone)
		formData.append('contact_vk', data.contact_vk)
		formData.append('info_copyright', data.info_copyright)
		formData.append('site_title', data.site_title)
		formData.append('metric', data.metric ?? '')
		const res = await saveSettings(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminSettings}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			methods.reset({ ...data })
		}
	}, [data])
	return (
		<>
			<Helmet>
				<title>Настройки сайта</title>
			</Helmet>
			<h1>Настройки сайта</h1>
			<AdminContent
				className={styles.settingsContent}
				$backgroundColor='#ffffff'
				$padding='25px 30px 60px 30px'
			>
				<FormProvider {...methods}>
					<form
						className={styles.mainBlocksForm}
						onSubmit={methods.handleSubmit(onSubmit)}
						noValidate
					>
						<MainBlocksSection />
						<ContactsSection />
						<InfoSection />
						<SettingsSection />
						<AdminControllers
							outLink={AdminRoute.AdminHome}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
