import { type PassRecoveryInputs, passRecoverySchema } from 'src/modals/pass-recovery-modal/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { AuthModal } from 'src/modals/auth-modal/auth-modal'

import styles from './index.module.scss'

export const PassRecoveryModal = () => {
	const { openModal } = useActions()

	const methods = useForm<PassRecoveryInputs>({
		mode: 'onBlur',
		resolver: yupResolver(passRecoverySchema),
	})

	const onSubmit: SubmitHandler<PassRecoveryInputs> = (data) => {
		console.log(data)
	}

	const handleCodeSubmit = async () => {
		const isValidLogin = await methods.trigger('login')
		if (isValidLogin) console.log(methods.getValues('login'))
	}

	return (
		<div className={styles.passRecoveryModal}>
			<div className='modal-header'>
				<h3>Т-6 Атманов Угол</h3>
			</div>
			<div className='modal-content'>
				<h4>Восстановление пароля</h4>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.loginInputWrapper}>
							<ControlledMaskedInput
								name='login'
								label='Логин *'
								placeholder='+7 (999) 999-00-00'
								mask='{+7} (000) 000-00-00'
								$margin='0 0 20px 0'
							/>
							<AdminButton
								as='button'
								$height='26px'
								$padding='0 10px'
								$fontSize='13px'
								type='button'
								onClick={handleCodeSubmit}
							>
								Отправить код
							</AdminButton>
						</div>

						<ControlledInput
							name='verificationCode'
							label='Проверочный код *'
							placeholder='****'
							type='password'
							margin='0 0 25px 0'
						/>
						<AdminButton as='button' $height='40px' $margin='0 0 20px 0' type='submit'>
							Восстановить
						</AdminButton>
						<button
							className='modal-link-btn'
							onClick={() => openModal(<AuthModal />)}
							type='button'
						>
							Войти с паролем
						</button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
