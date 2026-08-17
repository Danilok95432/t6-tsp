import {
	type PartnerInfoResponse,
	type PartnerNewIdResponse,
	type PartnersResponse,
} from 'src/types/partners'
import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'

export const partnersApi = createApi({
	reducerPath: ReducerPath.Partners,
	tagTypes: ['Partners', 'PartnerInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllPartners: build.query<
			PartnersResponse,
			{ title?: string; partnerVids?: string; partnerTypes?: string }
		>({
			query: ({ title = '', partnerVids = '', partnerTypes = '' }) => ({
				url: 'partners/list',
				params: {
					title,
					partner_vids: partnerVids,
					partner_types: partnerTypes,
				},
			}),
			providesTags: ['Partners'],
		}),
		getNewIdPartner: build.query<PartnerNewIdResponse, null>({
			query: () => ({
				url: `partners/getnew`,
			}),
			providesTags: ['Partners'],
		}),
		deletePartnerById: build.mutation<null, string>({
			query: (partnerId) => ({
				url: `partners/delete`,
				method: 'DELETE',
				body: { id: partnerId },
			}),
			invalidatesTags: ['Partners'],
		}),
		hidePartnerById: build.mutation<null, string>({
			query: (partnerId) => ({
				url: `partners/hide`,
				method: 'POST',
				body: { id: partnerId },
			}),
			invalidatesTags: ['Partners'],
		}),
		getPartnerInfo: build.query<PartnerInfoResponse, string>({
			query: (id) => ({
				url: `partners/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Partners', 'PartnerInfo'],
		}),
		savePartnerInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `partners/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Partners', 'PartnerInfo'],
		}),
	}),
})

export const {
	useGetAllPartnersQuery,
	useGetNewIdPartnerQuery,
	useSavePartnerInfoMutation,
	useGetPartnerInfoQuery,
	useDeletePartnerByIdMutation,
	useHidePartnerByIdMutation,
} = partnersApi
