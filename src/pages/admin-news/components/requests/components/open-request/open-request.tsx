import { type OpenRequestInputs, openRequestSchema } from './schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Container } from 'src/UI/Container/Container'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { SwitchedHiddenSvg } from 'src/UI/icons/switchedHiddenSVG'
import { SwitchedShowSvg } from 'src/UI/icons/switchedShowSVG'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { Disclaimer } from './components/disclaimer/disclaimer'
import { DateSection } from './components/date-section/date-section'
import { DescSection } from './components/desc-section/desc-section'

import styles from './index.module.scss'
import { useGetRequestInfoQuery } from 'src/store/requests/requests.api'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

export const OpenRequest = () => {
	const { id = '0' } = useParams()
	const { data: requestInfoData } = useGetRequestInfoQuery(id)

	const methods = useForm<OpenRequestInputs>({
		mode: 'onBlur',
		resolver: yupResolver(openRequestSchema),
		defaultValues: {
			hidden: false,
			original_date: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<OpenRequestInputs> = async (data) => {
		console.log(data)
		markAsSent(true)
	}

	useEffect(() => {
		if (requestInfoData) {
			methods.reset({ ...requestInfoData })
		}
	}, [requestInfoData])

	return (
		<>
			<h4 className={styles.titleRequestForm}>Рассмотреть заявку</h4>
			<Container>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.requestContent}>
							<div className={styles.requestContentLeft}>
								<Disclaimer />
								<DateSection />
								<DescSection
									title={requestInfoData?.title}
									source={requestInfoData?.source}
									requestType={requestInfoData?.request_type}
									short={requestInfoData?.short}
								/>
							</div>
							<div className={styles.requestContentRight}>
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
						<FlexRow $margin='40px 0 0 0'>
							<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
								Одобрить размещение
							</AdminButton>
							<AdminButton as='route' to='/news/requests-list' $variant='delay'>
								Отложить размещение
							</AdminButton>
							<AdminButton as='route' to='/news/requests-list' $variant='cancel'>
								Отказать в размещении
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</>
	)
}
