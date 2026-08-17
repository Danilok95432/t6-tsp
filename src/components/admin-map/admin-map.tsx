import { type FC } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import styles from './index.module.scss'
import cn from 'classnames'

export type ContactsMapProps = {
	points: [number, number] | null
	zoom?: number
	className?: string
}

export const AdminMap: FC<ContactsMapProps> = ({ points, zoom, className }) => {
	if (!points) return null

	return (
		<div className={cn(styles.adminMap, className)}>
			<YMaps>
				<Map
					state={{ center: points, controls: [], zoom: zoom ?? 17 }}
					options={{ suppressMapOpenBlock: true }}
					width='100%'
					height='100%'
				>
					<Placemark geometry={points} />
				</Map>
			</YMaps>
		</div>
	)
}
