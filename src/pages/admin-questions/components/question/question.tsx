import { Link, useNavigate, useParams } from 'react-router-dom'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { type QuestionInputs, QuestionSchema } from './schema'
import { useGetQuestionInfoQuery, useSaveQuestionInfoMutation } from 'src/store/faq/faq.api'
import { useEffect, useState } from 'react'
import { booleanToNumberString } from 'src/helpers/utils'

import { Container } from 'src/UI/Container/Container'
import { SwitchedHiddenSvg } from 'src/UI/icons/switchedHiddenSVG'
import { SwitchedShowSvg } from 'src/UI/icons/switchedShowSVG'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { MainSection } from './components/main-section/MainSection'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { AdminContent } from 'src/components/admin-content/admin-content'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const Question = () => {
	const { id = '' } = useParams()
	const { data: questionInfoData } = useGetQuestionInfoQuery(id)
	const [saveQuestionInfo] = useSaveQuestionInfoMutation()

	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<QuestionInputs>({
		mode: 'onBlur',
		resolver: yupResolver(QuestionSchema),
		defaultValues: {
			hidden: false,
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<QuestionInputs> = async (data) => {
		const questionInfoFormData = new FormData()

		questionInfoFormData.append('id', id)
		questionInfoFormData.append('title', data.title)
		questionInfoFormData.append('content', data.content)
		questionInfoFormData.append('hidden', booleanToNumberString(data.hidden))
		const res = await saveQuestionInfo(questionInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminFrequentQuestions}`)
			}
		}
	}

	useEffect(() => {
		if (questionInfoData) {
			methods.reset({ ...questionInfoData })
		}
	}, [questionInfoData])

	return (
		<AdminContent $backgroundColor='#ffffff' $padding='30px 0' $height='609px'>
			<div className={styles.oneQuestionPage}>
				<Link to={`/${AdminRoute.AdminFrequentQuestions}`} className={adminStyles.adminReturnLink}>
					Возврат к списку вопросов
				</Link>

				<h3>Вопрос</h3>

				<Container $padding='0 0 135px 0' $paddingMobile='0 0 40px 0'>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
							<div className={styles.oneQuestionFormContent}>
								<MainSection />
								<SwitchedRadioBtns
									name='hidden'
									label='Спрятать'
									$variant='switcher'
									className={styles.oneQuestionSwitchBtns}
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

							<AdminControllers
								variant='4'
								outLink={`/${AdminRoute.AdminFrequentQuestions}`}
								isSent={isSent}
								actionHandler={setAction}
							/>
						</form>
					</FormProvider>
				</Container>

				<Link to={`/${AdminRoute.AdminFrequentQuestions}`} className={adminStyles.adminReturnLink}>
					Возврат к списку вопросов
				</Link>
			</div>
		</AdminContent>
	)
}
