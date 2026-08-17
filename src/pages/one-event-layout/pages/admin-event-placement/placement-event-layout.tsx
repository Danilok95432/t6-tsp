import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'
import { Container } from 'src/UI/Container/Container'
import { MainSection } from './components/main-section/main-section'
import { FormProvider, type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { type PlacementInputs } from './schema'
import { useParams } from 'react-router-dom'
import {
	useGetEventLandingQuery,
	useGetEventPlacementQuery,
	useGetEventWidgetQuery,
	useGetEventWidgetRegQuery,
} from 'src/store/events/events.api'
import { useEffect } from 'react'

export const PlacementEventLayout = () => {
	const { id = '' } = useParams()
	const { data: placementData } = useGetEventPlacementQuery(id)
	const methods = useForm<PlacementInputs>({
		mode: 'onBlur',
		defaultValues: {
			use_widget_event: false,
			use_widget_reg: false,
			use_create_land: false,
			landing: {},
		},
	})

	const useWidgetEvent = useWatch({
		control: methods.control,
		name: 'use_widget_event',
	})
	const useWidgetEventReg = useWatch({
		control: methods.control,
		name: 'use_widget_reg',
	})
	const useLanding = useWatch({
		control: methods.control,
		name: 'use_create_land',
	})

	const { data: widgetData } = useGetEventWidgetQuery(id, {
		skip: !useWidgetEvent,
	})
	const { data: widgetRegData } = useGetEventWidgetRegQuery(id, {
		skip: !useWidgetEventReg,
	})
	const { data: landingData } = useGetEventLandingQuery(id, {
		skip: !useLanding,
	})

	useEffect(() => {
		if (placementData) {
			methods.reset({ ...(placementData as unknown as PlacementInputs) })
		}
	}, [placementData])

	useEffect(() => {
		if (useWidgetEvent && widgetData?.widget_event_code) {
			methods.setValue('widget_event_code', widgetData.widget_event_code)
		}
		if (!useWidgetEvent) {
			methods.setValue('widget_event_code', '')
		}
		if (useWidgetEventReg && widgetRegData?.widget_reg_code) {
			methods.setValue('widget_reg_code', widgetRegData.widget_reg_code)
		}
		if (!useWidgetEventReg) {
			methods.setValue('widget_reg_code', '')
		}
		if (useLanding && landingData?.landing) {
			methods.setValue('landing', landingData.landing)
		}
		if (!useLanding) {
			methods.setValue('landing', '')
		}
	}, [useWidgetEvent, widgetData, methods])

	const onSubmit: SubmitHandler<PlacementInputs> = async (data) => {
		console.log(data)
	}
	return (
		<AdminContent $padding='0' $backgroundColor='#ffffff' className={styles.placementPage}>
			<Container $padding='35px 35px 55px 35px' $paddingMobile='35px'>
				<h2>Размещение события в сети</h2>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection
							colorList={placementData?.color_schema}
							domainList={placementData?.domains_list}
						/>
						{/*
							<FlexRow>
							<AdminButton
								as='button'
								$height='auto'
								$fontSize='20px'
								$padding='22px 30px'
								type='submit'
								onClick={() => setAction('save')}
							>
								Сохранить и выйти
							</AdminButton>
							<AdminButton
								as='button'
								type='submit'
								$height='auto'
								$fontSize='20px'
								$padding='22px 30px'
								$variant={isSent ? 'sent' : 'light'}
								onClick={() => setAction('apply')}
							>
								Применить и продолжить
							</AdminButton>
						</FlexRow>
							*/}
					</form>
				</FormProvider>
			</Container>
		</AdminContent>
	)
}
