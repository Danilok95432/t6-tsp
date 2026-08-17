import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import { useGetAwardInfoQuery, useSaveAwardInfoMutation } from 'src/store/marketing/marketing.api'
import { RewardSection } from '../reward-section/reward-section'
import { rewardItemsSchema, type RewardItemInputs } from './schema'

export const RewardOneItem = () => {
	const { id = '' } = useParams()
	const { data } = useGetAwardInfoQuery(id)
	const [saveRewardInfo] = useSaveAwardInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<RewardItemInputs>({
		mode: 'onBlur',
		resolver: yupResolver(rewardItemsSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<RewardItemInputs> = async (data) => {
		const formData = new FormData()
		formData.append(`id`, id ?? '')
		formData.append(`title`, data.title ?? '')
		formData.append(`itemname`, data.itemname ?? '')
		formData.append(`itemdesc`, data.itemdesc ?? '')
		formData.append(`colors_list_id`, String(data.colors_list?.[0]?.value ?? ''))
		const res = await saveRewardInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`)
			}
		}
	}

	useEffect(() => {
		if (!data) return

		const colorsOptions = data.colors_list ?? []

		methods.reset({
			title: data.title,
			itemname: data.itemname,
			itemdesc: data.itemdesc,
			colors_list: [
				colorsOptions.find((el) => String(el.value) === String(data.colors_list_id)),
			].filter(Boolean),
		})
	}, [data, methods])

	return (
		<>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку наград
			</Link>
			<h4 className={styles.titleNewsForm}></h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<RewardSection colorOptions={data?.colors_list} />
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку наград
			</Link>
		</>
	)
}
