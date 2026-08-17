import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { MainSection } from './components/main-section/main-section'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { useEffect, useState } from 'react'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useGetInspectorInfoQuery, useSaveInspectorInfoMutation } from 'src/store/events/events.api'
import { type OneInspectorInputs, oneInspectorSchema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
export const OneInspector = () => {
	const { id = '', subId = '' } = useParams()
	const { data: inspectorData } = useGetInspectorInfoQuery(subId)
	const [saveFormInfo] = useSaveInspectorInfoMutation()
	// const [sendDeclineRequest] = useGetDeclineStatusRequestMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const navigate = useNavigate()

	const methods = useForm<OneInspectorInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneInspectorSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneInspectorInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', subId)
		formData.append('fio', data.fio)
		formData.append('user_name', data.user_name ?? '')
		formData.append('user_pass', data.user_pass ?? '')
		formData.append('description', data.description ?? '')
		formData.append('telphone', data.telphone ?? '')
		formData.append(
			'id_inspector_type',
			typeof data.inspector_types_list === 'string'
				? data.inspector_types_list
				: data.inspector_types_list
					? data.inspector_types_list[0].value
					: '0',
		)
		formData.append(
			'id_pitanie_place',
			typeof data.inspector_pitanie_place === 'string'
				? data.inspector_pitanie_place
				: data.inspector_pitanie_place
					? data.inspector_pitanie_place[0].value
					: '0',
		)
		formData.append(
			'id_enter_zone',
			typeof data.inspector_enter_zones === 'string'
				? data.inspector_enter_zones
				: data.inspector_enter_zones
					? data.inspector_enter_zones[0].value
					: '0',
		)
		const res = await saveFormInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(
					`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Inspectors}`,
				)
			}
		}
	}

	useEffect(() => {
		if (inspectorData) {
			methods.reset({ ...inspectorData })
		}
	}, [inspectorData])

	return (
		<>
			<Container $padding='0px 30px 35px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Inspectors}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку инспекторов
				</Link>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection
							inspectorEnterZones={inspectorData?.inspector_enter_zones}
							inspectorPitaniePlace={inspectorData?.inspector_pitanie_place}
							inspectorTypesList={inspectorData?.inspector_types_list}
						/>
						<FlexRow $margin='0 0 40px 0' $maxWidth='1140px'>
							<AdminButton as='button' type='submit' onClick={() => setAction('save')}>
								Сохранить и выйти
							</AdminButton>
							<AdminButton
								as='button'
								type='submit'
								$variant={isSent ? 'sent' : 'light'}
								onClick={() => setAction('apply')}
							>
								Применить и продолжить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Inspectors}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку инспекторов
				</Link>
			</Container>
		</>
	)
}
