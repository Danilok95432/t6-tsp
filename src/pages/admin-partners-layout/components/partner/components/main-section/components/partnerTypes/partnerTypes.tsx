import { type FC } from 'react'
import { type OnePartnerInputs } from '../../../../schema'
import { type PartnerCheckBoxesInfo } from 'src/types/partners'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import styles from './index.module.scss'

type PartnerTypesSectionProps = {
	partnerTypes: PartnerCheckBoxesInfo[]
}

export const PartnerTypesSection: FC<PartnerTypesSectionProps> = ({ partnerTypes }) => {
	const { control } = useFormContext<OnePartnerInputs>()

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
