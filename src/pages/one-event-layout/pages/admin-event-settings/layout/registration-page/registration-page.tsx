import { useEffect, useState, type FC } from 'react'
import { type RegistrationSettingsInputs } from './schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { RegistationSettingsSection } from './components/registration-settings-section/registration-settings-section'
import { CommonSettingsSection } from './components/common-settings-section/common-settings-section'
import {
	useGetSettingsRegistrationQuery,
	useSaveSettingsRegistrationInfoMutation,
} from 'src/store/events/events.api'
import { useNavigate, useParams } from 'react-router-dom'
import {
	booleanToNumberString,
	currentDateString,
	formatDateToYYYYMMDD,
	formatTimeToHHMM,
} from 'src/helpers/utils'
import { parse, format } from 'date-fns'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const RegistrationPage: FC = () => {
	const { id = '0' } = useParams()
	const { data: regData } = useGetSettingsRegistrationQuery(id)
	const [saveSettingsReg] = useSaveSettingsRegistrationInfoMutation()

	const methods = useForm<RegistrationSettingsInputs>({
		mode: 'onBlur',
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<RegistrationSettingsInputs> = async (data) => {
		const dateFormatFrom = formatDateToYYYYMMDD(data.startDate)
		const dateFormatTo = formatDateToYYYYMMDD(data.endDate)
		const timeFormatFrom = formatTimeToHHMM(data.startTime)
		const timeFormatTo = formatTimeToHHMM(data.endTime)
		if (dateFormatFrom) data.startDate = dateFormatFrom
		if (dateFormatTo) data.endDate = dateFormatTo

		const eventId = id
		const settingsInfoFormData = new FormData()

		settingsInfoFormData.append('id', eventId)
		settingsInfoFormData.append('use_reg', booleanToNumberString(data.use_reg))
		settingsInfoFormData.append('startDate', data.startDate)
		settingsInfoFormData.append('startTime', timeFormatFrom)
		settingsInfoFormData.append('endDate', data.endDate)
		settingsInfoFormData.append('endTime', timeFormatTo)
		settingsInfoFormData.append('guestsLimit', data.guestsLimit ?? '0')
		settingsInfoFormData.append('use_repeat_reg', booleanToNumberString(data.use_repeat_reg))
		settingsInfoFormData.append('repeatCount', data.repeatCount ?? '0')
		settingsInfoFormData.append('rejectEmail', booleanToNumberString(data.rejectEmail))
		settingsInfoFormData.append('rejectPhone', booleanToNumberString(data.rejectPhone))
		settingsInfoFormData.append('use_group_ticket', booleanToNumberString(data.use_group_ticket))
		settingsInfoFormData.append('use_follow', booleanToNumberString(data.use_follow))
		settingsInfoFormData.append(
			'regFields.surname.active',
			booleanToNumberString(data.regFields.surname.active),
		)
		settingsInfoFormData.append(
			'regFields.surname.req',
			booleanToNumberString(data.regFields.surname.req),
		)
		settingsInfoFormData.append(
			'regFields.name.active',
			booleanToNumberString(data.regFields.name.active),
		)
		settingsInfoFormData.append(
			'regFields.name.req',
			booleanToNumberString(data.regFields.name.req),
		)
		settingsInfoFormData.append(
			'regFields.patronymic.active',
			booleanToNumberString(data.regFields.patronymic.active),
		)
		settingsInfoFormData.append(
			'regFields.patronymic.req',
			booleanToNumberString(data.regFields.patronymic.req),
		)
		settingsInfoFormData.append(
			'regFields.birthday.active',
			booleanToNumberString(data.regFields.birthday.active),
		)
		settingsInfoFormData.append(
			'regFields.birthday.req',
			booleanToNumberString(data.regFields.birthday.req),
		)
		settingsInfoFormData.append(
			'regFields.region.active',
			booleanToNumberString(data.regFields.region.active),
		)
		settingsInfoFormData.append(
			'regFields.region.req',
			booleanToNumberString(data.regFields.region.req),
		)
		settingsInfoFormData.append(
			'regFields.phone.active',
			booleanToNumberString(data.regFields.phone.active),
		)
		settingsInfoFormData.append(
			'regFields.phone.req',
			booleanToNumberString(data.regFields.phone.req),
		)
		settingsInfoFormData.append(
			'regFields.phone.use_sms',
			booleanToNumberString(data.regFields.phone.use_sms),
		)
		settingsInfoFormData.append(
			'regFields.email.active',
			booleanToNumberString(data.regFields.email.active),
		)
		settingsInfoFormData.append(
			'regFields.email.req',
			booleanToNumberString(data.regFields.email.req),
		)
		settingsInfoFormData.append(
			'regFields.email.use_email',
			booleanToNumberString(data.regFields.email.use_email),
		)
		const res = await saveSettingsReg(settingsInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminEventsList}`)
			}
		}
	}

	useEffect(() => {
		if (regData) {
			let initialTimeEventStart: Date | undefined
			let initialTimeEventEnd: Date | undefined
			let initialDateEventStart: string | undefined
			let initialDateEventEnd: string | undefined
			if (regData.startDate === '0000-00-00') initialDateEventStart = currentDateString()
			if (regData.endDate === '0000-00-00') initialDateEventEnd = currentDateString()
			if (
				regData.startDate &&
				regData.startTime &&
				regData.startDate !== '0000-00-00' &&
				regData.endDate !== '0000-00-00'
			) {
				const initialTimeEventStartValue = parse(
					`${format(new Date(regData.startDate), 'yyyy-MM-dd')} ${regData.startTime}`,
					'yyyy-MM-dd HH:mm:ss',
					new Date(),
				)
				initialTimeEventStart = initialTimeEventStartValue
			}
			if (
				regData.startDate &&
				regData.startTime &&
				regData.startDate !== '0000-00-00' &&
				regData.endDate !== '0000-00-00'
			) {
				const initialTimeEventEndValue = parse(
					`${format(new Date(regData.endDate ?? new Date()), 'yyyy-MM-dd')} ${regData.endTime}`,
					'yyyy-MM-dd HH:mm:ss',
					new Date(),
				)

				initialTimeEventEnd = initialTimeEventEndValue
			}

			const transformedData = {
				...regData,
				startDate: regData.startDate === '0000-00-00' ? initialDateEventStart : regData.startDate,
				endDate: regData.endDate === '0000-00-00' ? initialDateEventEnd : regData.endDate,
				startTime: initialTimeEventStart ?? undefined,
				endTime: initialTimeEventEnd ?? undefined,
			}

			methods.reset({ ...transformedData })
		}
	}, [regData])

	return (
		<AdminContent className={styles.paymentPage} $backgroundColor='#fff' $padding='0 35px 30px'>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					<RegistationSettingsSection />
					<CommonSettingsSection />
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
