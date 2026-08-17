/* eslint-disable @typescript-eslint/naming-convention */
import { type OneGoodsInputs, oneGoodsSchema } from './schema'
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
import { useGetGoodsInfoQuery, useSaveGoodsInfoMutation } from 'src/store/catalog/catalog.api'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import { MainSection } from './components/main-section/main-section'
import { ReqSection } from './components/req-section/req-section'
import { AdditionalSection } from './components/additional-section/additional-section'
import { MediaSection } from './components/media-section/media-section'
import { SeoSection } from 'src/modules/seo-section/seo-section'
import { booleanToNumberString } from 'src/helpers/utils'

export const OneGoods = () => {
	const { id = '0' } = useParams()

	const { data } = useGetGoodsInfoQuery(id)
	const [saveGoodsInfo] = useSaveGoodsInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneGoodsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneGoodsSchema),
		defaultValues: {
			hidden: false,
			use_mainslider: false,
			use_best: false,
			use_old: false,
			use_weight: false,
			item_weight: '',
			weight_one: '',
			weight_price_kg: '',
			weight_default: '',
		},
	})
	const navigate = useNavigate()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneGoodsInputs> = async (data) => {
		const normalizePrice = data?.item_price?.replace(/\s/g, '')
		const normalizeDiscountPrice = data?.item_price_discount?.replace(/\s/g, '')
		const normalizeWeightPriceKg = data?.weight_price_kg?.replace(/\s/g, '')
		const formData = new FormData()
		let selectedObj = ''
		if (typeof data.types !== 'string' && data.types) {
			selectedObj = data.types
				.filter((opt) => opt.selected)
				.map((opt) => opt.value)
				.join(',')
		}
		formData.append('id', id)
		formData.append('title', data.title)
		formData.append('artikul', data.artikul)
		formData.append(
			'id_type',
			typeof data.types === 'string' ? data.types : data.types ? selectedObj : '0',
		)
		formData.append(
			'id_content',
			typeof data.catalogs === 'string'
				? data.catalogs
				: data.catalogs
					? data.catalogs[0].value
					: '0',
		)
		formData.append(
			'id_brand',
			typeof data.brands === 'string' ? data.brands : data.brands ? data.brands[0].value : '0',
		)
		formData.append('use_weight', booleanToNumberString(data.use_weight))
		if (data.use_weight) {
			formData.append('weight_one', data.weight_one ?? '')
			formData.append('weight_price_kg', normalizeWeightPriceKg ?? '')
			formData.append('weight_default', data.weight_default ?? '')
		} else formData.append('item_weight', data.item_weight ?? '')
		formData.append('item_width', data.item_width ?? '')
		formData.append('item_length', data.item_length ?? '')
		formData.append('item_height', data.item_height ?? '')
		formData.append('item_desc', data.item_desc ?? '')
		formData.append('package', data.package ?? '')
		formData.append('nal', data.nal ?? '')
		formData.append('item_price', normalizePrice ?? '')
		formData.append('item_price_discount', normalizeDiscountPrice ?? '')
		formData.append('short', data.short ?? '')
		formData.append('full', data.full ?? '')
		formData.append('hidden', booleanToNumberString(data.hidden))
		formData.append('use_mainslider', booleanToNumberString(data.use_mainslider))
		formData.append('use_best', booleanToNumberString(data.use_best))
		formData.append('use_old', booleanToNumberString(data.use_old))
		formData.append('use_new', booleanToNumberString(data.use_new))
		formData.append('use_theme', booleanToNumberString(data.use_theme))
		formData.append('seo_title', data.seo_title ?? '')
		formData.append('seo_description', data.seo_description ?? '')
		formData.append('seo_keywords', data.seo_keywords ?? '')
		formData.append('seo_virtual', data.seo_virtual ?? '')
		const res = await saveGoodsInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Catalog}/${AdminRoute.CatalogGoods}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			const brandsOptions = data.brands ?? []
			const catalogsOptions = data.catalogs ?? []

			// Находим нужные объекты для селектов
			const brandsOption = brandsOptions.find((el) => Number(el.value) === Number(data.brands_id))
			const catalogOption = catalogsOptions.find(
				(el) => Number(el.value) === Number(data.catalogs_id),
			)
			// Исключаем не только brands_id/catalogs_id, но и brands/catalogs из restData
			const { brands_id, catalogs_id, brands, catalogs, ...restData } = data

			methods.reset({
				// Поля для React Select
				brands: brandsOption ? [brandsOption] : [],
				catalogs: catalogOption ? [catalogOption] : [],
				// Все остальные поля (без brands/catalogs/brands_id/catalogs_id)
				...restData,
			})
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Catalog}/${AdminRoute.CatalogGoods}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
			<h4 className={styles.titleNewsForm}>Товар: </h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection
									sectionsOption={data?.catalogs}
									makersOption={data?.brands}
									typesOption={data?.types}
								/>
								<ReqSection />
								<AdditionalSection />
								<MediaSection
									img={data?.img}
									images={data?.images ? [...data.images].reverse() : []}
									documents={data?.documents}
									idItem={id}
								/>
								<SeoSection />
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
									name='use_mainslider'
									label='Главный слайдер'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='use_best'
									label='Хит'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='use_old'
									label='Снято с производства'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='use_new'
									label='Новинка'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								{/* <SwitchedRadioBtns
									name='use_theme'
									label='Тематическая серия'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/ */}
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Catalog}/${AdminRoute.CatalogGoods}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Catalog}/${AdminRoute.CatalogGoods}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
		</>
	)
}
