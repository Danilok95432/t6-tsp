import { type FC } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { GridRow } from 'src/components/grid-row/grid-row'

export const EmailsSection: FC = () => {
	return (
		<AdminSection titleText='Электронная почта' sectionName='emailsSection'>
			<GridRow>
				<ControlledInput name='emailOwner' placeholder='Чей адрес' />
				<ControlledInput name='emailAddress' placeholder='Адрес e-mail' />
			</GridRow>
		</AdminSection>
	)
}
