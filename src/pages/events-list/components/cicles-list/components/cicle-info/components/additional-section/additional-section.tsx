import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { GridRow } from 'src/components/grid-row/grid-row'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { Tooltip } from 'src/components/tooltip/Tooltip'
import { InfoIconSvg } from 'src/UI/icons/infoIcon'
import { type FC } from 'react'
import { type SelOption } from 'src/types/select'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { type ImageItemWithText } from 'src/types/photos'

type AdditionalSectionProps = {
	ageList?: SelOption[]
	actualList?: SelOption[]
	regularityList?: SelOption[]
	photo?: ImageItemWithText[]
}

export const AdditionalSection: FC<AdditionalSectionProps> = ({
	ageList,
	actualList,
	regularityList,
	photo,
}) => {
	return (
		<AdminSection isBlock={false} className={styles.titleSectionInner}>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Возрастной рейтинг *'
							name='id_age_limit'
							selectOptions={ageList ?? [{ label: 'Не выбрано', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Актуальность цикла *'
							name='id_cicle_actual'
							selectOptions={actualList ?? [{ label: 'Не выбрано', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
			<div className={styles.inputWrapper}>
				<GridRow $template='auto/ 0.5fr' $mdTemplate='1fr / 1fr'>
					<div className={styles.inputWrapper}>
						<ControlledSelect
							label='Регулярность событий *'
							name='id_cicle_regular'
							selectOptions={regularityList ?? [{ label: 'Не выбрано', value: '0' }]}
						/>

						<Tooltip text='Подсказка' position='top' wrapperClassName={styles.tooltip_age}>
							<InfoIconSvg />
						</Tooltip>
					</div>
				</GridRow>
			</div>
			<ReactDropzone
				label='Основное изображение'
				name='photo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='20px 0 20px 0'
				previewVariant='sm-img'
				imgtype='news'
				fileImages={photo}
			/>
			<p className={styles.placeRequest}>
				Если площадки нет в списке, Вы можете <a href='#'>запросить добавление новой площадки</a>
			</p>
		</AdminSection>
	)
}
