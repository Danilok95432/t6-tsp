import { type FieldValues, FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Container } from 'src/UI/Container/Container'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainSection } from './components/main-section/main-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import { useGetGuestInfoQuery } from 'src/store/events/events.api'
export const GuestView = () => {
	const { id = '', subId = '' } = useParams()
	const { data: guestData } = useGetGuestInfoQuery(subId)
	// const [sendAcceptRequest] = useGetAcceptStatusRequestMutation()
	// const [sendDeclineRequest] = useGetDeclineStatusRequestMutation()
	const navigate = useNavigate()

	const methods = useForm<FieldValues>({
		mode: 'onBlur',
	})
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data)
		navigate(
			`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Guests}`,
		)
	}

	return (
		<>
			<Container $padding='0px 30px 35px 30px'>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Guests}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку гостей
				</Link>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection data={guestData?.guest} />
						<FlexRow $margin='0 0 40px 0' $maxWidth='1140px'>
							<AdminButton as='button' type='button'>
								Редактировать
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Guests}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку гостей
				</Link>
			</Container>
		</>
	)
}
