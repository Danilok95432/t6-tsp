import { useEffect, useState, type FC } from 'react'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetRulesInfoQuery, useSaveRulesInfoMutation } from 'src/store/events/events.api'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import styles from './index.module.scss'
import { PoliticSection } from './components/politic-section/politic-section'
import { RulesSection } from './components/rules-section/rules-section'
import { type RulesInputs, rulesSchema } from './schema'

export const AdminEventRules: FC = () => {
	const { id = '0' } = useParams()
	const { data: rulesData } = useGetRulesInfoQuery(id)
	const [saveRulesInfo] = useSaveRulesInfoMutation()

	const methods = useForm<RulesInputs>({
		mode: 'onBlur',
		resolver: yupResolver(rulesSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<RulesInputs> = async (data) => {
		const eventId = id
		const eventInfoFormData = new FormData()

		eventInfoFormData.append('id', eventId)
		eventInfoFormData.append('rule_name', data.rule_name)
		eventInfoFormData.append('rule_text', data.rule_text)
		eventInfoFormData.append('politic_name', data.politic_name)
		eventInfoFormData.append('politic_text', data.politic_text)
		const res = await saveRulesInfo(eventInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (rulesData) {
			methods.reset({ ...rulesData })
		}
	}, [rulesData])

	return (
		<AdminContent className={styles.eventRulesPage}>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<RulesSection />
					<PoliticSection />
					<AdminControllers
						variant='4'
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
