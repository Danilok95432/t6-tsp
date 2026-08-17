import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { CustomText } from 'src/components/custom-text/custom-text'
import { GridRow } from 'src/components/grid-row/grid-row'
import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { InfoNewIconSVG } from 'src/UI/icons/InfoNewIconSVG'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'

export const MainSection = () => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='adress'
					label='Точный адрес площадки проведения внутри населенного пункта'
					placeholder='Точный адрес площадки проведения внутри населенного пункта'
					margin='0 0 20px 0'
					isRequired
					bigFont
					height='83px'
					isTextarea
				/>

				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<div className={styles.inputWrapper}>
				<ControlledInput
					name='title'
					label='Название площадки проведения'
					bigFont
					placeholder='Название площадки проведения'
					margin='0 0 20px 0'
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltipSpecial}>
					<InfoNewIconSVG />
				</Tooltip>
			</div>
			<FlexRow className={styles.dropzoneRow}>
				<ReactDropzone
					label='Изображение (логотип) события'
					name='photo'
					prompt='PNG, JPG, SVG, необходимое разрешение и размер'
					accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
					margin='20px 0 20px 0'
					previewVariant='sm-img'
					imgtype='news'
					className={styles.expressDropPhoto}
					dzAreaClassName={styles.expressDropPhoto}
					fileImages={[]}
				/>
				<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltipSpecial}>
					<InfoNewIconSVG />
				</Tooltip>
			</FlexRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Интернет-сайт события
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='15px'
				$mdGap='5px'
				$margin='0 0 20px 0'
				$template='auto / 0.35fr 0.65fr'
			>
				<ControlledInput name='contact_tg' placeholder='url сайта' bigFont />
				<div className={styles.inputWrapperSpecial}>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
					<ControlledCheckbox
						name='hide_website'
						label='Показывать на странице события'
						type='checkbox'
						className={styles.checkbox}
					/>
				</div>
			</GridRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Контактный номер телефона
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='15px'
				$mdGap='5px'
				$margin='0 0 20px 0'
				$template='auto / 0.35fr 0.65fr'
			>
				<ControlledMaskedInput
					name='contact_telphone'
					placeholder='+7 (999) 999-00-00'
					mask='{+7} (000) 000-00-00'
					className={styles.inputPhone}
				/>
				<div className={styles.inputWrapperSpecial}>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
					<ControlledCheckbox
						name='hide_telphone'
						label='Показывать на странице события'
						type='checkbox'
						className={styles.checkbox}
					/>
				</div>
			</GridRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Контактный e-mail
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='15px'
				$mdGap='5px'
				$template='auto / 0.35fr 0.65fr'
				$margin='0 0 20px 0'
			>
				<ControlledInput name='contact_email' placeholder='адрес электронной почты' bigFont />
				<div className={styles.inputWrapperSpecial}>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
					<ControlledCheckbox
						name='hide_email'
						label='Показывать на странице события'
						type='checkbox'
						className={styles.checkbox}
					/>
				</div>
			</GridRow>
			<CustomText $margin='0 0 5px 0' $fontWeight='600' $fontSize='20px'>
				Телеграм-канал
			</CustomText>
			<GridRow
				$alignItems='center'
				$gap='15px'
				$mdGap='5px'
				$margin='0 0 20px 0'
				$template='auto / 0.35fr 0.65fr'
			>
				<ControlledInput name='contact_tg' placeholder='@ имя пользователя' bigFont />
				<div className={styles.inputWrapperSpecial}>
					<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip}>
						<InfoIconSvg />
					</Tooltip>
					<ControlledCheckbox
						name='hide_tg'
						label='Показывать на странице события'
						type='checkbox'
						className={styles.checkbox}
					/>
				</div>
			</GridRow>
		</AdminSection>
	)
}
