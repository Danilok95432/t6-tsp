import { type FC } from 'react'
import { AdminSection } from 'src/components/admin-section/admin-section'
import { SwitchedRadioBtns } from 'src/components/switched-radio-btns/switched-radio-btns'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { RemoveFileSvg } from 'src/UI/icons/removeFileSVG'
import { ReactDropzoneFiles } from 'src/components/react-dropzone-files/react-dropzone-files'
import { type FileItem } from 'src/types/files'

type DocsSectionProps = {
	files?: FileItem[]
}

export const DocsSection: FC<DocsSectionProps> = ({ files = [] }) => {
	return (
		<AdminSection
			titleText='Документы события'
			sectionName='documents'
			additionalNodeForHead={
				<SwitchedRadioBtns
					name='hide_documents'
					contentRadio1='Показать всем'
					contentRadio2='Скрыть'
				/>
			}
		>
			<ReactDropzoneFiles
				previewVariant='list'
				removeIcon={<RemoveFileSvg />}
				name='documents'
				accept={{
					'application/pdf': ['.pdf'],
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
				}}
				maxFiles={7}
				files={files}
				fileType='event'
				multiple
				customUploadBtn={<AddButton>Добавить документ</AddButton>}
			/>
		</AdminSection>
	)
}
