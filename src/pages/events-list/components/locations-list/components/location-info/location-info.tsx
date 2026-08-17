import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useState } from 'react'
import { type LocationInfoInputs, LocationInfoSchema } from './schema'
import { booleanToNumberString, transformToFormData } from 'src/helpers/utils'
import { MainSection } from './components/main-section/main-section'
import { StatusRequestList } from 'src/components/status-request-lists/status-request-lists'

export const LocationInfo = () => {
	const { id = '0' } = useParams()
	const methods = useForm<LocationInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(LocationInfoSchema),
		defaultValues: {
			photo: [],
			photos: [],
			url: '',
			hidden: false,
			cicle_dates: '',
			age: '',
		},
	})

	const { markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<LocationInfoInputs> = async (data) => {
		const serverData = {
			id_cicle_type:
				typeof data.id_cicle_type === 'string'
					? data.id_cicle_type
					: data.id_cicle_type
						? data.id_cicle_type[0].value
						: '0',
			anonstext: data.anonstext,
			use_video: booleanToNumberString(data.use_video),
		}
		const eventInfoFormData = transformToFormData(serverData)
		const eventId = id
		eventInfoFormData.append('id', eventId)
		// const res = await saveCicleInfo(eventInfoFormData)
		if (id) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminLocationsList}`)
			}
		}
	}

	// useEffect(() => {
	// 	if (cicleInfo) {
	// 		methods.reset({ ...cicleInfo })
	// 	}
	// }, [cicleInfo])

	return (
		<AdminContent className={styles.eventProfilePage} $backgroundColor='#ffffff'>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminLocationsList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку площадок
			</Link>
			<h3 className={styles.titleInfo}>Профиль площадки</h3>
			<StatusRequestList statusCode='3' text='Статус площадки' className={styles.status} />
			<FormProvider {...methods}>
				<form
					className={styles.eventProfileForm}
					onSubmit={methods.handleSubmit(onSubmit)}
					noValidate
					autoComplete='off'
				>
					<MainSection />
					<FlexRow $margin='0 0 40px 0' $maxWidth='1140px' $justifyContent='space-between'>
						<FlexRow>
							<AdminButton as='button' type='submit' onClick={() => setAction('save')}>
								Подать заявку
							</AdminButton>
							<AdminButton as='button' type='submit' onClick={() => setAction('apply')}>
								Поменять данные
							</AdminButton>
							<AdminButton
								as='route'
								to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminLocationsList}`}
								$variant='cancel'
							>
								Отменить
							</AdminButton>
						</FlexRow>
					</FlexRow>
				</form>
			</FormProvider>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminCiclesList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку площадок
			</Link>
		</AdminContent>
	)
}
