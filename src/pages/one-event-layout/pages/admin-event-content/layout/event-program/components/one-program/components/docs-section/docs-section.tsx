import { type FC } from 'react'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { RemoveFileSvg } from 'src/UI/icons/removeFileSVG'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { type FileItem } from 'src/types/files'
import styles from './index.module.scss'
import { FlexRow } from 'src/components/flex-row/flex-row'

type DocsSectionProps = {
	files?: FileItem[]
}

export const DocsSection: FC<DocsSectionProps> = ({ files = [] }) => {
	return (
		<AdminSection isBlock={false} className={styles.docsSection}>
			<h3>Документы</h3>
			<span>Загрузите файлы в формате PDF размером до 5Мб</span>
			<FlexRow className={styles.docsRow}>
				<ReactDropzoneFiles
					previewVariant='text'
					removeIcon={<RemoveFileSvg />}
					name='documents'
					accept={{
						'application/pdf': ['.pdf'],
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
					}}
					maxFiles={1}
					files={files}
					fileType='event'
					multiple
					customUploadBtn={<AddButton>Добавить регламент проведения</AddButton>}
				/>
				<ReactDropzoneFiles
					previewVariant='text'
					removeIcon={<RemoveFileSvg />}
					name='documents'
					accept={{
						'application/pdf': ['.pdf'],
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
					}}
					maxFiles={1}
					files={files}
					fileType='event'
					multiple
					customUploadBtn={<AddButton>Добавить требования к участникам</AddButton>}
				/>
				<ReactDropzoneFiles
					previewVariant='text'
					removeIcon={<RemoveFileSvg />}
					name='documents'
					accept={{
						'application/pdf': ['.pdf'],
						'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
					}}
					maxFiles={1}
					files={files}
					fileType='event'
					multiple
					customUploadBtn={<AddButton>Добавить полную версию правил</AddButton>}
				/>
			</FlexRow>
		</AdminSection>
	)
}
