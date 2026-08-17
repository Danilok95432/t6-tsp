import { type FC } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'

export const MailSection: FC = () => {
	return (
		<AdminSection titleText='Почтовый адрес' sectionName='mailSection'>
			<ControlledInput name='mailAddress' placeholder='Адрес' margin='0' />
		</AdminSection>
	)
}
