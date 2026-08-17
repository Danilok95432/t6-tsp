import {
	type RequestResponse,
	type RequestItem,
	type RequestNewIdResponse,
	type RequestInfoResponse,
} from 'src/types/requests'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import { type FieldValues } from 'react-hook-form'

export const requestsApi = createApi({
	reducerPath: ReducerPath.Requests,
	tagTypes: ['Requests', 'RequestInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllRequests: build.query<RequestResponse, { title?: string; date?: string }>({
			query: ({ title = '', date = '' }) => ({
				url: `requests/list`,
				params: {
					title,
					date,
				},
			}),
			providesTags: ['Requests'],
		}),
		deleteRequestById: build.mutation<null, string>({
			query: (requestId) => ({
				url: `requests/delete`,
				method: 'DELETE',
				body: { id: requestId },
			}),
			invalidatesTags: ['Requests'],
		}),
		hideRequestById: build.mutation<null, string>({
			query: (requestId) => ({
				url: `requests/hide`,
				method: 'POST',
				body: { id: requestId },
			}),
			invalidatesTags: ['Requests'],
		}),
		getRequestById: build.query<RequestItem, string>({
			query: (requestId) => ({
				url: `requests/${requestId}`,
			}),
			providesTags: ['Requests'],
		}),
		getNewRequestInfo: build.query<RequestInfoResponse, string>({
			query: (id) => ({
				url: `requests/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['RequestInfo'],
		}),
		getRequestInfo: build.query<RequestInfoResponse, string>({
			query: (id) => ({
				url: `requests/view`,
				params: {
					id,
				},
			}),
			providesTags: ['RequestInfo'],
		}),
		saveRequestInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `requests/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['RequestInfo', 'Requests'],
		}),
		getNewIdRequest: build.query<RequestNewIdResponse, null>({
			query: () => ({
				url: `requests/getnew`,
			}),
			providesTags: ['RequestInfo', 'Requests'],
		}),
	}),
})

export const {
	useGetAllRequestsQuery,
	useGetRequestByIdQuery,
	useDeleteRequestByIdMutation,
	useSaveRequestInfoMutation,
	useHideRequestByIdMutation,
	useGetNewIdRequestQuery,
	useGetRequestInfoQuery,
	useGetNewRequestInfoQuery,
} = requestsApi
