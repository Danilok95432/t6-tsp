/* eslint-disable @typescript-eslint/naming-convention */
import { type OneOrderInputs } from './schema'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { SwitchedHiddenSvg } from 'src/UI/icons/switchedHiddenSVG'
import { SwitchedShowSvg } from 'src/UI/icons/switchedShowSVG'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import { MainSection } from './components/main-section/main-section'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import {
	useGetOrderInfoQuery,
	useGetSearchCityQuery,
	useSaveOrderInfoMutation,
} from 'src/store/trading/trading.api'
import { type GoodsCart } from 'src/types/trading'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { booleanToNumberString } from 'src/helpers/utils'

type SelectOptionLike = {
	label?: string
	value?: string
}

type SelectFieldValue = string | SelectOptionLike[] | undefined

const getSelectValue = (value: SelectFieldValue) => {
	if (Array.isArray(value)) {
		return value[0]?.value ?? ''
	}

	return value ?? ''
}

export const OneOrder = () => {
	const { id = '0' } = useParams()

	const { data } = useGetOrderInfoQuery(id)
	const { data: selectedCityData } = useGetSearchCityQuery(
		{
			search: data?.city_name ?? '',
			id: data?.citys_id ?? '',
		},
		{
			skip: !data?.citys_id || !data?.city_name,
		},
	)

	const selectedCityOption = selectedCityData?.citys?.find(
		(el) => Number(el.value) === Number(data?.citys_id),
	)
	const [saveOrderInfo] = useSaveOrderInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneOrderInputs>({
		mode: 'onBlur',
	})
	const values = useWatch({
		control: methods.control,
	})
	const cityValue = getSelectValue(values.citys ?? [])
	const navigate = useNavigate()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneOrderInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('delivery_address', data.delivery_address ?? '')
		formData.append('delivery_time', data.delivery_time ?? '')
		formData.append(
			'id_order_delivery',
			typeof data.order_delivery === 'string'
				? data.order_delivery
				: data.order_delivery
					? data.order_delivery[0].value
					: '0',
		)
		formData.append(
			'id_order_status',
			typeof data.order_status === 'string'
				? data.order_status
				: data.order_status
					? data.order_status[0].value
					: '0',
		)
		formData.append(
			'id_sdek_point',
			typeof data.sdek_point === 'string'
				? data.sdek_point
				: data.sdek_point
					? data.sdek_point[0].value
					: '0',
		)
		formData.append(
			'siteusers',
			typeof data.siteusers === 'string'
				? data.siteusers
				: data.siteusers
					? data.siteusers[0].value
					: '0',
		)
		formData.append('id_city', cityValue)
		formData.append('order_date', data.order_date ?? '')
		formData.append('price_delivery', data.price_delivery ?? '')
		formData.append('price_items', data.price_items ?? '')
		formData.append('price_total', data.price_total ?? '')
		formData.append('order_telphone', data.order_telphone ?? '')
		formData.append('order_street', data.order_street ?? '')
		formData.append('order_surname', data.order_surname ?? '')
		formData.append('order_user_title', data.order_user_title ?? '')
		formData.append('order_house', data.order_house ?? '')
		formData.append('order_secondname', data.order_secondname ?? '')
		formData.append('order_dom', data.order_dom ?? '')
		formData.append('order_email', data.order_email ?? '')
		formData.append('order_firstname', data.order_firstname ?? '')
		formData.append('order_address', data.order_address ?? '')

		formData.append('hidden', booleanToNumberString(data.hidden))
		const res = await saveOrderInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Trading}/${AdminRoute.TradingOrder}`)
			}
		}
	}

	useEffect(() => {
		if (!data) return

		const hasSavedCity = Boolean(data.citys_id && data.city_name)

		if (hasSavedCity && !selectedCityOption) return

		const deliverOptions = data.order_delivery ?? []
		const statusOptions = data.order_status ?? []
		const sdekOptions = data.sdek_point ?? []
		const siteusersOptions = data.siteusers ?? []

		const deliveryOption = deliverOptions.find(
			(el) => Number(el.value) === Number(data.order_delivery_id),
		)
		const statusOption = statusOptions.find(
			(el) => Number(el.value) === Number(data.order_status_id),
		)
		const sdekOption = sdekOptions.find((el) => Number(el.value) === Number(data.sdek_point_id))
		const siteuserOption = siteusersOptions.find(
			(el) => Number(el.value) === Number(data.siteusers_id),
		)

		const {
			order_delivery_id,
			order_status_id,
			sdek_point_id,
			order_delivery,
			order_status,
			sdek_point,
			citys,
			citys_id,
			city_name,
			siteusers,
			siteusers_id,
			...restData
		} = data

		methods.reset({
			order_delivery: deliveryOption ? [deliveryOption] : [],
			order_status: statusOption ? [statusOption] : [],
			sdek_point: sdekOption ? [sdekOption] : [],
			citys: selectedCityOption ? [selectedCityOption] : [],
			siteusers: siteuserOption ? [siteuserOption] : [],
			...restData,
		})
	}, [data, selectedCityOption])
	const tableTitles = [
		'№',
		'Категория',
		'Производитель',
		'Название товара',
		'Цена товара',
		'Количество',
		'Сумма',
	]
	const formatObjectsTableData = (ordersData: GoodsCart[]) => {
		return ordersData.map((orderEl) => {
			return {
				rowId: orderEl.id,
				cells: [
					<p key='0'>{orderEl.id}</p>,
					<p key='1'>{orderEl.category}</p>,
					<p key='2'>{orderEl.brand}</p>,
					<p key='3'>{orderEl.title}</p>,
					<p key='4'>{orderEl.price_item}</p>,
					<p key='5'>
						{orderEl.use_weight ? `${orderEl.item_weight} гр.` : `${orderEl.item_count} шт.`}
					</p>,
					<p key='6'>{orderEl.price_total}</p>,
				],
			}
		})
	}

	return (
		<>
			<Link
				to={`/${AdminRoute.Trading}/${AdminRoute.TradingOrder}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку заказов
			</Link>
			<h4 className={styles.titleNewsForm}>Заказ</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection
									deliverOption={data?.order_delivery}
									statusOption={data?.order_status}
									sdekOption={data?.sdek_point}
									cityOption={data?.citys}
									usersOption={data?.siteusers}
								/>
								<CustomTable
									className={styles.ordersTable}
									rowData={formatObjectsTableData(data?.order_items ?? [])}
									colTitles={tableTitles}
								/>
							</div>
							<div className={styles.oneNewsContentRight}>
								<SwitchedRadioBtns
									name='hidden'
									label='Спрятать'
									$variant='switcher'
									contentRadio1={
										<>
											<SwitchedHiddenSvg />
											Спрятать
										</>
									}
									contentRadio2={
										<>
											<SwitchedShowSvg />
											Показать
										</>
									}
								/>
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Trading}/${AdminRoute.TradingOrder}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Trading}/${AdminRoute.TradingOrder}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку заказов
			</Link>
		</>
	)
}
