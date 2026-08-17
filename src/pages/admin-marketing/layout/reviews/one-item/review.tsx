/* eslint-disable @typescript-eslint/naming-convention */
import { type OneReviewInputs, oneReviewSchema } from './schema'
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
import { useGetReviewInfoQuery, useSaveReviewInfoMutation } from 'src/store/marketing/marketing.api'
import { MainSection } from './components/main-section/main-section'
import { booleanToNumberString, currentDateString, formatDateToYYYYMMDD } from 'src/helpers/utils'
import { StarRatingSVG } from 'src/UI/icons/starRatingSVG'
import { FlexRow } from 'src/components/flex-row/flex-row'

const StarRating: React.FC<{
	rating: number
	onRatingChange: (rating: number) => void
}> = ({ rating, onRatingChange }) => {
	const [hoverRating, setHoverRating] = useState<number>(0)

	const handleStarClick = (starValue: number) => {
		onRatingChange(starValue)
	}

	const handleStarHover = (starValue: number) => {
		setHoverRating(starValue)
	}

	const handleMouseLeave = () => {
		setHoverRating(0)
	}

	const displayRating = hoverRating || rating

	return (
		<div className={styles.starRating} onMouseLeave={handleMouseLeave}>
			<p className={styles.label}>Рейтинг</p>
			<FlexRow className={styles.ratingRow}>
				{Array.from({ length: 5 }, (_, index) => {
					const starValue = index + 1
					const isFilled = starValue <= displayRating

					return (
						<button
							key={starValue}
							className={styles.starButton}
							onClick={() => handleStarClick(starValue)}
							onMouseEnter={() => handleStarHover(starValue)}
							type='button'
						>
							<StarRatingSVG active={isFilled} />
						</button>
					)
				})}
			</FlexRow>
		</div>
	)
}

export const OneReview = () => {
	const { id = '0' } = useParams()

	const { data } = useGetReviewInfoQuery(id)
	const [saveReview] = useSaveReviewInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneReviewInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneReviewSchema),
		defaultValues: {
			hidden: false,
		},
	})
	const navigate = useNavigate()
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneReviewInputs> = async (data) => {
		const formData = new FormData()
		formData.append('id', id ?? '')
		formData.append('fio', data.fio)
		formData.append('comment', data.comment ?? '')
		formData.append('rating', data.rating ?? '')
		formData.append('role', data.role ?? '')
		formData.append('review_date', formatDateToYYYYMMDD(data.review_date ?? ''))
		formData.append('hidden', booleanToNumberString(data.hidden))
		const res = await saveReview(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingReview}`)
			}
		}
	}
	const [starRating, setStarRating] = useState<number>(Number(data?.rating))
	const handleRatingChange = (newRating: number) => {
		setStarRating(newRating)
		methods.setValue('rating', String(newRating))
	}

	useEffect(() => {
		if (data) {
			let initialDate: string | undefined
			if (data.review_date === '0000-00-00') initialDate = currentDateString()
			const transformedData = {
				...data,
				review_date: data.review_date === '0000-00-00' ? initialDate : data.review_date,
			}
			methods.reset({ ...transformedData })
		}
	}, [data])

	return (
		<>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingReview}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку отзывов
			</Link>
			<h4 className={styles.titleNewsForm}>{`Отзыв пользователя "${data?.fio}"`}</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<MainSection />
								<StarRating rating={starRating} onRatingChange={handleRatingChange} />
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Marketing}/${AdminRoute.MarketingReview}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingReview}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку отзывов
			</Link>
		</>
	)
}
