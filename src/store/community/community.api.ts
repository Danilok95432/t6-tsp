import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import {
	type HistoryCommunityResponse,
	type AboutCommunityResponse,
	type LocationCommunityResponse,
	type CultureCommunityResponse,
	type GameCommunityResponse,
	type NatureCommunityResponse,
} from 'src/types/community'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const communityApi = createApi({
	reducerPath: ReducerPath.Community,
	tagTypes: [
		'CommunityAbout',
		'CommunityHistory',
		'CommunityNature',
		'CommunityLocation',
		'CommunityCulture',
		'CommunityGame',
	],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAboutCommunity: build.query<AboutCommunityResponse, null>({
			query: () => ({
				url: `home/about/edit`,
			}),
			providesTags: ['CommunityAbout'],
		}),
		saveAboutCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/about/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityAbout'],
		}),
		getHistoryCommunity: build.query<HistoryCommunityResponse, null>({
			query: () => ({
				url: `home/history/edit`,
			}),
			providesTags: ['CommunityHistory'],
		}),
		saveHistoryCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/history/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityHistory'],
		}),
		getNatureCommunity: build.query<NatureCommunityResponse, null>({
			query: () => ({
				url: `home/nature/edit`,
			}),
			providesTags: ['CommunityNature'],
		}),
		saveNatureCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/nature/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityNature'],
		}),
		getLocationCommunity: build.query<LocationCommunityResponse, null>({
			query: () => ({
				url: `home/map/edit`,
			}),
			providesTags: ['CommunityLocation'],
		}),
		saveLocationCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/map/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityLocation'],
		}),
		getCultureCommunity: build.query<CultureCommunityResponse, null>({
			query: () => ({
				url: `about_etno/edit`,
			}),
			providesTags: ['CommunityCulture'],
		}),
		getEtnoListCommunity: build.query<CultureCommunityResponse, null>({
			query: () => ({
				url: `vids/list`,
			}),
			providesTags: ['CommunityCulture'],
		}),
		deleteCultureById: build.mutation<null, string>({
			query: (cultureId) => ({
				url: `vids/delete`,
				method: 'DELETE',
				body: { id: cultureId },
			}),
			invalidatesTags: ['CommunityCulture'],
		}),
		hideCultureById: build.mutation<null, string>({
			query: (cultureId) => ({
				url: `vids/hide`,
				method: 'POST',
				body: { id: cultureId },
			}),
			invalidatesTags: ['CommunityCulture'],
		}),
		saveCultureCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `about_etno/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityCulture'],
		}),
		getGameCommunity: build.query<GameCommunityResponse, null>({
			query: () => ({
				url: `about_vids/edit`,
			}),
			providesTags: ['CommunityGame'],
		}),
		deleteGameById: build.mutation<null, string>({
			query: (gameId) => ({
				url: `vids/delete`,
				method: 'DELETE',
				body: { id: gameId },
			}),
			invalidatesTags: ['CommunityGame'],
		}),
		hideGameById: build.mutation<null, string>({
			query: (gameId) => ({
				url: `vids/hide`,
				method: 'POST',
				body: { id: gameId },
			}),
			invalidatesTags: ['CommunityGame'],
		}),
		saveGameCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `about_vids/save`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['CommunityGame'],
		}),
	}),
})

export const {
	useGetAboutCommunityQuery,
	useSaveAboutCommunityMutation,
	useGetHistoryCommunityQuery,
	useSaveHistoryCommunityMutation,
	useGetNatureCommunityQuery,
	useSaveNatureCommunityMutation,
	useGetLocationCommunityQuery,
	useSaveLocationCommunityMutation,
	useGetEtnoListCommunityQuery,
	useGetCultureCommunityQuery,
	useHideCultureByIdMutation,
	useDeleteCultureByIdMutation,
	useSaveCultureCommunityMutation,
	useGetGameCommunityQuery,
	useDeleteGameByIdMutation,
	useHideGameByIdMutation,
	useSaveGameCommunityMutation,
} = communityApi
