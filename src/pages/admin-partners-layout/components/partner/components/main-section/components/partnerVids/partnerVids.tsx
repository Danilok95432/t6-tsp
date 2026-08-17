import { type FC } from 'react'
import { type PartnerCheckBoxesInfo } from 'src/types/partners'
import { type OnePartnerInputs } from '../../../../schema'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'

import styles from './index.module.scss'

type PartnerVidsSectionProps = {
	partnerVids: PartnerCheckBoxesInfo[]
}

export const PartnerVidsSection: FC<PartnerVidsSectionProps> = ({ partnerVids }) => {
	const { control } = useFormContext<OnePartnerInputs>()

	const { fields } = useFieldArray({
		control,
		name: 'partner_vids',
	})

	return (
		<div className={styles.tableCheckBoxes}>
			{fields?.map((field, idx) => (
				<ControlledCheckbox
					key={field.id}
					name={`partner_vids[${idx}].checked`}
					label={partnerVids[idx].label}
					type='checkbox'
				/>
			))}
		</div>
	)
}
