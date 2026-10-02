/* eslint-disable @typescript-eslint/naming-convention */
import { type OneSolProjectInputs, oneSolProjectSchema } from './schema'
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
	useGetSolProjectInfoQuery,
	useSaveSolProjectInfoMutation,
} from 'src/store/solutions/solutions.api'
import { ReqSection } from './components/req-section/req-section'
import { MediaSection } from './components/media-section/media-section'

export const OneSolProject = () => {
	const { id = '0' } = useParams()

	const { data } = useGetSolProjectInfoQuery(id)
	const [saveCategoryInfo] = useSaveSolProjectInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OneSolProjectInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneSolProjectSchema),
		defaultValues: {
			hidden: false,
		},
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneSolProjectInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('title', data.title)
		formData.append('short', data.short ?? '')
		formData.append('full', data.full ?? '')
		formData.append('finalPrice', data.finalPrice)
		formData.append('customer', data.customer)
		formData.append(
			'solution',
			typeof data.solution === 'string'
				? data.solution
				: data.solution && data.solution.length > 0
					? data.solution[0].value
					: '0',
		)
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
		const res = await saveCategoryInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Solutions}/${AdminRoute.SolutionsProjects}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			const partOptions = data.part ?? []
			const categoriesOptions = data.category ?? []
			const levelOptions = data.level ?? []
			const solutionOptions = data.solution ?? []

			// Находим нужные объекты для селектов
			const partOption = partOptions.find((el) => Number(el.value) === Number(data.part_id))
			const categoriesOption = categoriesOptions.find(
				(el) => Number(el.value) === Number(data.category_id),
			)
			const levelOption = levelOptions.find((el) => Number(el.value) === Number(data.level_id))
			const solutionOption = solutionOptions.find(
				(el) => Number(el.value) === Number(data.solution_id),
			)
			// Исключаем не только brands_id/catalogs_id, но и brands/catalogs из restData
			const {
				solution_id,
				part_id,
				category_id,
				level_id,
				level,
				solution,
				category,
				part,
				...restData
			} = data

			methods.reset({
				// Поля для React Select
				part: partOption ? [partOption] : [],
				category: categoriesOption ? [categoriesOption] : [],
				level: levelOption ? [levelOption] : [],
				solution: solutionOption ? [solutionOption] : [],
				// Все остальные поля (без brands/catalogs/brands_id/catalogs_id)
				...restData,
			})
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsProjects}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
			<h4 className={styles.titleNewsForm}>Проект: {data?.title}</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection />
								<ReqSection />
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
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsProjects}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsProjects}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
		</>
	)
}
