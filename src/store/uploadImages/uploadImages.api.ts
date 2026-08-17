import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import { type FieldValues } from 'react-hook-form'
import {
	type ImageNewIdResponse,
	type ImageInfoResponse,
	type ImageUploadResponse,
} from 'src/types/photos'

export const uploadImagesApi = createApi({
	reducerPath: ReducerPath.UploadImages,
	tagTypes: ['ImageUpload', 'ImageDelete', 'ImageInfo', 'CommunityAbout'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getUploadedImage: build.query<ImageInfoResponse, string>({
			query: (id) => ({
				url: `images/getinfo`,
				params: {
					id,
				},
			}),
			providesTags: ['ImageUpload', 'ImageInfo'],
		}),
		saveUploadedImageInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `images/saveinfo`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['ImageInfo', 'ImageUpload'],
		}),
		getNewIdImage: build.query<ImageNewIdResponse, { imgtype?: string; idItem?: string }>({
			query: ({ imgtype = '', idItem = '' }) => ({
				url: `images/getnew`,
				params: {
					imgtype,
					id_item: idItem,
				},
			}),
			providesTags: ['ImageInfo', 'ImageUpload'],
		}),
		uploadImages: build.mutation<ImageUploadResponse, FieldValues>({
			query: (formData) => ({
				url: `images/upload`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['ImageUpload'],
		}),
		deleteImageById: build.mutation<null, string>({
			query: (imageId) => ({
				url: `images/delete`,
				method: 'DELETE',
				body: { id: imageId },
			}),
			invalidatesTags: ['ImageDelete'],
		}),
	}),
})

export const {
	useUploadImagesMutation,
	useDeleteImageByIdMutation,
	useGetUploadedImageQuery,
	useSaveUploadedImageInfoMutation,
	useGetNewIdImageQuery,
} = uploadImagesApi
