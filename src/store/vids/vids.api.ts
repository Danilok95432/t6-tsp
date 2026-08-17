import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import {
	type VidItemInfoResponse,
	type VidNewItemResponse,
	type EtnosportResponse,
	type FunResponse,
	type VidListResponse,
	type AboutVids,
} from 'src/types/about-etnosport'

export const vidsApi = createApi({
	reducerPath: ReducerPath.Vids,
	tagTypes: ['Vids', 'VidsInfo', 'Etnosport', 'Fun', 'About'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getVidsList: build.query<VidListResponse, null>({
			query: () => ({
				url: `/vids/list`,
			}),
			providesTags: ['Vids'],
		}),
		getAboutEdit: build.query<AboutVids, null>({
			query: () => ({
				url: `/about/edit`,
			}),
			providesTags: ['About'],
		}),
		saveAbout: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/about/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['About'],
		}),
		getEtnoEdit: build.query<EtnosportResponse, null>({
			query: () => ({
				url: `/about_etno/edit`,
			}),
			providesTags: ['Etnosport'],
		}),
		getFunEdit: build.query<FunResponse, null>({
			query: () => ({
				url: `/about_vids/edit`,
			}),
			providesTags: ['Fun'],
		}),
		saveEtnosport: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/about_etno/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Etnosport'],
		}),
		saveFun: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `/about_vids/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['Fun'],
		}),
		deleteVidById: build.mutation<null, string>({
			query: (vidId) => ({
				url: `vids/delete`,
				method: 'DELETE',
				body: { id: vidId },
			}),
			invalidatesTags: ['Vids'],
		}),
		hideVidById: build.mutation<null, string>({
			query: (vidId) => ({
				url: `vids/hide`,
				method: 'POST',
				body: { id: vidId },
			}),
			invalidatesTags: ['Vids'],
		}),
		getVidInfo: build.query<VidItemInfoResponse, string>({
			query: (id) => ({
				url: `vids/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['VidsInfo'],
		}),
		getNewIdVid: build.query<VidNewItemResponse, null>({
			query: () => ({
				url: `vids/getnew`,
			}),
			providesTags: ['VidsInfo', 'Vids'],
		}),
		saveVidInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `vids/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['VidsInfo', 'Vids', 'Etnosport', 'Fun'],
		}),
	}),
})

export const {
	useGetVidsListQuery,
	useDeleteVidByIdMutation,
	useGetAboutEditQuery,
	useGetEtnoEditQuery,
	useGetFunEditQuery,
	useGetNewIdVidQuery,
	useGetVidInfoQuery,
	useHideVidByIdMutation,
	useSaveAboutMutation,
	useSaveEtnosportMutation,
	useSaveFunMutation,
	useSaveVidInfoMutation,
} = vidsApi
