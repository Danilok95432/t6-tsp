import React, { type FC, type ReactNode, useCallback, useEffect, useState } from 'react'
import { type Accept, useDropzone } from 'react-dropzone'
import { type FileItem } from 'src/types/files'

import cn from 'classnames'
import { useFormContext } from 'react-hook-form'

import { FilePreviewsFiles } from '../file-previews-files/file-previews-files'
import { RemovePhotoSvg } from 'src/UI/icons/removePhotoSVG'
import { RemoveTextFileSvg } from 'src/UI/icons/removeTextFileSVG'
import { ErrorMessage } from '@hookform/error-message'
import { AttachIconSvg } from 'src/UI/icons/attachIconSVG'
import { AddButton } from 'src/UI/AddButton/AddButton'
import { UploadFileSvg } from 'src/UI/icons/uploadFileSVG'

import styles from './index.module.scss'
import {
	useDeleteFileByIdMutation,
	useUploadFilesMutation,
} from 'src/store/uploadFiles/uploadFiles.api'
import { useParams } from 'react-router-dom'

type ReactDropzoneProps = {
	name: string
	accept?: Accept
	multiple?: boolean
	maxFiles?: number
	margin?: string
	prompt?: string
	className?: string
	dzAreaClassName?: string
	label?: string
	removeIcon?: ReactNode
	customUploadBtn?: ReactNode
	uploadBtnText?: string
	variant?: 'main' | 'text' | 'icons'
	previewVariant?: 'main' | 'text' | 'sm-img' | 'list' | 'icons'
	files?: FileItem[]
	fileType?: string
}

export const ReactDropzoneFiles: FC<ReactDropzoneProps> = ({
	className,
	dzAreaClassName,
	removeIcon,
	variant = 'main',
	previewVariant,
	name,
	accept,
	multiple = false,
	maxFiles = 1,
	customUploadBtn,
	uploadBtnText = 'Загрузить',
	prompt,
	label,
	margin,
	files = [],
	fileType = 'event',
}) => {
	const [currentFiles, setCurrentFiles] = useState<FileItem[]>(files ?? [])
	const [fileIds, setFileIds] = useState<string[]>([])

	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext()

	const [uploadFiles] = useUploadFilesMutation()
	const [deleteFileById] = useDeleteFileByIdMutation()

	const { id = '' } = useParams()

	const uploadFile = useCallback(
		async (file: File) => {
			try {
				const formData = new FormData()
				formData.append('itemfile', file)
				formData.append('filetype', fileType)
				formData.append('id_item', id)

				const response = await uploadFiles(formData).unwrap()
				if (response.status === 'ok') {
					const fileId = response.id_catfile
					return fileId
				} else {
					console.error('Upload failed:', response)
					return null
				}
			} catch (error) {
				console.error('Upload failed:', error)
				return null
			}
		},
		[uploadFiles, fileType],
	)

	const onDrop = useCallback(
		async (acceptedFiles: File[]) => {
			const newFiles: FileItem[] = []
			const uploadedFileIds: string[] = []

			for (const file of acceptedFiles) {
				try {
					const fileId = await uploadFile(file)
					if (fileId) {
						uploadedFileIds.push(fileId)
						const newFile = Object.assign(file, {
							id: fileId,
							url: URL.createObjectURL(file),
						})
						newFiles.push(newFile)
					}
				} catch (error) {
					console.error('File upload failed:', error)
				}
			}

			setCurrentFiles((prevFiles) => [...prevFiles, ...newFiles].slice(0, maxFiles))
			setFileIds((prevIds) => [...prevIds, ...uploadedFileIds].slice(0, maxFiles))
			setValue(name, newFiles)
		},
		[uploadFile, setValue, name, maxFiles],
	)

	const removeFile = useCallback(
		async (index: number) => {
			const fileIdToRemove = fileIds[index]
			try {
				if (fileIdToRemove) {
					await deleteFileById(fileIdToRemove).unwrap()
				}
				const newFiles = currentFiles.toSpliced(index, 1)
				const newImageIds = fileIds.toSpliced(index, 1)

				setCurrentFiles(newFiles)
				setFileIds(newImageIds)
				setValue(name, newFiles)
			} catch (error) {
				console.error('Delete failed:', error)
			}
		},
		[currentFiles, fileIds, deleteFileById, setValue, name],
	)

	const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
		onDrop,
		accept,
		multiple,
		maxFiles,
	})

	useEffect(() => {
		if (files && files.length > 0) {
			setCurrentFiles(files)
			const initialFilesIds = files.map((img) => img.id)
			setFileIds(initialFilesIds)
		}
	}, [files])

	useEffect(() => {
		return () => {
			currentFiles.forEach((file) => {
				if (file.url) URL.revokeObjectURL(file.url)
			})
		}
	}, [currentFiles])

	if (variant === 'text') {
		return (
			<div className={cn(styles.textFileUpload, className)} style={{ margin: margin ?? '' }}>
				{label && <label>{label}</label>}
				<input {...register(name)} {...getInputProps()} />
				<FilePreviewsFiles
					variant={previewVariant ?? 'text'}
					files={currentFiles}
					removeBtn={removeIcon ?? <RemoveTextFileSvg />}
					removeHandler={removeFile}
				/>
				{currentFiles.length < maxFiles && (
					<div className={styles.textFileController} onClick={open}>
						{customUploadBtn ?? <AddButton icon={<UploadFileSvg />}>{uploadBtnText}</AddButton>}
					</div>
				)}
				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	if (variant === 'icons') {
		return (
			<div className={cn(styles.reactDropzone, className)} style={{ margin: margin ?? '' }}>
				{label && <label>{label}</label>}
				<FilePreviewsFiles
					variant={previewVariant ?? 'main'}
					files={currentFiles}
					removeBtn={removeIcon ?? <RemovePhotoSvg />}
					removeHandler={removeFile}
				/>
				{currentFiles.length < maxFiles && (
					<div
						className={cn(dzAreaClassName, {
							[styles.activeArea]: isDragActive,
							[styles.dropzoneArea]: !customUploadBtn,
						})}
						{...getRootProps()}
					>
						<input {...register(name)} {...getInputProps()} />
						{customUploadBtn ?? (
							<>
								<span>Прикрепить файл</span>
								<p>
									{prompt ?? 'Перетащите файл на это поле'} <AttachIconSvg />
								</p>
							</>
						)}
					</div>
				)}
				{errors[name] && (
					<p className={styles.warningMessage}>
						<ErrorMessage errors={errors} name={name} />
					</p>
				)}
			</div>
		)
	}

	return (
		<div className={cn(styles.reactDropzone, className)} style={{ margin: margin ?? '' }}>
			{label && <label>{label}</label>}
			<FilePreviewsFiles
				variant={previewVariant ?? 'main'}
				files={currentFiles}
				removeBtn={removeIcon ?? <RemovePhotoSvg />}
				removeHandler={removeFile}
			/>
			{currentFiles.length < maxFiles && (
				<div
					className={cn(dzAreaClassName, {
						[styles.activeArea]: isDragActive,
						[styles.dropzoneArea]: !customUploadBtn,
					})}
					{...getRootProps()}
				>
					<input {...register(name)} {...getInputProps()} />
					{customUploadBtn ?? (
						<>
							<span>Прикрепить файл</span>
							<p>
								{prompt ?? 'Перетащите файл на это поле'} <AttachIconSvg />
							</p>
						</>
					)}
				</div>
			)}
			{errors[name] && (
				<p className={styles.warningMessage}>
					<ErrorMessage errors={errors} name={name} />
				</p>
			)}
		</div>
	)
}
