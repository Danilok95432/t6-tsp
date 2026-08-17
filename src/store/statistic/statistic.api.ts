import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import { type LogServicesResponse, type LogEntersResponse } from 'src/types/statistic'

export const statisticApi = createApi({
	reducerPath: ReducerPath.Statistic,
	tagTypes: ['LogEnter', 'LogService'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllLogsEnter: build.query<
			LogEntersResponse,
			{ id?: string; limit?: number; page?: number; surname?: string; telphone?: string }
		>({
			query: ({ id, surname, telphone, limit, page }) => ({
				url: 'events/log_enter',
				params: {
					id_event: id,
					surname,
					telphone,
					limit,
					page,
				},
			}),
			providesTags: ['LogEnter'],
		}),
		getAllLogsService: build.query<
			LogServicesResponse,
			{ id?: string; limit?: number; page?: number; surname?: string; telphone?: string }
		>({
			query: ({ id, surname, telphone, limit, page }) => ({
				url: 'events/log_service',
				params: {
					id_event: id,
					surname,
					telphone,
					limit,
					page,
				},
			}),
			providesTags: ['LogService'],
		}),
	}),
})

export const { useGetAllLogsEnterQuery, useGetAllLogsServiceQuery } = statisticApi
