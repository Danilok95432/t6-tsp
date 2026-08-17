import { AdminContent } from 'src/components/admin-content/admin-content'
import styles from './index.module.scss'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useEffect, useState } from 'react'
import { type EventPassInputs } from './schema'
import { SelectSection } from './components/select-section/select-section'
import { TableSection } from './components/table-section/table-section'
import { CheckboxSection } from './components/checkbox-section/checkbox-section'
import { CustomDisclaimer } from 'src/components/custom-disclaimer/custom-disclaimer'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useGetEventPassQuery, useSaveEventPassMutation } from 'src/store/events/events.api'
import { useNavigate, useParams } from 'react-router-dom'
import { booleanToNumberString } from 'src/helpers/utils'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const AdminEventPass = () => {
	const { id = '0' } = useParams()
	const { data: passData } = useGetEventPassQuery(id)
	const [savePass] = useSaveEventPassMutation()
	const methods = useForm<EventPassInputs>({
		mode: 'onBlur',
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<EventPassInputs> = async (data) => {
		console.log(data)
		const formData = new FormData()
		formData.append('id', id)
		formData.append('turniketsCount', data.turniketsCount ?? '')
		formData.append('inspectorsCount', data.inspectorsCount ?? '')
		formData.append('use_tech_conditions', booleanToNumberString(data.use_tech_conditions))
		formData.append('use_com_conditions', booleanToNumberString(data.use_com_conditions))
		formData.append('use_paid', booleanToNumberString(data.use_paid))
		formData.append('paidCount', data.paidCount ?? '')
		formData.append('use_docs', booleanToNumberString(data.use_docs))
		formData.append('signed', data.signed ?? '')
		formData.append('ready', data.ready ?? '')
		formData.append('inWork', data.inWork ?? '')
		formData.append(
			'control_list',
			typeof data.control_list === 'string' ? data.control_list : data.control_list[0].value,
		)
		formData.append(
			'auto_list',
			typeof data.auto_list === 'string' ? data.auto_list : data.auto_list[0].value,
		)
		formData.append(
			'manual_list',
			typeof data.manual_list === 'string' ? data.manual_list : data.manual_list[0].value,
		)
		const res = await savePass(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (passData) {
			methods.reset({ ...(passData as EventPassInputs) })
		}
	}, [passData])

	return (
		<AdminContent className={styles.eventPassPage} $backgroundColor='#fff'>
			<h2>Пропуск</h2>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<SelectSection
						controlList={passData?.control_list}
						autoDopuskList={passData?.auto_list}
						manualDopuskList={passData?.manual_list}
					/>
					<TableSection content={passData?.passTable ?? []} />
					<CustomDisclaimer className={styles.disc}>
						<p>
							Вы выбрали использование турникетов. Пожалуйста,{' '}
							<a className={styles.link} href='#'>
								свяжитесь c нами
							</a>{' '}
							для согласования доставки, установки и настройки пропускных пунктов, а также оплаты их
							аренды.
						</p>
					</CustomDisclaimer>
					<CheckboxSection />
					<FlexRow className={styles.btnsRow}>
						<AdminButton
							as='button'
							type='submit'
							$height='40px'
							$variant={isSent ? 'sent' : 'primary'}
							onClick={() => setAction('save')}
						>
							Сохранить и выйти
						</AdminButton>
						<AdminButton
							as='button'
							type='submit'
							$variant='light'
							$height='40px'
							onClick={() => setAction('apply')}
						>
							{isSent ? 'Изменения сохранены' : 'Применить и продолжить'}
						</AdminButton>
						<AdminButton as='link' to={'/'} $variant='cancel' $height='40px'>
							Отменить изменения
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
		</AdminContent>
	)
}
