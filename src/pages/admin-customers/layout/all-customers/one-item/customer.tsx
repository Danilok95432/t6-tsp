/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import { type OneCustomerInputs, oneCustomerSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

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
	useGetCustomerInfoQuery,
	useSaveCustomerInfoMutation,
} from 'src/store/customers/customers.api'
import { type UserCartOrders } from 'src/types/customers'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { booleanToNumberString } from 'src/helpers/utils'

export const OneCustomer = () => {
	const { id = '0' } = useParams()

	const { data } = useGetCustomerInfoQuery(id)
	const [saveCustomerInfo] = useSaveCustomerInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneCustomerInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneCustomerSchema),
		defaultValues: {
			hidden: false,
			vip: false,
		},
	})
	const navigate = useNavigate()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneCustomerInputs> = async (data) => {
		console.log(data)
		const formData = new FormData()
		formData.append('id', id)
		formData.append('surname', data.surname ?? '')
		formData.append('firstname', data.firstname ?? '')
		formData.append('fathname', data.fathname ?? '')
		formData.append(
			'user_types',
			typeof data.user_types === 'string'
				? data.user_types
				: data.user_types
					? data.user_types[0].value
					: '0',
		)
		// formData.append(
		// 	'citys',
		// 	typeof data.citys === 'string' ? data.citys : data.citys ? data.citys[0].value : '0',
		// )
		formData.append('user_title', data.user_title ?? '')
		formData.append('telphone', data.telphone ?? '')
		formData.append('email', data.email ?? '')
		formData.append('user_name', data.user_name ?? '')
		// formData.append('street', data.street ?? '')
		// formData.append('dom', data.dom ?? '')
		// formData.append('room', data.room ?? '')
		formData.append('user_comment', data.user_comment ?? '')
		formData.append('review_text', data.review_text ?? '')
		formData.append('user_pass', data.user_pass ?? '')
		formData.append('user_pass2', data.user_pass2 ?? '')

		formData.append('hidden', booleanToNumberString(data.hidden))
		formData.append('use_spam', booleanToNumberString(data.use_spam))
		formData.append('vip', booleanToNumberString(data.vip))
		formData.append('review_on_main', booleanToNumberString(data.review_on_main))
		const res = await saveCustomerInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Customers}/${AdminRoute.AllCustomers}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			// const cityOptions = data.citys ?? []
			const userOptions = data.user_types ?? []

			// Находим нужные объекты для селектов
			// const cityOption = cityOptions.find((el) => Number(el.value) === Number(data.citys_id))
			const userOption = userOptions.find((el) => Number(el.value) === Number(data.user_types_id))
			// Исключаем не только brands_id/catalogs_id, но и brands/catalogs/login из restData
			const { citys_id, user_types_id, citys, user_types, user_name, ...restData } = data

			methods.reset({
				// Поля для React Select
				// citys: cityOption ? [cityOption] : [],
				user_types: userOption ? [userOption] : [],
				user_name: data.user_name ?? data.email,
				// Все остальные поля (без brands/catalogs/brands_id/catalogs_id)
				...restData,
			})
		}
	}, [data])

	const tableTitles = [
		'ID',
		'Дата заказа',
		'Статус заказа',
		'Состав',
		'Количество товаров',
		'Сумма',
	]
	const formatObjectsTableData = (ordersData: UserCartOrders[]) => {
		return ordersData.map((orderEl) => {
			return {
				rowId: orderEl.id,
				cells: [
					<p key='0'>{orderEl.id}</p>,
					<p key='1'>{orderEl.order_date}</p>,
					<p key='2'>{orderEl.order_status_name}</p>,
					<p key='3'>{orderEl.sostav}</p>,
					<p key='4'>{orderEl.count_items}</p>,
					<p key='5'>{orderEl.order_summ}</p>,
				],
			}
		})
	}

	return (
		<>
			<Link
				to={`/${AdminRoute.Customers}/${AdminRoute.AllCustomers}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку покупателей
			</Link>
			<h4 className={styles.titleNewsForm}>Пользователь</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate className={styles.form}>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection cityOption={data?.citys} customerOption={data?.user_types} />
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
								<SwitchedRadioBtns
									name='vip'
									label='Вип-персона'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='review_on_main'
									label='Отзыв на главной'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
							</div>
						</div>
						<CustomTable
							className={styles.ordersTable}
							rowData={formatObjectsTableData(data?.orders ?? [])}
							colTitles={tableTitles}
						/>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Customers}/${AdminRoute.AllCustomers}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Customers}/${AdminRoute.AllCustomers}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку покупателей
			</Link>
		</>
	)
}
