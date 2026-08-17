import { type AdItemInputs, adItemsSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import {
	useGetAdReklamaInfoQuery,
	useSaveAdReklamaInfoMutation,
} from 'src/store/marketing/marketing.api'
import { AdSection } from './components/ad-section/ad-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

export const AdItem = () => {
	const { data } = useGetAdReklamaInfoQuery(null)
	const [saveReklamaInfo] = useSaveAdReklamaInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<AdItemInputs>({
		mode: 'onBlur',
		resolver: yupResolver(adItemsSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<AdItemInputs> = async (data) => {
		const formData = new FormData()

		formData.append('block_name', data.block_name ?? '')
		if (data.advs) {
			data?.advs.forEach((ad, index) => {
				formData.append(`advs[${index}][id]`, ad.id ?? '')
				formData.append(`advs[${index}][adv_text]`, ad.adv_text ?? '')
			})
		}

		const res = await saveReklamaInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`)
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
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку рекламных блоков
			</Link>
			<h4 className={styles.titleNewsForm}>Блок «Реклама»</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<ControlledInput
									name='block_name'
									label='Название блока рекламы'
									margin=' 0 0 36px 0'
								/>
								{data?.advs.map((el, idx) => {
									return <AdSection number={Number(idx)} key={idx} />
								})}
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
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку рекламных блоков
			</Link>
		</>
	)
}
