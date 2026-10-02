/* eslint-disable @typescript-eslint/naming-convention */
import { type OneSolutionInputs, oneSolutionSchema } from './schema'
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
import { SeoSection } from 'src/modules/seo-section/seo-section'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import { booleanToNumberString } from 'src/helpers/utils'
import {
	useGetSolutionInfoQuery,
	useSaveSolutionInfoMutation,
} from 'src/store/solutions/solutions.api'
import { MediaSection } from './components/media-section/media-section'
import { ReqSection } from './components/req-section/req-section'

export const OneSolution = () => {
	const { id = '0' } = useParams()

	const { data } = useGetSolutionInfoQuery(id)
	const [saveCategoryInfo] = useSaveSolutionInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OneSolutionInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneSolutionSchema),
		defaultValues: {
			hidden: false,
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneSolutionInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('title', data.title)
		formData.append('code', data.code)
		formData.append('short', data.short ?? '')
		formData.append('full', data.full ?? '')
		formData.append('price1', data.price1 ?? '')
		formData.append('price2', data.price2 ?? '')
		formData.append('price3', data.price3 ?? '')
		formData.append(
			'level',
			typeof data.level === 'string'
				? data.level
				: data.level && data.level.length > 0
					? data.level[0].value
					: '0',
		)
		formData.append(
			'category',
			typeof data.category === 'string'
				? data.category
				: data.category && data.category.length > 0
					? data.category[0].value
					: '0',
		)
		formData.append(
			'part',
			typeof data.part === 'string'
				? data.part
				: data.part && data.part.length > 0
					? data.part[0].value
					: '0',
		)
		formData.append('seo_title', data.seo_title ?? '')
		formData.append('seo_description', data.seo_description ?? '')
		formData.append('seo_keywords', data.seo_keywords ?? '')
		formData.append('seo_virtual', data.seo_virtual ?? '')
		formData.append('hidden', booleanToNumberString(data.hidden))
		formData.append('use_best', booleanToNumberString(data.use_best))
		formData.append('use_rec', booleanToNumberString(data.use_rec))
		formData.append('use_stop', booleanToNumberString(data.use_stop))
		const res = await saveCategoryInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Solutions}/${AdminRoute.SolutionsInfo}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			const partOptions = data.part ?? []
			const categoriesOptions = data.category ?? []
			const levelOptions = data.level ?? []

			// Находим нужные объекты для селектов
			const partOption = partOptions.find((el) => Number(el.value) === Number(data.part_id))
			const categoriesOption = categoriesOptions.find(
				(el) => Number(el.value) === Number(data.category_id),
			)
			const levelOption = levelOptions.find((el) => Number(el.value) === Number(data.level_id))
			// Исключаем не только brands_id/catalogs_id, но и brands/catalogs из restData
			const { part_id, category_id, level_id, level, category, part, ...restData } = data

			methods.reset({
				// Поля для React Select
				part: partOption ? [partOption] : [],
				category: categoriesOption ? [categoriesOption] : [],
				level: levelOption ? [levelOption] : [],
				// Все остальные поля (без brands/catalogs/brands_id/catalogs_id)
				...restData,
			})
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsInfo}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
			<h4 className={styles.titleNewsForm}>Решение: {data?.title}</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection
									categoryOption={data?.category}
									levelsOption={data?.level}
									solutionOption={data?.part}
								/>
								<ReqSection toolsOptions={data?.tools} />
								{/* <AdditionalSection /> */}
								<MediaSection img={data?.img} documents={data?.documents} />
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
									name='use_best'
									label='Хит'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='use_rec'
									label='Рекомендовать'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
								<SwitchedRadioBtns
									name='use_stop'
									label='Продажи на стоп'
									$variant='switcher'
									contentRadio1={<>Да</>}
									contentRadio2={<>Нет</>}
								/>
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsInfo}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsInfo}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
		</>
	)
}
