import { type FC } from 'react'
import { type CommunityDocumentsInputs } from 'src/pages/community-layout/pages/admin-community-documents/schema'
import cn from 'classnames'

import { useFieldArray, useFormContext } from 'react-hook-form'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'

import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { GridRow } from 'src/components/grid-row/grid-row'
import { RowGridController } from 'src/components/row-grid-controller/row-grid-controller'

import styles from './index.module.scss'

export const RulesSection: FC = () => {
	const {
		control,
		formState: { errors },
	} = useFormContext<CommunityDocumentsInputs>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'rulesDocs',
	})

	return (
		<AdminSection titleText='Регламенты и правила' sectionName='rulesSection'>
			<ul className={styles.rulesList}>
				{fields?.map((field, idx) => (
					<li key={field.id}>
						<h4>Документ {idx + 1}</h4>
						<div className={styles.rulesRow}>
							<GridRow $template='auto / 1fr 200px'>
								<ControlledInput
									name={`rulesDocs.${idx}.ruleTitle`}
									dynamicError={errors.rulesDocs?.[idx]?.ruleTitle}
									placeholder='Название'
								/>
								<ControlledMaskedInput
									name={`rulesDocs.${idx}.ruleVersion`}
									dynamicError={errors.rulesDocs?.[idx]?.ruleVersion}
									mask={Number}
									placeholder='Номер версии'
								/>
							</GridRow>
							<div className={styles.rulesControllers}>
								<ReactDropzone
									name={`rulesDocs.${idx}.rulePdf`}
									variant='text'
									uploadBtnText='Загрузить PDF'
									accept={{
										'application/pdf': ['.pdf'],
									}}
								/>
								<ReactDropzone
									name={`rulesDocs.${idx}.ruleDocx`}
									variant='text'
									uploadBtnText='Загрузить DOCX'
									accept={{
										'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
											'.docx',
										],
									}}
								/>
								<RowGridController
									id={idx}
									className={cn({ [styles.hidden]: idx === 0 }, styles.rulesMoreBtn)}
									removeHandler={() => remove(idx)}
								/>
							</div>
						</div>
					</li>
				))}
			</ul>
			<AddButton
				type='button'
				onClick={() => {
					append(
						{
							ruleTitle: '',
							ruleVersion: '',
							rulePdf: [],
							ruleDocx: [],
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
