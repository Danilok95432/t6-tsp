import { type AuthInputs, authSchema } from 'src/modals/auth-modal/schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useActions } from 'src/hooks/actions/actions'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useLoginUserMutation } from 'src/store/auth/auth.api'
import { transformToFormData } from 'src/helpers/utils'

import { PassRecoveryModal } from '../pass-recovery-modal/pass-recovery-modal'

import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

export const AuthModal = () => {
	const { openModal, closeModal, setAuth, setUser } = useActions()
	const [loginUser] = useLoginUserMutation()

	const methods = useForm<AuthInputs>({
		mode: 'onBlur',
		resolver: yupResolver(authSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
		const formData = transformToFormData(data)
		try {
			const { data: resData } = await loginUser(formData)
			if (resData && 'token' in resData && 'user' in resData) {
				markAsSent(true)
				localStorage.setItem('token', resData.token)
				setAuth(true)
				setUser(resData.user)
				closeModal()
				navigate(`/catalog/types`)
			}
		} catch (err) {
			console.error(err)
			closeModal()
		}
	}

	// const handleCodeSubmit = async () => {
	// 	const isValidLogin = await methods.trigger('login')

	// 	if (isValidLogin) console.log(methods.getValues('login'))
	// }

	return (
		<div className={styles.authModal}>
			<div className='modal-header'>
				<h3>Т-6 торговля</h3>
			</div>
			<div className='modal-content'>
				<h4>Вход в систему</h4>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.loginInputWrapper}>
							<ControlledInput name='user_name' label='Логин *' margin='0 0 20px 0' />
							{/* <AdminButton
								as='button'
								$height='26px'
								$padding='0 10px'
								$fontSize='13px'
								type='button'
								onClick={handleCodeSubmit}
							>
								Отправить код
							</AdminButton> */}
						</div>

						<ControlledInput
							name='password'
							label='Пароль *'
							placeholder='**********'
							type='password'
							margin='0 0 20px 0'
						/>
						{/* <ControlledInput
							name='verificationCode'
							label='Проверочный код *'
							placeholder='****'
							type='password'
							margin='0 0 25px 0'
						/> */}
						<AdminButton
							as='button'
							$height='40px'
							$margin='0 0 20px 0'
							type='submit'
							$variant={isSent ? 'sent' : 'primary'}
						>
							Войти
						</AdminButton>
						<button
							className='modal-link-btn'
							onClick={() => openModal(<PassRecoveryModal />)}
							type='button'
						>
							Восстановить пароль
						</button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
