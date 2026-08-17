import { type RefundInputs, refundModalSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { CloseModalSvg } from 'src/UI/icons/closeModalSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { GridRow } from 'src/components/grid-row/grid-row'

export const ChangeRefundModal = () => {
	const { closeModal } = useActions()

	const methods = useForm<RefundInputs>({
		mode: 'onBlur',
		resolver: yupResolver(refundModalSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<RefundInputs> = (data) => {
		console.log(data)
		markAsSent(true)
	}

	return (
		<div className={styles.refundModal}>
			<div className='modal-header'>
				<h3>Настройки возврата билетов</h3>
				<button onClick={() => closeModal()} type='button'>
					<CloseModalSvg />
				</button>
			</div>
			<div className='modal-content'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<FlexRow className={styles.refundForm}>
							<FlexRow className={styles.adminRow}>
								<div className={styles.inputWrapper}>
									<ControlledSelect
										name='refund'
										label='Возврат при отмене *'
										selectOptions={[{ label: 'авто', value: '0' }]}
									/>
								</div>
								<p className={styles.disclaimer}>
									Выбор алгоритма возврата средств за билеты в случае отмены события, на которые
									билеты были приобретены.
								</p>
							</FlexRow>
							<FlexRow className={styles.checkboxRow}>
								<ControlledCheckbox
									name='use_auto_refund'
									label='Автовозврат по запросу'
									type='checkbox'
									className={styles.checkbox}
								/>
								<p className={styles.desc}>
									Выбор алгоритма возврата средств за билеты в случае отмены события, на которые
									билеты были приобретены.
								</p>
							</FlexRow>
							<FlexRow className={styles.adminRow}>
								<GridRow $template='auto/150px 310px' $width='auto' $gap='10px' $mdGap='10px'>
									<ControlledSelect
										name='kom'
										label='Комиссия *'
										selectOptions={[{ label: 'удерживать', value: '0' }]}
									/>
									<ControlledSelect
										name='procent'
										label='Процент удержания *'
										selectOptions={[{ label: '11% (стандарт)', value: '0' }]}
									/>
								</GridRow>
								<p className={styles.disclaimer}>
									Определите, удерживать ли комиссию, и, если да, то в каком объеме. Проценты
									удержания выбираются из справочника и не могут быть указаны при помощи ручного
									ввода.
								</p>
							</FlexRow>
							<FlexRow className={styles.checkboxRow}>
								<ControlledCheckbox
									name='use_reject'
									label='Отказ разрешен'
									type='checkbox'
									className={styles.checkbox}
								/>
								<p className={styles.desc}>
									Правила организатора разрешают оператору отказать в возврате средств за ранее
									купленные билеты по запросу покупателя билетов.
								</p>
							</FlexRow>
							<FlexRow className={styles.checkboxRow}>
								<ControlledCheckbox
									name='use_rej_message'
									label='Сообщение при отказе'
									type='checkbox'
									className={styles.checkbox}
								/>
								<p className={styles.desc}>
									Возврат билетов не может быть принят по следующей причине:
									<br />
									<strong>Причина (вводится оператором при отказе в возврате).</strong>
								</p>
							</FlexRow>
							<FlexRow className={styles.checkboxRow}>
								<ControlledCheckbox
									name='use_refund_free'
									label='Возврат бесплатных билетов'
									type='checkbox'
									className={styles.checkbox}
								/>
								<p className={styles.desc}>
									Разрешать ли возврат бесплатных билетов. Средства при таком возврате не
									возвращаются ввиду того, что ранее не были внесены.
								</p>
							</FlexRow>
							<FlexRow className={styles.adminRow}>
								<div className={styles.inputWrapper}>
									<ControlledSelect
										name='day_count'
										label='Предел возврата *'
										selectOptions={[{ label: '7 дней до события (стандарт)', value: '0' }]}
									/>
								</div>
								<p className={styles.disclaimer}>
									Определите предельный срок возврата средств в днях. Количество дней выбирается из
									справочника и не может быть указано при помощи ручного ввода.
								</p>
							</FlexRow>
							<FlexRow className={styles.checkboxRow}>
								<ControlledCheckbox
									name='use_refund_after'
									label='Возврат после начала события'
									type='checkbox'
									className={styles.checkbox}
								/>
								<p className={styles.desc}>
									Разрешать ли возврат билетов после того, как событие уже началось. Рекомендация:
									запретить такой возврат.
								</p>
							</FlexRow>
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
