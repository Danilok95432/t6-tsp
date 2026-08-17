import { useState, type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { useForm } from 'react-hook-form'

import styles from './gallery-sections.module.scss'

type TraditionsSectionProps = {
	images?: ImageItemWithText[]
}

export const GallerySection: FC<TraditionsSectionProps> = () => {
	const [localeImages /* setLocaleImages */] = useState<ImageItemWithText[]>([])

	const methods = useForm({
		mode: 'onBlur',
		defaultValues: {
			photos: [],
		},
	})

	const { isSent /* markAsSent */ } = useIsSent(methods.control)

	return (
		<>
			<ReactDropzone
				margin='30px 0 0 0'
				label={`Галерея изображений (${0} из 8)`}
				previewVariant='img-list'
				variant='culture'
				name='photos'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				maxFiles={8}
				fileImages={localeImages}
				imgtype='traditions_photo'
				dzAreaClassName={styles.traditionsGalleryController}
				multiple
				customOpenModal={
					<AddButton
						// onClick={handleOpenModal}
						icon={<AddImageCulturePlusSVG />}
						$padding='44px 60px'
					>
						{' '}
					</AddButton>
				}
				customUploadBtn={
					<AddButton
						// onClick={handleOpenModal}
						icon={<AddImageCulturePlusSVG />}
						$padding='44px 60px'
					>
						{' '}
					</AddButton>
				}
			/>
			<FlexRow $margin='25px 0 50px 0' $gap='15px'>
				<AdminButton as='button' type='submit' $variant={isSent ? 'sent' : 'primary'}>
					Сохранить
				</AdminButton>
				<AdminButton as='link' to='/' $variant='light'>
					Отменить
				</AdminButton>
			</FlexRow>
		</>
	)
}
