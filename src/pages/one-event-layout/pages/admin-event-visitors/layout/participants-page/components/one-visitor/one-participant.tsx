import { type OneVisitorInputs, oneVisitorSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { booleanToNumberString } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainSection } from './components/main-section/main-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { RegionSection } from './components/region-section/region-section'
import { DatesSection } from './components/dates-section/dates-section'
import { VisitSection } from './components/visit-section/visit-section'
import { PartSection } from './components/part-section/part-section'
import {
	useGetCityByRegionQuery,
	useGetInfoRegistationQuery,
	useGetRegionsByValueQuery,
	useSendRegistrationFormMutation,
} from 'src/store/auth/auth.api'

import styles from './index.module.scss'
import { toast } from 'react-toastify'

export const OneParticipant = () => {
	const { id = '0' } = useParams()

	const [saveRegForm] = useSendRegistrationFormMutation()
	const [, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const [lockSearch, setLockSearch] = useState<boolean>(false)
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [errorForm, setErrorForm] = useState<string>('')
	const { data: selectOptions } = useGetInfoRegistationQuery('1')
	const { data: regions } = useGetRegionsByValueQuery('')

	const methods = useForm<OneVisitorInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneVisitorSchema),
	})
	const { isSent } = useIsSent(methods.control)

	const regionValue = useWatch({
		control: methods.control,
		name: 'id_region',
	})

	const cityValue =
		useWatch({
			control: methods.control,
			name: 'id_city',
		}) || ''

	const regionId = regions?.regions?.find((reg) => reg.label === regionValue)?.value

	const { data: citys } = useGetCityByRegionQuery(
		{
			region: regionId ?? '',
			city: cityValue,
		},
		{
			skip: !regionId || cityValue.length <= 2 || lockSearch,
		},
	)

	const onSubmit: SubmitHandler<OneVisitorInputs> = async (data) => {
		const region = regions?.regions?.filter((reg) => reg.label === data.id_region)[0].value
		const city = citys?.citys?.filter((nas) => nas.label === data.id_city)[0].value
		let selectedObjSubEvents = ''

		if (data.use_group && typeof data.sub_events_group === 'string') {
			selectedObjSubEvents = data.sub_events_group
		} else {
			const etno = typeof data.sub_events_etno === 'string' ? data.sub_events_etno.split(',') : []
			const fun = Array.isArray(data.sub_events_fun)
				? data.sub_events_fun.filter(Boolean)
				: typeof data.sub_events_fun === 'string'
					? data.sub_events_fun.split(',')
					: []

			selectedObjSubEvents = [...etno, ...fun].join(',')
		}
		const formData = new FormData()
		formData.append('id_reg_type', '1')
		formData.append('id_event', id)
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname ?? '')
		formData.append('birthdate', data.birthdate ?? '')
		formData.append('id_region', region ?? '')
		formData.append('id_city', city ?? '')
		formData.append('phone', data.phone)

		// Групповые данные
		formData.append('use_group', booleanToNumberString(data.use_group))
		formData.append('group_name', data.group_name ?? '')
		formData.append('id_event_role', data.id_event_role ?? '')

		// Данные лагеря
		formData.append('use_lager', booleanToNumberString(data.use_lager))
		formData.append('id_lager_type', data.id_lager_type ?? '')
		formData.append('lager_count', data.lager_count?.toString() ?? '0')
		formData.append('data_zaezd', data.data_zaezd ?? '')
		formData.append('data_viezd', data.data_viezd ?? '')

		// Данные спортсменов и активности
		formData.append('use_sportsmen', booleanToNumberString(data.use_sportsmen))

		// Специальные категории
		formData.append('use_folk', booleanToNumberString(data.use_folk))
		formData.append('use_trader', booleanToNumberString(data.use_trader))
		formData.append(
			'trader_name',
			data.use_group ? (data.trader_name_group ?? '') : (data.trader_name ?? ''),
		)
		formData.append('use_master', booleanToNumberString(data.use_master))
		formData.append('use_org', booleanToNumberString(data.use_org))
		formData.append('use_volunteer', booleanToNumberString(data.use_volunteer))
		formData.append(
			'master_name',
			data.use_group ? (data.master_name_group ?? '') : (data.master_name ?? ''),
		)
		formData.append('use_journalist', booleanToNumberString(data.use_journalist))
		formData.append(
			'journal_name',
			data.use_group ? (data.journal_name_group ?? '') : (data.journal_name ?? ''),
		)

		formData.append('sub_events_list', selectedObjSubEvents)

		// Данные транспорта
		formData.append('use_car', booleanToNumberString(data.use_car))
		formData.append('id_car_type', data.id_car_type ?? '')
		formData.append('car_number', data.car_number ?? '')
		try {
			if (isCodeAccepted) {
				if (city === '' || city === undefined) {
					formData.append('city_name', data.id_city)
				}
				const res = (await saveRegForm(formData)) as unknown as {
					data: { status: string; errortext: string }
				}
				if (res.data.status === 'ok') {
					toast.success('Регистрация прошла успешно!', {
						position: 'bottom-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					navigate(
						`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Participants}`,
					)
				} else {
					toast.error('Произошла ошибка при регистрации', {
						position: 'bottom-right',
					})
					setErrorForm(res.data.errortext)
				}
			}
		} catch (error) {
			console.error('Unexpected error:', error)
		}
	}

	return (
		<>
			<Container $padding='0px 30px 35px 30px' className={styles.oneParticipantPage}>
				<h1 className={styles.titleForm}>Добавить участника</h1>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection
							setIsCodeAccepted={setIsCodeAccepted}
							isCodeAccepted={isCodeAccepted}
							errorForm={errorForm}
							setErrorForm={setErrorForm}
						/>
						<RegionSection
							regions={regions?.regions}
							citys={citys?.citys}
							setLockSearch={setLockSearch}
							lockSearch={lockSearch}
						/>
						<PartSection subEvents={selectOptions?.sub_events} />
						<VisitSection
							selectOptionsCars={selectOptions?.car_types}
							selectOptionsLager={selectOptions?.lager_types}
						/>
						<DatesSection selectOptions={selectOptions?.dates} />
						<FlexRow $margin='0 0 40px 0' $maxWidth='1140px'>
							<AdminButton as='button' type='submit' onClick={() => setAction('save')}>
								Сохранить и выйти
							</AdminButton>
							<AdminButton
								as='button'
								type='submit'
								$variant={isSent ? 'sent' : 'light'}
								onClick={() => setAction('apply')}
							>
								Применить и продолжить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</>
	)
}
