import {
	type VideoResponse,
	type VideoItem,
	type VideoInfoResponse,
	type VideoNewIdResponse,
} from 'src/types/videos'
import { type FieldValues } from 'react-hook-form'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const videosApi = createApi({
	reducerPath: ReducerPath.Videos,
	tagTypes: ['Videos', 'VideoInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllVideos: build.query<
			VideoResponse,
			{ idEvent?: string; idObject?: string; title?: string; date?: string; tags?: string }
		>({
			query: ({ idEvent = '', idObject = '', title = '', date = '', tags = '' }) => ({
				url: `video/list`,
				params: {
					id_event: idEvent,
					id_object: idObject,
					title,
					date,
					tags,
				},
			}),
			providesTags: ['Videos'],
		}),
		deleteVideoById: build.mutation<null, string>({
			query: (videoId) => ({
				url: `video/delete`,
				method: 'DELETE',
				body: { id: videoId },
			}),
			invalidatesTags: ['Videos'],
		}),
		hideVideoById: build.mutation<null, string>({
			query: (videoId) => ({
				url: `video/hide`,
				method: 'POST',
				body: { id: videoId },
			}),
			invalidatesTags: ['Videos'],
		}),
		getVideoById: build.query<VideoItem, string>({
			query: (videoId) => ({
				url: `video/${videoId}`,
			}),
			providesTags: ['Videos'],
		}),
		getVideoInfo: build.query<VideoInfoResponse, string>({
			query: (id) => ({
				url: `video/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['VideoInfo'],
		}),
		saveVideoInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `video/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['VideoInfo', 'Videos'],
		}),
		getNewIdVideo: build.query<VideoNewIdResponse, { idEvent?: string; idObject?: string }>({
			query: ({ idEvent = '', idObject = '' }) => ({
				url: `video/getnew`,
				params: {
					id_event: idEvent,
					id_object: idObject,
				},
			}),
			providesTags: ['VideoInfo', 'Videos'],
		}),
	}),
})

export const {
	useGetAllVideosQuery,
	useGetVideoByIdQuery,
	useDeleteVideoByIdMutation,
	useHideVideoByIdMutation,
	useGetNewIdVideoQuery,
	useGetVideoInfoQuery,
	useSaveVideoInfoMutation,
} = videosApi
