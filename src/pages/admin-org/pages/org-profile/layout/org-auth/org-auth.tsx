import { type OrgAuthInputs, orgAuthSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AuthSection } from './components/auth-section'

export const OrgAuth = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OrgAuthInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orgAuthSchema),
	})

	const { isSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OrgAuthInputs> = async (data) => {
		console.log(data)
	}

	return (
		<div>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<AuthSection />
						<AdminControllers variant='5' isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}
