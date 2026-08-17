import { rejectRefundModalSchema, type RejectRefundInputs } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { CloseModalSvg } from 'src/UI/icons/closeModalSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const RejectRefundModal = () => {
	const { closeModal } = useActions()

	const methods = useForm<RejectRefundInputs>({
		mode: 'onBlur',
		resolver: yupResolver(rejectRefundModalSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<RejectRefundInputs> = (data) => {
		console.log(data)
		markAsSent(true)
	}

	return (
		<div className={styles.refundModal}>
			<div className='modal-header'>
				<h3>Отказать в возврате билетов</h3>
				<button onClick={() => closeModal()} type='button'>
					<CloseModalSvg />
				</button>
			</div>
			<div className='modal-content'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<FlexRow className={styles.refundForm}>
							<h4>Данные запроса возврата</h4>
							<FlexRow className={styles.tableRow}>
								<FlexRow className={styles.labelRow}>
									<p>
										<strong>Дата запроса</strong>
									</p>
									<p>
										<strong>Событие</strong>
									</p>
									<p>
										<strong>Тип билета</strong>
									</p>
									<p>
										<strong>Основание возврата</strong>
									</p>
									<p>
										<strong>Количество билетов</strong>
									</p>
									<p>
										<strong>Возврат на сумму</strong>
									</p>
									<p>
										<strong>Удержание</strong>
									</p>
								</FlexRow>
								<FlexRow className={styles.valueRow}>
									<p>{'22.08.2025'}</p>
									<p>{'Атмановские Кулачки 2024'}</p>
									<p>{'Стандарт Семейный'}</p>
									<p>{'Запрос до 14 дн.'}</p>
									<p>{'3'}</p>
									<p>{'3 600.00 ₽'}</p>
									<p>{'11%'}</p>
								</FlexRow>
							</FlexRow>
							<ControlledInput
								name='comment'
								isTextarea
								height='100px'
								label='Причина отказа'
								placeholder='Причина'
								margin='0 0 15px 0'
							/>
						</FlexRow>
						<AdminButton
							as='button'
							$height='40px'
							type='submit'
							$variant={isSent ? 'sent' : 'primary'}
						>
							Сохранить
						</AdminButton>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
