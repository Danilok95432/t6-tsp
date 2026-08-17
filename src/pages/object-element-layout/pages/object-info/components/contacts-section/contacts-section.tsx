import { type FC } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { GridRow } from 'src/components/grid-row/grid-row'

import styles from './index.module.scss'

export const ContactsSection: FC = () => {
	return (
		<AdminSection
			innerClassName={styles.objectContactsInner}
			titleText='Контакты, социальные сети, карта'
			titleStyleClass={styles.objectContactsTitle}
		>
			<GridRow $margin='20px 0' $gap='10px'>
				<ControlledMaskedInput
					name='phone'
					label='Номер телефона'
					mask='{+7} (000) 000-00-00'
					placeholder='+7 (999) 000-77-44'
				/>
				<ControlledInput
					name='email'
					label='Адрес электронной почты (e-mail)'
					placeholder='example@example.com'
				/>
			</GridRow>
			<ControlledInput
				name='address'
				label='Полный почтовый адрес объекта*'
				placeholder='example@example.com'
			/>
			<GridRow $margin='20px 0' $gap='10px' $alignItems='end'>
				<ControlledInput name='tgName' label='Телеграм' placeholder='Текст ссылки' />
				<ControlledInput name='tgSoc' placeholder='Адрес URL' />
			</GridRow>
			<GridRow $margin='0 0 20px 0' $gap='10px' $alignItems='end'>
				<ControlledInput name='vkName' label='ВКонтакте' placeholder='Текст ссылки' />
				<ControlledInput name='vkSoc' placeholder='Адрес URL' />
			</GridRow>
			<ControlledInput
				name='coords'
				label='Координаты объекта (широта и долгота в градусах, минутах, секундах)*'
				placeholder='53.129867, 41.400010'
				margin='0 0 10px 0'
			/>
		</AdminSection>
	)
}
