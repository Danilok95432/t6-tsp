import { type ObjLocationInputs } from 'src/pages/object-element-layout/pages/object-location/schema'
import { useState } from 'react'

import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useFormContext } from 'react-hook-form'
import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'

export const MapSection = () => {
	const [mapScript, setMapScript] = useState<string | null>(null)

	const { getValues } = useFormContext<ObjLocationInputs>()

	const loadMap = () => {
		if (getValues('map_yandex')) {
			setMapScript(getValues('map_yandex'))
		}
	}
	return (
		<AdminSection titleText='Карта'>
			<ControlledInput
				name='map_yandex'
				label='Текст скрипта Яндекса'
				margin='0 0 15px 0'
				disabled={!!mapScript}
				height='200px'
				isTextarea
			/>
			<div className={styles.mapControllers}>
				<AdminButton $padding='0 20px' $height='35px' type='button' onClick={loadMap}>
					Сохранить
				</AdminButton>
				{!!mapScript && (
					<AdminButton
						$padding='0 20px'
						$height='35px'
						type='button'
						onClick={() => setMapScript(null)}
					>
						Отменить
					</AdminButton>
				)}
			</div>
			<div className={styles.loadedMap}>
				<iframe src={mapScript ?? ''}></iframe>
			</div>
		</AdminSection>
	)
}
