import { type FC } from 'react'

import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { AdminSection } from 'src/components/admin-section/admin-section'

import { ControlledMaskedInput } from 'src/components/controlled-masked-input/controlled-masked-input'

export const MainDocSection: FC = () => {
	return (
		<AdminSection titleText='Основной документ'>
			<ControlledInput
				name='mainDocName'
				label='Название документа'
				placeholder='Название'
				margin='0 0 20px 0'
				maxWidth='1140px'
			/>
			<ControlledInput
				name='mainDocDescription'
				label='Короткое описание'
				margin='0 0 20px 0'
				height='200px'
				isTextarea
			/>
			<ControlledMaskedInput
				name='mainDocVersion'
				label='Номер версии'
				mask={Number}
				$margin='0 0 30px 0'
				$maxWidth='200px'
				placeholder='Номер версии'
			/>
			<ReactDropzone
				name='mainDocPdf'
				variant='text'
				uploadBtnText='Загрузить документ в формате PDF'
				margin='0 0 15px 0'
				accept={{
					'application/pdf': ['.pdf'],
				}}
			/>
			<ReactDropzone
				name='mainDocDocx'
				variant='text'
				uploadBtnText='Загрузить документ в формате DOCX'
				accept={{
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
				}}
			/>
		</AdminSection>
	)
}
