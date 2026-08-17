import { type OrgDetailsInputs, orgDetailsSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { OrgMainInfoSection } from './components/org-main-info/org-main-info'
import { OrgAdditionalInfoSection } from './components/org-additional-info/org-additional-info'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styles from './index.module.scss'

export const OrgDetails = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')
	const passStatus = true

	const methods = useForm<OrgDetailsInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orgDetailsSchema),
	})

	const { isSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OrgDetailsInputs> = async (data) => {
		console.log(data)
	}

	return (
		<div className={styles.onePartnerPage}>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						{passStatus ? (
							<>
								<OrgMainInfoSection />
								<OrgAdditionalInfoSection />
								<AdminControllers variant='5' isSent={isSent} actionHandler={setAction} />
							</>
						) : (
							<FlexRow className={styles.passRow}>
								<p>
									Для того, чтобы сменить любые реквизиты активированного организатора, обратитесь к
									администратору.
								</p>
								<AdminButton>Отправить обращение</AdminButton>
							</FlexRow>
						)}
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}
