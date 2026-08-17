/* eslint-disable @typescript-eslint/naming-convention */
import { type OneInfoItemInputs, oneInfoItemSchema } from './schema'
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
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import {
	useGetPageInfoInfoQuery,
	useSavePageInfoInfoMutation,
} from 'src/store/marketing/marketing.api'

export const OneInfoItem = () => {
	const { id = '0' } = useParams()

	const { data } = useGetPageInfoInfoQuery(id)
	const [savePageInfoInfo] = useSavePageInfoInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneInfoItemInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneInfoItemSchema),
		defaultValues: {
			hidden: false,
		},
	})
	const navigate = useNavigate()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneInfoItemInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', data.id ?? '')
		formData.append('page_name', data.page_name)
		formData.append('page_text', data.page_text ?? '')
		formData.append(
			'parents',
			typeof data.parents === 'string' ? data.parents : data.parents ? data.parents[0].value : '0',
		)
		const res = await savePageInfoInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingInfo}`)
			}
		}
	}

	useEffect(() => {
		if (data) {
			const parentsOptions = data.parents ?? []
			const parentOption = parentsOptions.find((el) => Number(el.value) === Number(data.parents_id))
			const { parents_id, parents, ...restData } = data

			methods.reset({
				parents: parentOption ? [parentOption] : [],
				...restData,
			})
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingInfo}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку информационных страниц
			</Link>
			<h4 className={styles.titleNewsForm}>Страница: </h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection pageOption={data?.parents} />
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Marketing}/${AdminRoute.MarketingInfo}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingInfo}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку информационных страниц
			</Link>
		</>
	)
}
