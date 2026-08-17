import { type ResponseInputs, responseModalSchema } from './schema'
import React from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CloseModalSvg } from 'src/UI/icons/closeModalSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { SupportRequestAgainSVG } from 'src/UI/icons/supportRequestAgainSVG'

export const RepeatSupportRequestOperatorModal = () => {
	const { closeModal } = useActions()

	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(responseModalSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<ResponseInputs> = (data) => {
		const formData = {
			...data,
		}
		console.log(formData)
		markAsSent(true)
	}

	return (
		<div className={styles.responseModal}>
			<div className='modal-header'>
				<h3>Ответ поддержки</h3>
				<FlexRow className={styles.headerRow}>
					<FlexRow className={styles.againBlock}>
						<SupportRequestAgainSVG color={'#D9001B'} />
						<p>Повторное обращение</p>
					</FlexRow>
					<button onClick={() => closeModal()} type='button'>
						<CloseModalSvg />
					</button>
				</FlexRow>
			</div>
			<div className='modal-content'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<FlexRow className={styles.responseForm}>
							<FlexRow className={styles.tableRow}>
								<FlexRow className={styles.labelRow}>
									<p>Номер обращения</p>
									<p>Прошлое обращение</p>
									<p>Тема обращения</p>
									<p>Дата и время</p>
									<p>Срочность</p>
									<p>Текст обращения</p>
									<p></p>
								</FlexRow>
								<FlexRow className={styles.valueRow}>
									<p>{'СТ-24069'}</p>
									<p className={styles.repeatReq}>{'СТ-24067'}</p>
									<p>{'ошибка на сайте'}</p>
									<FlexRow className={styles.dateRow}>
										<p>{'22.03.2024'}</p>
										<p>{'22:44'}</p>
									</FlexRow>
									<p>{'средняя'}</p>
									<p>
										{
											'7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт'
										}
									</p>
									<ReactDropzoneFiles name='files' variant='text' />
								</FlexRow>
							</FlexRow>
							<ControlledInput
								name='text'
								isTextarea
								label='Текст ответа на обращение *'
								height='120px'
								margin='0 0 24px 0'
							/>
						</FlexRow>
						<AdminButton
							as='button'
							$height='40px'
							type='submit'
							$variant={isSent ? 'sent' : 'primary'}
						>
							Ответить
						</AdminButton>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
