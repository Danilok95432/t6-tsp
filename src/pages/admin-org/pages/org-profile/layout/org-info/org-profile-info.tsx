import { type OrgProfileInputs, orgProfileSchema } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useState } from 'react'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

import { MainSection } from './component/main-section'

export const OrgProfileInfo = () => {
	const [, setAction] = useState<'apply' | 'save'>('apply')

	const methods = useForm<OrgProfileInputs>({
		mode: 'onBlur',
		resolver: yupResolver(orgProfileSchema),
	})

	const { isSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<OrgProfileInputs> = async (data) => {
		console.log(data)
	}

	return (
		<div>
			<Container $padding='0 0 40px 0' $paddingMobile='0 0 40px 0'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MainSection />
						<AdminControllers variant='5' isSent={isSent} actionHandler={setAction} />
					</form>
				</FormProvider>
			</Container>
		</div>
	)
}
