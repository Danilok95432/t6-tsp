import { type OneDocumentInputs, oneDocumentSchema } from './schema'
import { Link } from 'react-router-dom'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'
import { InfoSection } from './components/info-section'

export const OneDocument = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OneDocumentInputs>({
		mode: 'onBlur',
		resolver: yupResolver(oneDocumentSchema),
		defaultValues: {
			scans: [],
			sum: '0.00',
		},
	})

	const { isSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OneDocumentInputs> = async (data) => {
		console.log(data)
	}

	return (
		<div className={styles.onePartnerPage}>
			<Link
				to={`/${AdminRoute.AdminOrg}/${AdminRoute.OrgInfo}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к сводке организатора и списку документов
			</Link>
			<h2>Добавить документ</h2>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<InfoSection />
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.AdminOrg}/${AdminRoute.OrgInfo}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<Link
				to={`/${AdminRoute.AdminOrg}/${AdminRoute.OrgInfo}`}
				className={adminStyles.adminReturnLink}
			>
				Возврат к сводке организатора и списку документов
			</Link>
		</div>
	)
}
