import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { MainSection } from './components/main-section'
import { CustomDisclaimer } from 'src/components/custom-disclaimer/custom-disclaimer'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { type PlacementInputs } from './schema'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const StepPlacement = () => {
	const navigate = useNavigate()
	const methods = useForm<PlacementInputs>({
		mode: 'onBlur',
		defaultValues: {
			use_event: false,
			use_reg: false,
			use_lend: false,
			lending: {},
		},
	})
	const onSubmit: SubmitHandler<PlacementInputs> = async (data) => {
		console.log(data)
		navigate(`/`)
	}
	return (
		<div className={styles.stepPage}>
			<h2>
				<span>Шаг 5: </span>Размещение события в сети
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
							Завершить создание
						</AdminButton>
						<p>
							Все данные события будут доступны
							<a href={`/${AdminRoute.AdminEvent}`}> в расширенных настройках события</a>, начиная с
							профиля события.
						</p>
					</FlexRow>
				</form>
			</FormProvider>
		</div>
	)
}
