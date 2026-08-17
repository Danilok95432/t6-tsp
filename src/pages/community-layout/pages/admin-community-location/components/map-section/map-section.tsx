import { type FC, useState, useEffect } from 'react'
import { type LocationInputs } from 'src/pages/community-layout/pages/admin-community-location/schema'

import { useFormContext } from 'react-hook-form'
import { useGetLocationCommunityQuery } from 'src/store/community/community.api'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { AdminMap } from 'src/components/admin-map/admin-map'
import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'

import styles from './index.module.scss'

export const MapSection: FC = () => {
	const { setValue, watch } = useFormContext<LocationInputs>()

	const { data } = useGetLocationCommunityQuery(null)
	const prevMapCoordinates: [number, number] | null = data?.mapCoords
		? (data.mapCoords.split(',').map(Number) as [number, number])
		: null

	const initialCoords = prevMapCoordinates?.join(', ') ?? ''

	const inputValue = watch('mapCoords', initialCoords)

	const [mapCoordinates, setMapCoordinates] = useState<[number, number] | null>(prevMapCoordinates)

	useEffect(() => {
		if (prevMapCoordinates) {
			setMapCoordinates(prevMapCoordinates)
			setValue('mapCoords', initialCoords)
		}
	}, [data])

	const handleSave = () => {
		if (initialCoords !== inputValue) {
			const coordArr = inputValue.split(',').map((el) => +el.trim())
			if (coordArr.length === 2 && !isNaN(coordArr[0]) && !isNaN(coordArr[1])) {
				setMapCoordinates([coordArr[0], coordArr[1]])
			}
		}
	}

	const handleReset = () => {
		if (prevMapCoordinates) {
			setMapCoordinates(prevMapCoordinates)
			setValue('mapCoords', initialCoords)
		}
	}

	return (
		<AdminSection titleText='Карта' sectionName='mapSection'>
			<ControlledMaskedInput
				label='Координаты (широта, долгота в градусах, минутах и секундах)*'
				mask={/^[^a-zA-Zа-яА-Я]*$/}
				name='mapCoords'
				$margin='0 0 15px 0'
				placeholder='Координаты'
			/>
			<div className={styles.mapControllers}>
				<AdminButton
					$padding='0 20px'
					$height='35px'
					as='button'
					type='submit'
					onClick={handleSave}
					$variant={initialCoords === inputValue ? 'sent' : 'primary'}
				>
					Сохранить
				</AdminButton>
				{initialCoords !== inputValue && (
					<AdminButton $padding='0 20px' $height='35px' type='button' onClick={handleReset}>
						Отменить
					</AdminButton>
				)}
			</div>

			<QuillEditor name='topDescs' label='Текст-анонс*' $heightEditor='200px' />

			<div className={styles.loadedMap}>
				<AdminMap points={mapCoordinates} zoom={17} />
			</div>
		</AdminSection>
	)
}
