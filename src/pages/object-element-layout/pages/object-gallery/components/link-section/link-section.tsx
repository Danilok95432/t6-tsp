import { type FC } from 'react'

import { Container } from 'src/UI/Container/Container'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'

import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'

export const LinkSection: FC = () => {
	return (
		<Container
			className={styles.formInputsGallery}
			$padding='0px 0 15px 0'
			$paddingMobile='0px 0 15px 0'
		>
			<p className={styles.linkDesc}>
				Ваш план обслуживания не предусматривает хранения большого объема контента (изображений и
				видео) на серверах Системы. <br /> Для размещения фотографий в галерее Вашего отделения
				подключите их методом указания прямых ссылок на сторонних хостингах.
			</p>
			<FlexRow $direction='row' $gap='9px' $alignItems='center' $maxWidth='60%' $wrap='nowrap'>
				<ControlledInput
					label='Название изображения *'
					name='title'
					placeholder='Добавьте название'
					width='100%'
				/>
				<ControlledInput
					label='Автор изображения'
					name='author'
					placeholder='Добавьте имя автора'
					width='100%'
				/>
			</FlexRow>
			<ControlledInput
				label='Ссылка на фото Вконтакте *'
				name='link'
				placeholder='https://vk.com/...'
				maxWidth='60%'
				margin='15px 0 5px 0'
			/>
		</Container>
	)
}
