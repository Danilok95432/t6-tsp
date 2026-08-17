import { type FC } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'

export const TitleSection: FC = () => {
	return (
		<AdminSection titleText='Заглавный текст'>
			<ControlledInput name='titleText' label='Заглавный текст' height='200px' isTextarea />
		</AdminSection>
	)
}
