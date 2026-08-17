import { type FC } from 'react'
import { type ImageItemWithText } from 'src/types/photos'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { AdminSection } from 'src/components/admin-section/admin-section'

type TitleSectionProps = {
	logo?: ImageItemWithText[]
}

export const PreviewSection: FC<TitleSectionProps> = ({ logo }) => {
	return (
		<AdminSection titleText='Основное изображение (логотип)'>
			<ReactDropzone
				name='logo'
				prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 20px 0'
				previewVariant='sm-img'
				imgtype='events'
				fileImages={logo}
			/>
		</AdminSection>
	)
}
