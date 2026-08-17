import { type FC } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'
import { ReactDropzoneFiles } from '../react-dropzone-files/react-dropzone-files'
import { type FileItem } from 'src/types/files'
import { RemoveFileSvg } from 'src/UI/icons/removeFileSVG'
import { PlusDocumentSVG } from 'src/UI/icons/plusDocumentSVG'

type DocumentActionBarProps = {
	name: string
	subject: string
	files?: FileItem[]
	signStatus?: 'signed' | 'unsigned' | 'none'
}

export const DocumentActionBar: FC<DocumentActionBarProps> = ({
	name,
	subject,
	files = [],
	signStatus = 'unsigned',
}) => {
	const renderStatusText = () => {
		switch (signStatus) {
			case 'signed':
				return (
					<span className={cn(styles.docStatus, styles.signed)}>Подписан обеими сторонами</span>
				)
			case 'unsigned':
				return <span className={cn(styles.docStatus, styles.unsigned)}>Не подписан</span>
			case 'none':
				return <span className={cn(styles.docStatus, styles.none)}>Не создан</span>
		}
	}

	const renderButtons = () => {
		switch (signStatus) {
			case 'signed':
				return (
					<div className={styles.docBtns}>
						<button className={cn(styles.btn, styles.btnSecondary)}>Допсоглашение</button>
						<button className={cn(styles.btn, styles.btnDanger)}>Расторгнуть</button>
					</div>
				)
			case 'unsigned':
				return <button className={cn(styles.btn, styles.btnPrimary)}>Подписать договор</button>
			case 'none':
				return <button className={cn(styles.btn, styles.btnPrimary)}>Запросить договор</button>
		}
	}

	return (
		<div className={cn(styles.documentBar, styles.btnPrimary)}>
			<div className={styles.docLeft}>
				<div className={cn(styles.docName, { [styles.none]: signStatus === 'none' })}>{name}</div>
				{renderStatusText()}
			</div>

			<div className={styles.docCenter}>
				<div className={styles.docFiles}>
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
						customUploadBtn={<PlusDocumentSVG />}
					/>
				</div>
				<div className={styles.docSubject}>{subject}</div>
			</div>

			<div className={styles.docRight}>{renderButtons()}</div>
		</div>
	)
}
