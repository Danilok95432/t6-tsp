import { type OneTicketInputs, oneTicketSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import { MainSection } from './components/main-section/main-section'

export const OneTicket = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneTicketInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneTicketSchema),
	})
	const { isSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneTicketInputs> = async (data) => {
		console.log(data)
	}

	return (
		<>
			<h4 className={styles.titleNewsForm}>Добавить билет</h4>
			<Container $padding='0px 30px 35px 30px'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection />
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.AdminNews}/${AdminRoute.AdminNewsList}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
		</>
	)
}
