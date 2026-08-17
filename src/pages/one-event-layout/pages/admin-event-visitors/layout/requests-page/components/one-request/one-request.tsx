import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainSection } from './components/main-section/main-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import {
	useGetAcceptStatusRequestMutation,
	useGetDeclineStatusRequestMutation,
	useGetRequestInfoQuery,
} from 'src/store/events/events.api'

export const OneRequestList = () => {
	const { id = '', subId = '' } = useParams()
	const { data: reqData } = useGetRequestInfoQuery(subId)
	const [sendAcceptRequest] = useGetAcceptStatusRequestMutation()
	const [sendDeclineRequest] = useGetDeclineStatusRequestMutation()
	const navigate = useNavigate()

	const methods = useForm<FieldValues>({
		mode: 'onBlur',
	})
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data)
		navigate(
			`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`,
		)
	}

	const handleAccept = async () => {
		try {
			await sendAcceptRequest(subId).unwrap()
			navigate(
				`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`,
			)
		} catch (error) {
			console.error('Ошибка при принятии заявки:', error)
		}
	}

	const handleDecline = async () => {
		try {
			await sendDeclineRequest(subId).unwrap()
			navigate(
				`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`,
			)
		} catch (error) {
			console.error('Ошибка при отклонении заявки:', error)
		}
	}

	return (
		<>
			<Container $padding='0px 30px 35px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку заявок
				</Link>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection data={reqData} />
						<FlexRow $margin='0 0 40px 0' $maxWidth='1140px'>
							{reqData?.statusname === 'Ожидание' && (
								<>
									<AdminButton as='button' type='button' onClick={handleAccept}>
										Принять заявку
									</AdminButton>
									<AdminButton as='button' type='button' $variant='cancel' onClick={handleDecline}>
										Отклонить
									</AdminButton>
								</>
							)}
							{reqData?.statusname === 'Отклонена' && (
								<>
									<AdminButton as='button' type='button' onClick={handleAccept}>
										Принять заявку
									</AdminButton>
									<AdminButton
										as='button'
										type='button'
										$variant='pending'
										onClick={() => {
											// Здесь должна быть логика перевода в ожидание
											navigate(
												`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`,
											)
										}}
									>
										В ожидающие
									</AdminButton>
								</>
							)}
							{reqData?.statusname === 'Принята' && (
								<>
									<AdminButton
										as='button'
										type='button'
										onClick={() => {
											// Здесь должна быть логика принятия заявки
											navigate(
												`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`,
											)
										}}
									>
										Принять заявку
									</AdminButton>
									<AdminButton as='button' type='button' $variant='cancel' onClick={handleDecline}>
										Отклонить
									</AdminButton>
								</>
							)}
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Requests}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку заявок
				</Link>
			</Container>
		</>
	)
}
