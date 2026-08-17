import { type OneRequestInputs, oneRequestSchema } from './schema'

import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useGetNewIdRequestQuery } from 'src/store/requests/requests.api'
import { formatDate, transformToFormData } from 'src/helpers/utils'

import { Container } from 'src/UI/Container/Container'
import { Disclaimer } from './components/disclaimer/disclaimer'
import { DateSection } from './components/date-section/date-section'
import { DescSection } from './components/desc-section/desc-section'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { SwitchedHiddenSvg } from 'src/UI/icons/switchedHiddenSVG'
import { SwitchedShowSvg } from 'src/UI/icons/switchedShowSVG'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

export const OneRequest = () => {
	const { refetch: getNewId } = useGetNewIdRequestQuery(null)

	const methods = useForm<OneRequestInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneRequestSchema),
		defaultValues: {
			hidden: true,
			original_date: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)

	const onSubmit: SubmitHandler<OneRequestInputs> = async (data) => {
		console.log(data)
		const dateFormat = formatDate(data.publicdate)
		if (dateFormat) data.publicdate = dateFormat
		const requestInfoFormData = transformToFormData(data)
		const newIdResponse = await getNewId().unwrap()
		requestInfoFormData.append('id', newIdResponse.id)
		// const res = await saveRequestInfo(requestInfoFormData)
		markAsSent(true)
	}

	return (
		<>
			<h4 className={styles.titleRequestForm}>Подать заявку</h4>
			<Container>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.requestContent}>
							<div className={styles.requestContentLeft}>
								<Disclaimer />
								<DateSection />
								<DescSection />
							</div>
							<div className={styles.requestContentRight}>
								<SwitchedRadioBtns
									name='isHiddenRequest'
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
								Подать заявку
							</AdminButton>
							<AdminButton as='route' to='/news/requests-list' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</>
	)
}
