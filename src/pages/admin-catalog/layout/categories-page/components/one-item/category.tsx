import { type OneCategoryInputs, oneCategorySchema } from './schema'
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
import { useGetCategoryInfoQuery, useSaveCategoryInfoMutation } from 'src/store/catalog/catalog.api'
import { MainSection } from './components/main-section/main-section'
import { SeoSection } from 'src/modules/seo-section/seo-section'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import { booleanToNumberString } from 'src/helpers/utils'

export const OneCategory = () => {
	const { id = '0' } = useParams()

	const { data } = useGetCategoryInfoQuery(id)
	const [saveCategoryInfo] = useSaveCategoryInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OneCategoryInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneCategorySchema),
		defaultValues: {
			hidden: false,
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneCategoryInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('title', data.title)
		formData.append('main_button', data.main_button ?? '')
		formData.append('short', data.short ?? '')
		formData.append('full', data.full ?? '')
		formData.append(
			'parent',
			typeof data.parent === 'string'
				? data.parent
				: data.parent && data.parent.length > 0
					? data.parent[0].value
					: '0',
		)
		formData.append('seo_title', data.seo_title ?? '')
		formData.append('seo_description', data.seo_description ?? '')
		formData.append('seo_keywords', data.seo_keywords ?? '')
		formData.append('seo_virtual', data.seo_virtual ?? '')
		formData.append('hidden', booleanToNumberString(data.hidden))
		formData.append('use_main', booleanToNumberString(data.use_main))
		const res = await saveCategoryInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Catalog}/${AdminRoute.CatalogCategories}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			methods.reset({ ...data })
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Catalog}/${AdminRoute.CatalogCategories}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
			<h4 className={styles.titleNewsForm}>Категория: {data?.title}</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection img={data?.img} imgInside={data?.img_inside} />
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
									name='use_main'
									label='Показать на главной'
									$variant='switcher'
									contentRadio1={
										<>
											<SwitchedShowSvg />
											Показать
										</>
									}
									contentRadio2={
										<>
											<SwitchedHiddenSvg />
											Спрятать
										</>
									}
								/>
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Catalog}/${AdminRoute.CatalogCategories}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Catalog}/${AdminRoute.CatalogCategories}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
		</>
	)
}
