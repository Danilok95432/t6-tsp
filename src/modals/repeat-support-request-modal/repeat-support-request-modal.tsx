import { type SupportRequestInputs, supportRequestModalSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'

import { CloseModalSvg } from 'src/UI/icons/closeModalSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AddButton } from 'src/UI/AddButton/AddButton'

export const RepeatSupportRequestModal = () => {
	const { closeModal } = useActions()

	const methods = useForm<SupportRequestInputs>({
		mode: 'onBlur',
		resolver: yupResolver(supportRequestModalSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<SupportRequestInputs> = (data) => {
		console.log(data)
		markAsSent(true)
	}

	return (
		<div className={styles.addModal}>
			<div className='modal-header'>
				<h3>Повторное обращение в поддержку</h3>
				<button onClick={() => closeModal()} type='button'>
					<CloseModalSvg />
				</button>
			</div>
			<div className='modal-content'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<FlexRow className={styles.addForm}>
							<FlexRow className={styles.repeat}>
								<p>
									<strong>Предыдущее обращение: </strong>
								</p>
								<p>{'СТ-24067, Почему у моих турникетов нет хвостов и ушей?'}</p>
							</FlexRow>
							<ControlledSelect
								name='topic'
								label='Тема обращения *'
								selectOptions={[{ label: 'ошибка на сайте', value: '0' }]}
							/>
							<FlexRow className={styles.adminRow}>
								<div className={styles.inputWrapper}>
									<ControlledSelect
										name='urgency'
										label='Срочность обращения *'
										selectOptions={[{ label: 'средняя', value: '0' }]}
									/>
								</div>
								<p className={styles.disclaimer}>
									Высокая срочность: нарушен рабочий процесс, средняя срочность: потенциальное
									нарушение рабочего процесса, низкая срочность: все остальные варианты.
								</p>
							</FlexRow>
							<ReactDropzoneFiles
								className={styles.filesDrop}
								name='files'
								label={`Прикрепить файл pdf, png или jpg (${0} из 3)`}
								variant='text'
								multiple
								customUploadBtn={<AddButton>Добавить</AddButton>}
							/>
							<ControlledInput
								name='text'
								isTextarea
								label='Текст обращения *'
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
							Направить
						</AdminButton>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
