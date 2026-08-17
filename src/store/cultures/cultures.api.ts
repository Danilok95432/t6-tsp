import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { type CultureNewIdResponse, type CultureInfoResponse } from 'src/types/culture'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const culturesApi = createApi({
	reducerPath: ReducerPath.Culture,
	tagTypes: ['Culture', 'CultureInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getCultureInfo: build.query<CultureInfoResponse, string>({
			query: (id) => ({
				url: `/about_etno/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['CultureInfo'],
		}),
		getNewIdCulture: build.query<CultureNewIdResponse, null>({
			query: () => ({
				url: `home/tradition/getnew`,
			}),
			providesTags: ['CultureInfo', 'Culture'],
		}),
		saveCultureInfoCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/tradition/save_item`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CultureInfo'],
		}),
	}),
})

export const {
	useGetCultureInfoQuery,
	useSaveCultureInfoCommunityMutation,
	useGetNewIdCultureQuery,
} = culturesApi
