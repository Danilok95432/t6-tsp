import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import { type FieldValues } from 'react-hook-form'
import {
	type FileNewIdResponse,
	type FileInfoResponse,
	type FileUploadRespone,
} from 'src/types/files'

export const uploadFilesApi = createApi({
	reducerPath: ReducerPath.UploadFiles,
	tagTypes: ['FileUpload', 'FileDelete', 'FileInfo', 'CommunityAbout'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getUploadedFile: build.query<FileInfoResponse, string>({
			query: (id) => ({
				url: `files/getinfo`,
				params: {
					id,
				},
			}),
			providesTags: ['FileUpload', 'FileInfo'],
		}),
		saveUploadedFileInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `files/saveinfo`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['FileInfo', 'FileUpload'],
		}),
		getNewIdFile: build.query<FileNewIdResponse, { filetype?: string; idItem?: string }>({
			query: ({ filetype = '', idItem = '' }) => ({
				url: `files/getnew`,
				params: {
					filetype,
					id_item: idItem,
				},
			}),
			providesTags: ['FileInfo', 'FileUpload'],
		}),
		uploadFiles: build.mutation<FileUploadRespone, FieldValues>({
			query: (formData) => ({
				url: `files/upload`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['FileUpload'],
		}),
		deleteFileById: build.mutation<null, string>({
			query: (fileId) => ({
				url: `files/delete`,
				method: 'DELETE',
				body: { id: fileId },
			}),
			invalidatesTags: ['FileDelete'],
		}),
	}),
})

export const {
	useUploadFilesMutation,
	useDeleteFileByIdMutation,
	useGetUploadedFileQuery,
	useSaveUploadedFileInfoMutation,
	useGetNewIdFileQuery,
	useLazyGetNewIdFileQuery,
} = uploadFilesApi
