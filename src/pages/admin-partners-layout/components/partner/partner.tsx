import { type OnePartnerInputs, onePartnerSchema } from './schema'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetPartnerInfoQuery, useSavePartnerInfoMutation } from 'src/store/partners/partners.api'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useEffect, useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { MainSection } from './components/main-section/main-section'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const Partner = () => {
	const { id = '' } = useParams()
	const { data: partnerInfoData } = useGetPartnerInfoQuery(id)
	const [savePartnerInfo] = useSavePartnerInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OnePartnerInputs>({
		mode: 'onBlur',
		resolver: yupResolver(onePartnerSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OnePartnerInputs> = async (data) => {
		const partnerId = id
		const partnerInfoFormData = new FormData()

		partnerInfoFormData.append('id', partnerId)
		partnerInfoFormData.append('title', data.title)
		partnerInfoFormData.append('itemlink', data.itemlink)

		data.partner_vids?.forEach((vid, index) => {
			if (vid.checked) partnerInfoFormData.append(`partner_vids[${index}]`, vid.value)
		})
		data.partner_types?.forEach((type, index) => {
			if (type.checked) partnerInfoFormData.append(`partner_types[${index}]`, type.value)
		})
		const res = await savePartnerInfo(partnerInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminPartners}`)
			}
		}
	}

	useEffect(() => {
		if (partnerInfoData) {
			methods.reset({ ...partnerInfoData })
		}
	}, [partnerInfoData])

	return (
		<div className={styles.onePartnerPage}>
			<Link to={`/${AdminRoute.AdminPartners}`} className={adminStyles.adminReturnLink}>
				Возврат к списку партнеров
			</Link>
			<h3>Партнер</h3>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection
							partnerVids={partnerInfoData?.partner_vids}
							partnerTypes={partnerInfoData?.partner_types}
							photo={partnerInfoData?.photo}
						/>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.AdminPartners}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link to={`/${AdminRoute.AdminPartners}`} className={adminStyles.adminReturnLink}>
				Возврат к списку партнеров
			</Link>
		</div>
	)
}
