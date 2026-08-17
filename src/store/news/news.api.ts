import {
	type NewsResponse,
	type NewsItem,
	type NewsInfoResponse,
	type NewsNewIdResponse,
} from 'src/types/news'
import { type FieldValues } from 'react-hook-form'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const newsApi = createApi({
	reducerPath: ReducerPath.News,
	tagTypes: ['News', 'NewsInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllNews: build.query<
			NewsResponse,
			{ idEvent?: string; idObject?: string; title?: string; date?: string; tags?: string }
		>({
			query: ({ idEvent = '', idObject = '', title = '', date = '', tags = '' }) => ({
				url: `news/list`,
				params: {
					id_event: idEvent,
					id_object: idObject,
					title,
					date,
					tags,
				},
			}),
			providesTags: ['News'],
		}),
		deleteNewsById: build.mutation<null, string>({
			query: (newsId) => ({
				url: `news/delete`,
				method: 'DELETE',
				body: { id: newsId },
			}),
			invalidatesTags: ['News'],
		}),
		hideNewsById: build.mutation<null, string>({
			query: (newsId) => ({
				url: `news/hide`,
				method: 'POST',
				body: { id: newsId },
			}),
			invalidatesTags: ['News'],
		}),
		getNewsById: build.query<NewsItem, string>({
			query: (newsId) => ({
				url: `news/${newsId}`,
			}),
			providesTags: ['News'],
		}),
		getNewsInfo: build.query<NewsInfoResponse, string>({
			query: (id) => ({
				url: `news/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['NewsInfo'],
		}),
		saveNewsInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `news/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['NewsInfo', 'News'],
		}),
		getNewIdNews: build.query<NewsNewIdResponse, { idEvent?: string; idObject?: string }>({
			query: ({ idEvent = '', idObject = '' }) => ({
				url: `news/getnew`,
				params: {
					id_event: idEvent,
					id_object: idObject,
				},
			}),
			providesTags: ['NewsInfo', 'News'],
		}),
	}),
})

export const {
	useGetAllNewsQuery,
	useGetNewsByIdQuery,
	useDeleteNewsByIdMutation,
	useHideNewsByIdMutation,
	useGetNewsInfoQuery,
	useSaveNewsInfoMutation,
	useGetNewIdNewsQuery,
} = newsApi
