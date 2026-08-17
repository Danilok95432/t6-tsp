import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { type InfoInputs, infoSchema } from './schema'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { MainSection } from './components/main-section'

export const StepInfo = () => {
	const navigate = useNavigate()
	const methods = useForm<InfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(infoSchema),
		defaultValues: {
			photo: [],
		},
	})
	const onSubmit: SubmitHandler<InfoInputs> = async (data) => {
		console.log(data)
		navigate(`/${AdminRoute.AdminExpressEvent}/${AdminRoute.ExpressRegistration}`)
	}
	return (
		<div className={styles.stepPage}>
			<h2>
				<span>Шаг 2: </span>Подробная информация
			</h2>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
					<MainSection />
					<FlexRow className={styles.nextRow}>
						<AdminButton
							$height='auto'
							$fontSize='20px'
							$padding='22px 30px'
							as='button'
							type='submit'
						>
							К настройке регистрации и билетов
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
		</div>
	)
}
