import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import styles from './index.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { type MainInfoInputs, mainInfoSchema } from './schema'
import { MainSection } from './components/main-section'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useNavigate } from 'react-router-dom'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const StepMain = () => {
	const navigate = useNavigate()
	const methods = useForm<MainInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(mainInfoSchema),
		defaultValues: {
			age_list: '1',
		},
	})
	const onSubmit: SubmitHandler<MainInfoInputs> = async (data) => {
		console.log(data)
		navigate(`/${AdminRoute.AdminExpressEvent}/${AdminRoute.ExpressInfo}`)
	}
	return (
		<div className={styles.stepPage}>
			<h2>
				<span>Шаг 1: </span>Главное о событии
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
							Создать событие
						</AdminButton>
						<p>Сохранить событие и перейти к следующему шагу</p>
					</FlexRow>
				</form>
			</FormProvider>
		</div>
	)
}
