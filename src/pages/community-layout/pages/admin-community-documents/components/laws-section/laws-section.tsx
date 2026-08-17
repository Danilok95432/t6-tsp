import { type FC } from 'react'
import cn from 'classnames'

import { type CommunityDocumentsInputs } from 'src/pages/community-layout/pages/admin-community-documents/schema'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { GridRow } from 'src/components/grid-row/grid-row'
import { RowGridController } from 'src/components/row-grid-controller/row-grid-controller'

import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { AddButton } from 'src/UI/AddButton/AddButton'

import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const LawsSection: FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<CommunityDocumentsInputs>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'lawsDocs',
	})

	return (
		<AdminSection titleText='Законы и нормы' sectionName='lawsSection'>
			<ul>
				{fields?.map((field, idx) => (
					<li className={styles.lowsListItem} key={field.id}>
						<h4>Документ {idx + 1}</h4>

						<GridRow $template='auto / 1fr 200px' $maxWidth='984px' $margin='0 0 20px 0'>
							<ControlledInput
								name={`lawsDocs.${idx}.lawTitle`}
								dynamicError={errors.lawsDocs?.[idx]?.lawTitle}
								placeholder='Название документа'
							/>
							<ControlledMaskedInput
								name={`lawsDocs.${idx}.lawVersion`}
								dynamicError={errors.lawsDocs?.[idx]?.lawVersion}
								mask={Number}
								placeholder='Номер версии'
							/>
						</GridRow>

						<GridRow
							className={styles.lawsLinkRow}
							$template='auto / 1fr 345px 26px 200px 89px'
							$alignItems='flex-start'
						>
							<ControlledInput
								name={`lawsDocs.${idx}.lawDocLink`}
								dynamicError={errors.lawsDocs?.[idx]?.lawDocLink}
								placeholder='Ссылка на документ'
							/>
							<ControlledInput
								name={`lawsDocs.${idx}.lawDocSource`}
								dynamicError={errors.lawsDocs?.[idx]?.lawDocSource}
								placeholder='Источник'
							/>
							<FlexRow $alignItems='center' className={styles.rowLoadAndDelete}>
								<p className={styles.separator}>или</p>
								<ReactDropzone
									name={`lawsDocs.${idx}.lawDocFile`}
									variant='text'
									uploadBtnText='Загрузить PDF или DOCX'
									accept={{
										'application/pdf': ['.pdf'],
										'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
											'.docx',
										],
									}}
								/>
								<RowGridController
									id={idx}
									className={cn({ [styles.hidden]: idx === 0 })}
									removeHandler={() => remove(idx)}
								/>
							</FlexRow>
						</GridRow>
					</li>
				))}
			</ul>
			<AddButton
				$margin='30px 0 0 0'
				onClick={() => {
					append(
						{
							lawTitle: '',
							lawVersion: '',
							lawDocLink: '',
							lawDocSource: '',
							lawDocFile: [],
						},
						{ shouldFocus: false },
					)
				}}
			>
				Добавить документ
			</AddButton>
		</AdminSection>
	)
}
