import { type OneSolCategoryInputs, oneSolCategorySchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import { MainSection } from './components/main-section/main-section'
import { SeoSection } from 'src/modules/seo-section/seo-section'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import {
	useGetSolLevelInfoQuery,
	useSaveSolLevelInfoMutation,
} from 'src/store/solutions/solutions.api'
import { MediaSection } from './components/media-section/media-section'

export const OneSolLevel = () => {
	const { id = '0' } = useParams()

	const { data } = useGetSolLevelInfoQuery(id)
	const [saveCategoryInfo] = useSaveSolLevelInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OneSolCategoryInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneSolCategorySchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneSolCategoryInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id)
		formData.append('title', data.title)
		formData.append('short', data.short ?? '')
		formData.append('full', data.full ?? '')
		formData.append('seo_title', data.seo_title ?? '')
		formData.append('seo_description', data.seo_description ?? '')
		formData.append('seo_keywords', data.seo_keywords ?? '')
		formData.append('seo_virtual', data.seo_virtual ?? '')
		const res = await saveCategoryInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Solutions}/${AdminRoute.SolutionsLevels}`)
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
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsLevels}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
			<h4 className={styles.titleNewsForm}>Уровень: {data?.title}</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection />
								<MediaSection />
								<SeoSection />
							</div>
							{/* <div className={styles.oneNewsContentRight}>
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
							</div> */}
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsLevels}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Solutions}/${AdminRoute.SolutionsLevels}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку
			</Link>
		</>
	)
}
