import { type OneVisitorInputs, oneVisitorSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'

import { MainSection } from './components/main-section/main-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { RegionSection } from './components/region-section/region-section'
import {
	useGetCityByRegionQuery,
	useGetInfoRegistationQuery,
	useGetRegionsByValueQuery,
	useSendRegistrationGuestFormMutation,
} from 'src/store/auth/auth.api'
import { VisitSection } from './components/visit-section/visit-section'
import { DatesSection } from './components/dates-section/dates-section'
import { booleanToNumberString } from 'src/helpers/utils'
import { toast } from 'react-toastify'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const OneVisitor = () => {
	const { id = '0' } = useParams()

	const [sendRegForm] = useSendRegistrationGuestFormMutation()
	const [isCodeAccepted, setIsCodeAccepted] = useState(false)
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const { data: selectOptions } = useGetInfoRegistationQuery('1')
	const { data: regions } = useGetRegionsByValueQuery(' ')
	const [lockSearch, setLockSearch] = useState<boolean>(false)
	const [errorForm, setErrorForm] = useState<string>('')

	const navigate = useNavigate()

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
		const region = regions?.regions.filter((reg) => reg.label === data.id_region)[0].value
		const city = citys?.citys?.filter((nas) => nas.label === data.id_city)[0].value
		const formData = new FormData()
		formData.append('id_reg_type', '1')
		formData.append('id_event', id)
		formData.append('surname', data.surname)
		formData.append('firstname', data.firstname)
		formData.append('fathname', data.fathname ?? '')
		formData.append('age', data.age)
		formData.append('id_region', region ?? '')
		formData.append('id_city', city ?? '')
		formData.append('phone', data.phone)
		formData.append('use_car', booleanToNumberString(data.use_car))
		if (data.use_car) {
			formData.append('cars_count', data.cars_count ?? '')
			data.cars_list?.forEach((car, index) => {
				formData.append(`cars_list_car_type[${index}]`, car.car_type)
				formData.append(`cars_list_car_number[${index}]`, car.car_number)
			})
		}
		formData.append('use_lager', booleanToNumberString(data.use_lager))
		if (data.use_lager) {
			formData.append('id_lager_type', data.id_lager_type ?? '')
			formData.append('lager_count', data.lager_count ?? '')
		}
		formData.append('data_zaezd', data.data_zaezd ?? '')
		formData.append('data_viezd', data.data_viezd ?? '')
		if (city === '' || city === undefined) {
			formData.append('city_name', data.id_city)
		}

		try {
			if (isCodeAccepted) {
				const res = (await sendRegForm(formData)) as unknown as {
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
						`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Guests}`,
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
			<Container $padding='0px 30px 35px 30px' className={styles.oneGuestPage}>
				<h1 className={styles.titleForm}>Добавить гостя</h1>
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
						<VisitSection
							selectOptionsLager={selectOptions?.lager_types}
							selectOptionsCars={selectOptions?.car_types}
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
