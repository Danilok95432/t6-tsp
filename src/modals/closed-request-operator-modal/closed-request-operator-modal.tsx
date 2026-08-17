import { type ResponseInputs, responseModalSchema } from './schema'
import React, { useState } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CloseModalSvg } from 'src/UI/icons/closeModalSVG'
import { useActions } from 'src/hooks/actions/actions'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styles from './index.module.scss'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { SupportRequestAgainSVG } from 'src/UI/icons/supportRequestAgainSVG'
import { StarRatingSVG } from 'src/UI/icons/starRatingSVG'

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
		</div>
	)
}

export const ClosedRequestOperatorModal = () => {
	const { closeModal } = useActions()

	const methods = useForm({
		mode: 'onBlur',
		resolver: yupResolver(responseModalSchema),
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [starRating, setStarRating] = useState<number>(0)

	const onSubmit: SubmitHandler<ResponseInputs> = (data) => {
		const formData = {
			...data,
		}
		console.log(formData)
		markAsSent(true)
	}

	const handleRatingChange = (newRating: number) => {
		setStarRating(newRating)
		// Если нужно сохранить в form state, можно использовать:
		// methods.setValue('rating', newRating)
	}

	return (
		<div className={styles.responseModal}>
			<div className='modal-header'>
				<h3>Ответ поддержки</h3>
				<FlexRow className={styles.headerRow}>
					<FlexRow className={styles.againBlock}>
						<SupportRequestAgainSVG color={'#D9001B'} />
						<p>Повторное обращение</p>
					</FlexRow>
					<button onClick={() => closeModal()} type='button'>
						<CloseModalSvg />
					</button>
				</FlexRow>
			</div>
			<div className='modal-content'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<FlexRow className={styles.responseForm}>
							<FlexRow className={styles.tableRow}>
								<FlexRow className={styles.labelRow}>
									<p>Номер обращения</p>
									<p>Прошлое обращение</p>
									<p>Тема обращения</p>
									<p>Дата и время</p>
									<p>Срочность</p>
									<p>Текст обращения</p>
									<p></p>
								</FlexRow>
								<FlexRow className={styles.valueRow}>
									<p>{'СТ-24069'}</p>
									<p className={styles.repeatReq}>{'СТ-24067'}</p>
									<p>{'ошибка на сайте'}</p>
									<FlexRow className={styles.dateRow}>
										<p>{'22.03.2024'}</p>
										<p>{'22:44'}</p>
									</FlexRow>
									<p>{'средняя'}</p>
									<p>
										{
											'7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт'
										}
									</p>
									<ReactDropzoneFiles name='files' variant='text' />
								</FlexRow>
							</FlexRow>
							<FlexRow className={styles.responseBlock}>
								<FlexRow className={styles.responseEl}>
									<p>
										<strong>Ответ поддержки</strong>
									</p>
									<p>
										{
											'7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт) 7 дней до события (стандарт'
										}
									</p>
								</FlexRow>
								<FlexRow className={styles.responseEl}>
									<p>
										<strong>Оцените работу поддержки *</strong>
									</p>
									<StarRating rating={starRating} onRatingChange={handleRatingChange} />
								</FlexRow>
							</FlexRow>
						</FlexRow>
						<AdminButton
							as='button'
							$height='40px'
							type='submit'
							$variant={isSent ? 'sent' : 'primary'}
						>
							Ответить
						</AdminButton>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}
