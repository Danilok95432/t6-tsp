import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useEffect, useState } from 'react'
import { TitleSection } from './components/title-section/title-section'
import { DescSection } from './components/desc-section/desc-section'
import { CheckBoxSection } from './components/checkbox-section/checkbox-section'
import { AdditionalSection } from './components/additional-section/additional-section'
import { useGetCicleInfoQuery, useSaveCicleInfoMutation } from 'src/store/events/events.api'
import { type CicleInfoInputs, cicleInfoSchema } from './schema'
import { booleanToNumberString, transformToFormData } from 'src/helpers/utils'

export const CicleInfo = () => {
	const { id = '0' } = useParams()
	const { data: cicleInfo } = useGetCicleInfoQuery(id)
	const [saveCicleInfo] = useSaveCicleInfoMutation()

	const methods = useForm<CicleInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(cicleInfoSchema),
		defaultValues: {
			photo: [],
			photos: [],
			url: '',
			hidden: false,
			cicle_dates: '',
			age: '',
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<CicleInfoInputs> = async (data) => {
		const serverData = {
			id_cicle_type:
				typeof data.id_cicle_type === 'string'
					? data.id_cicle_type
					: data.id_cicle_type
						? data.id_cicle_type[0].value
						: '0',
			id_cicle_regular:
				typeof data.id_cicle_regular === 'string'
					? data.id_cicle_regular
					: data.id_cicle_regular
						? data.id_cicle_regular[0].value
						: '0',
			id_cicle_actual:
				typeof data.id_cicle_actual === 'string'
					? data.id_cicle_actual
					: data.id_cicle_actual
						? data.id_cicle_actual[0].value
						: '0',
			id_age_limit:
				typeof data.id_age_limit === 'string'
					? data.id_age_limit
					: data.id_age_limit
						? data.id_age_limit[0].value
						: '0',
			id_organizator:
				typeof data.organizators_list === 'string'
					? data.organizators_list
					: data.organizators_list
						? data.organizators_list[0].value
						: '0',
			cicle_name: data.cicle_name,
			cicle_dates: data.cicle_dates,
			cicle_short: data.cicle_short,
			age: data.age,
			url: data.url,
			email: data.email,
			telegram: data.telegram,
			phone: data.phone,
			place: data.place,
			anonstext: data.anonstext,
			fulltext: data.fulltext,
			use_video: booleanToNumberString(data.use_video),
			use_gallery: booleanToNumberString(data.use_gallery),
			use_news: booleanToNumberString(data.use_news),
		}
		const eventInfoFormData = transformToFormData(serverData)
		const eventId = id
		eventInfoFormData.append('id', eventId)
		const res = await saveCicleInfo(eventInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminCiclesList}`)
			}
		}
	}

	useEffect(() => {
		if (cicleInfo) {
			methods.reset({ ...cicleInfo })
		}
	}, [cicleInfo])

	return (
		<AdminContent className={styles.eventProfilePage} $backgroundColor='#ffffff'>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminCiclesList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку циклов
			</Link>
			<h3 className={styles.titleInfo}>Цикл</h3>
			<FormProvider {...methods}>
				<form
					className={styles.eventProfileForm}
					onSubmit={methods.handleSubmit(onSubmit)}
					noValidate
					autoComplete='off'
				>
					<TitleSection
						typeList={cicleInfo?.id_cicle_type}
						organizatorsList={cicleInfo?.organizators_list}
					/>
					<DescSection />
					<CheckBoxSection />
					<AdditionalSection
						ageList={cicleInfo?.id_age_limit}
						regularityList={cicleInfo?.id_cicle_regular}
						actualList={cicleInfo?.id_cicle_actual}
					/>
					<FlexRow $margin='0 0 40px 0' $maxWidth='1140px' $justifyContent='space-between'>
						<FlexRow>
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
						</FlexRow>
						<AdminButton
							as='route'
							to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminCiclesList}`}
							$variant='cancel'
						>
							Отменить изменения
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
			<Link
				to={`/${AdminRoute.AdminEventLayout}/${AdminRoute.AdminCiclesList}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к списку циклов
			</Link>
		</AdminContent>
	)
}
