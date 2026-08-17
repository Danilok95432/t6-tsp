import { type FC } from 'react'
import { type EventContentInputs } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-content/schema'

import { useFieldArray, useFormContext } from 'react-hook-form'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { GridRow } from 'src/components/grid-row/grid-row'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { CustomText } from 'src/components/custom-text/custom-text'
import { ControlledDateInput } from 'src/components/controlled-date-input/controlled-date-input'

import styles from './index.module.scss'
import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const LinksSection: FC = () => {
	const { control } = useFormContext<EventContentInputs>()

	const { fields, append } = useFieldArray({
		control,
		name: 'links',
	})

	return (
		<AdminSection
			titleText='Важные ссылки события'
			sectionName='links'
			additionalNodeForHead={
				<SwitchedRadioBtns name='hide_links' contentRadio1='Показать всем' contentRadio2='Скрыть' />
			}
		>
			<ControlledInput
				name='linksBlock_title'
				label='Название блока ссылок'
				maxWidth='1140px'
				margin='0 0 25px 0'
			/>
			<ul>
				{fields?.map((field, idx) => (
					<li className={styles.linkRow} key={field.id}>
						<GridRow className={styles.linkRowInputs}>
							<CustomText>Ссылка {idx + 1}</CustomText>
							<ControlledInput
								name={`links[${idx}].title`}
								placeholder='Текст ссылки'
								maxWidth='1140px'
							/>
							<ControlledInput name={`links[${idx}].desc`} placeholder='Текст подписи' />
							<ControlledInput name={`links[${idx}].link`} placeholder='Адрес URL' />
							<ControlledDateInput
								className={adminStyles.adminDateInput}
								name={`links[${idx}].date`}
								dateFormat='yyyy-MM-dd'
								placeholder='гггг-мм-дд'
								margin='0'
							/>
						</GridRow>
					</li>
				))}
			</ul>
			{fields.length < 5 && (
				<AddButton
					type='button'
					$margin='35px 0 0 0'
					onClick={() =>
						append(
							{
								title: '',
								link: '',
								desc: '',
								date: '',
							},
							{ shouldFocus: false },
						)
					}
				>
					Добавить ссылку
				</AddButton>
			)}
		</AdminSection>
	)
}
