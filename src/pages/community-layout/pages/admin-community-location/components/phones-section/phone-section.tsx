import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { GridRow } from 'src/components/grid-row/grid-row'

export const PhoneSection: FC = () => {
	return (
		<AdminSection titleText='Телефон' sectionName='phoneSection'>
			<GridRow $template='auto / 1.3fr 0.7fr'>
				<ControlledInput name='phoneOwner' placeholder='Чей номер' />
				<ControlledMaskedInput
					name='phoneNumber'
					mask='{+7} (000) 000-00-00'
					placeholder='+7 (___) ___-__-__ '
				/>
			</GridRow>
		</AdminSection>
	)
}
