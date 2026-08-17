import { type FC } from 'react'
import { type PartnerCheckBoxesInfo } from 'src/types/partners'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import styles from './index.module.scss'
import { type EventPartnerInputs } from '../../../../schema'

type PartnerEventTypesSectionProps = {
	partnerTypes: PartnerCheckBoxesInfo[]
}

export const PartnerEventTypesSection: FC<PartnerEventTypesSectionProps> = ({ partnerTypes }) => {
	const { control } = useFormContext<EventPartnerInputs>()

	const { fields } = useFieldArray({
		control,
		name: 'partner_types',
	})

	return (
		<div className={styles.tableCheckBoxes}>
			{fields?.map((field, idx) => (
				<ControlledCheckbox
					key={field.id}
					name={`partner_types[${idx}].checked`}
					label={partnerTypes[idx].label}
					type='checkbox'
				/>
			))}
		</div>
	)
}
