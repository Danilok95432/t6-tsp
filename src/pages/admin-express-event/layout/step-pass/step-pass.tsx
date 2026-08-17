import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { MainSection } from './components/main-section'
import { CustomDisclaimer } from 'src/components/custom-disclaimer/custom-disclaimer'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { type PassInputs } from './schema'

export const StepPass = () => {
	const navigate = useNavigate()
	const methods = useForm<PassInputs>({
		mode: 'onBlur',
		defaultValues: {
			use_pass: false,
			use_app: false,
			use_turniket: false,
			gates: '0',
		},
	})
	const onSubmit: SubmitHandler<PassInputs> = async (data) => {
		console.log(data)
		navigate(`/${AdminRoute.AdminExpressEvent}/${AdminRoute.ExpressPlacement}`)
	}
	return (
		<div className={styles.stepPage}>
			<h2>
				<span>Шаг 4: </span>Пропускная система
			</h2>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
					<MainSection />
					<CustomDisclaimer closable>
						<p>
							Тонкие настройки регистрации, состав полей формы, создание разных вариантов билетов и
							скидок на них можно сделать{' '}
							<a href={`${AdminRoute.AdminSettings}`}>в разделе «Настройки»</a>. В любом случае,
							потребуется связаться с нами для согласования технических условий предоставления
							пропускной системы, оплаты и осуществления ряда настроек.
						</p>
					</CustomDisclaimer>
					<FlexRow className={styles.nextRow}>
						<AdminButton
							$height='auto'
							$fontSize='20px'
							$padding='22px 30px'
							as='button'
							type='submit'
						>
							К настройке размещения события
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
		</div>
	)
}
