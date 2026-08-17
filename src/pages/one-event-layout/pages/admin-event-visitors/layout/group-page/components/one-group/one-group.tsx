import { type OneVisitorInputs, oneVisitorSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useGetNewsInfoQuery, useSaveNewsInfoMutation } from 'src/store/news/news.api'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import { MainSection } from './components/main-section/main-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'

import styles from './index.module.scss'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { SwitchedShowSvg } from 'src/UI/icons/switchedShowSVG'
import { SwitchedHiddenSvg } from 'src/UI/icons/switchedHiddenSVG'
import { DropdownList } from 'src/components/dropdown-list/dropdown-list'

export const OneGroup = () => {
	const { id = '0' } = useParams()

	const { data: newsInfoData } = useGetNewsInfoQuery(id)
	const [saveNewsInfo] = useSaveNewsInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<OneVisitorInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneVisitorSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneVisitorInputs> = async (data) => {
		const serverData = {}
		const newsInfoFormData = transformToFormData(serverData)
		const newsId = id
		newsInfoFormData.append('id', newsId)
		const res = await saveNewsInfo(newsInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminNews}/${AdminRoute.AdminNewsList}`)
			}
		}
	}

	useEffect(() => {
		if (newsInfoData) {
			let skipDate = false
			if (newsInfoData?.itemdate === '0000-00-00 00:00:00') {
				skipDate = true
			}
			const transformedData = {
				...newsInfoData,
				itemdate: skipDate ? undefined : newsInfoData?.itemdate,
			}
			methods.reset({ ...transformedData })
		}
	}, [newsInfoData])

	return (
		<>
			<Container $padding='0px 30px 35px 30px'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<h2>
									Группа «<strong>Название группы</strong>»
								</h2>
								<MainSection />
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
								<DropdownList
									label={'Участники группы (список)'}
									list={['Первый участник', 'Второй участник']}
								/>
							</div>
						</div>
						<FlexRow $margin='0 0 40px 0' $maxWidth='1140px'>
							<AdminButton as='button' type='submit' onClick={() => setAction('save')}>
								Сохранить и выйти
							</AdminButton>
							<AdminButton
								as='button'
								type='submit'
								$variant={isSent ? 'sent' : 'light'}
								onClick={() => setAction('apply')}
							>
								Применить и продолжить
							</AdminButton>
							<AdminButton
								as='route'
								to={`/${AdminRoute.AdminEvent}/${AdminRoute.AdminEventVisitors}/${id}/${AdminRoute.Groups}`}
								$variant='cancel'
							>
								Отменить изменения
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
			</Container>
		</>
	)
}
