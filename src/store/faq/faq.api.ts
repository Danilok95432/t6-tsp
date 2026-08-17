import { type FaqInfoResponse, type FaqNewIdResponse, type FaqResponse } from 'src/types/faq'
import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'

export const faqApi = createApi({
	reducerPath: ReducerPath.Faq,
	tagTypes: ['Faq', 'FaqInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllFaq: build.query<FaqResponse, { idEvent?: string }>({
			query: ({ idEvent }) => ({
				url: 'faq/list',
				params: {
					id_event: idEvent,
				},
			}),
			providesTags: ['Faq'],
		}),
		getNewIdFaq: build.query<FaqNewIdResponse, { idEvent?: string }>({
			query: ({ idEvent }) => ({
				url: `faq/getnew`,
				params: {
					id_event: idEvent,
				},
			}),
			providesTags: ['Faq'],
		}),
		deleteQuestionById: build.mutation<null, string>({
			query: (questionId) => ({
				url: `faq/delete`,
				method: 'DELETE',
				body: { id: questionId },
			}),
			invalidatesTags: ['Faq'],
		}),
		hideQuestionById: build.mutation<null, string>({
			query: (questionId) => ({
				url: `faq/hide`,
				method: 'POST',
				body: { id: questionId },
			}),
			invalidatesTags: ['Faq'],
		}),
		getQuestionInfo: build.query<FaqInfoResponse, string>({
			query: (id) => ({
				url: `faq/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Faq', 'FaqInfo'],
		}),
		saveQuestionInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `faq/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Faq', 'FaqInfo'],
		}),
	}),
})

export const {
	useGetAllFaqQuery,
	useGetNewIdFaqQuery,
	useHideQuestionByIdMutation,
	useDeleteQuestionByIdMutation,
	useSaveQuestionInfoMutation,
	useGetQuestionInfoQuery,
} = faqApi
