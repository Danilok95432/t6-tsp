import { useEffect, useState, type FC } from 'react'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { type PaymentInputs } from './schema'
import { PaymentSection } from './components/payment-section/payment-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { useNavigate, useParams } from 'react-router-dom'
import {
	useGetSettingsPaymentQuery,
	useSaveSettingsPaymentInfoMutation,
} from 'src/store/events/events.api'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { booleanToNumberString } from 'src/helpers/utils'

export const PaymentsPage: FC = () => {
	const { id = '0' } = useParams()
	const { data: paymentData } = useGetSettingsPaymentQuery(id)
	const [saveSettingsPayments] = useSaveSettingsPaymentInfoMutation()
	const methods = useForm<PaymentInputs>({
		mode: 'onBlur',
		defaultValues: {
			use_card_pay: false,
			use_sbp: false,
			use_sber_pay: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<PaymentInputs> = async (data) => {
		const eventId = id
		const settingsInfoFormData = new FormData()
		settingsInfoFormData.append('id', eventId)
		settingsInfoFormData.append('use_card_pay', booleanToNumberString(data.use_card_pay))
		settingsInfoFormData.append('use_sbp', booleanToNumberString(data.use_sbp))
		settingsInfoFormData.append('use_sber_pay', booleanToNumberString(data.use_sber_pay))
		const res = await saveSettingsPayments(settingsInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (paymentData) {
			methods.reset({ ...(paymentData as PaymentInputs) })
		}
	}, [paymentData])

	return (
		<AdminContent className={styles.paymentPage} $backgroundColor='#fff' $padding='0 35px'>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<PaymentSection />
					<FlexRow>
						<AdminButton
							as='button'
							$height='40px'
							$fontSize='14px'
							$padding='0px 24px'
							type='submit'
							onClick={() => setAction('save')}
						>
							Сохранить и выйти
						</AdminButton>
						<AdminButton
							as='button'
							type='submit'
							$height='40px'
							$fontSize='14px'
							$padding='0px 24px'
							$variant={isSent ? 'sent' : 'light'}
							onClick={() => setAction('apply')}
						>
							Применить и продолжить
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
		</AdminContent>
	)
}
