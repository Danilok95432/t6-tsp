import { useEffect, useRef, type FC } from 'react'
import cn from 'classnames'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { FormInput } from 'src/UI/FormInput/FormInput'

type MainSectionProps = {
	errorForm?: string
	setErrorForm?: (value: string) => void
	isCodeAccepted?: boolean
	setIsCodeAccepted: (arg0: boolean) => void
}

export const MainSection: FC<MainSectionProps> = ({
	isCodeAccepted,
	setIsCodeAccepted,
	errorForm,
	setErrorForm,
}) => {
	const phoneInputRef = useRef<HTMLInputElement>(null)
	const codeInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (errorForm) {
			const targetRef = isCodeAccepted ? phoneInputRef : codeInputRef

			if (targetRef.current) {
				targetRef.current.focus()
				targetRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				})
			}
		}
	}, [errorForm, isCodeAccepted])
	return (
		<AdminSection className={styles.mainSection} isBlock={false}>
			<h2>Основные данные</h2>
			<div className={styles.inputWrapper}>
				<ControlledInput name='surname' label='Фамилия *' placeholder='Фамилия' />
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='firstname' label='Имя *' placeholder='Имя' />
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput name='fathname' label='Отчество' placeholder='Отчество' />
			</div>
			<div className={cn(styles.inputWrapper, styles.shortInput)}>
				<ControlledInput name='age' label='Возраст' />
			</div>
			<FlexRow className={styles.groupInputsStart}>
				<div className={styles.inputwithLabel} ref={phoneInputRef}>
					<FormInput
						name='phone'
						label='Номер телефона'
						isPhoneWithCode={true}
						className={styles.noMargin}
						isCodeAccepted={isCodeAccepted}
					/>
					{errorForm && <p className={styles.warningMessage}>{errorForm}</p>}
				</div>
				<div className={styles.inputwithLabel} ref={codeInputRef}>
					<FormInput
						name='code'
						label='Проверочный код'
						placeholder='*****'
						isCode
						isCodeAccepted={isCodeAccepted}
						errorForm={errorForm}
						setErrorForm={setErrorForm}
						setIsCodeAccepted={setIsCodeAccepted}
						className={styles.noMargin}
					/>
					{!isCodeAccepted && errorForm && <p className={styles.warningMessage}>Неверный код</p>}
				</div>
			</FlexRow>
		</AdminSection>
	)
}
