import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import {
	type AdRewardListResponse,
	type AdPromoInfoResponse,
	type AdReklamaInfoResponse,
	type AdRewardInfoResponse,
	type PageInfoInfoResponse,
	type PageInfoNewIdResponse,
	type PageInfoResponse,
	type AwardInfoResponse,
	type ReviewsListResponse,
	type ReviewItemInfoResponse,
} from 'src/types/marketing'

export const marketingApi = createApi({
	reducerPath: ReducerPath.Marketing,
	tagTypes: ['Marketing', 'MainInfo', 'Reward', 'Ad', 'Promo', 'Review'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllPagesInfo: build.query<PageInfoResponse, { pageName?: string }>({
			query: ({ pageName }) => ({
				url: 'pages/list',
				params: {
					pageName,
				},
			}),
			providesTags: ['MainInfo'],
		}),
		getNewIdPageInfo: build.query<PageInfoNewIdResponse, null>({
			query: () => ({
				url: `pages/getnew`,
			}),
			providesTags: ['MainInfo'],
		}),
		hidePageInfoById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `pages/hide`,
				method: 'POST',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['MainInfo'],
		}),
		deletePageInfoById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `pages/delete`,
				method: 'DELETE',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['MainInfo'],
		}),
		getPageInfoInfo: build.query<PageInfoInfoResponse, string>({
			query: (id) => ({
				url: `pages/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['MainInfo'],
		}),
		savePageInfoInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `pages/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['MainInfo'],
		}),
		getAdPromoInfo: build.query<AdPromoInfoResponse, null>({
			query: () => ({
				url: `promo/edit`,
			}),
			providesTags: ['Promo'],
		}),
		saveAdPromoInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `promo/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Promo'],
		}),
		getAdReklamaInfo: build.query<AdReklamaInfoResponse, null>({
			query: () => ({
				url: `adv/edit`,
			}),
			providesTags: ['Ad'],
		}),
		saveAdReklamaInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `adv/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Ad'],
		}),
		getAdRewardInfo: build.query<AdRewardInfoResponse, null>({
			query: () => ({
				url: `awards/edit`,
			}),
			providesTags: ['Reward'],
		}),
		saveAdRewardInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `awards/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Reward'],
		}),
		getAwardInfo: build.query<AwardInfoResponse, string>({
			query: (id) => ({
				url: `awards/edit_item`,
				params: {
					id,
				},
			}),
			providesTags: ['Reward'],
		}),
		saveAwardInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `awards/save_item`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Reward'],
		}),
		getAllAwards: build.query<AdRewardListResponse, { title?: string }>({
			query: (title) => ({
				url: 'awards/list',
				params: {
					title,
				},
			}),
			providesTags: ['Reward'],
		}),
		getNewIdAward: build.query<PageInfoNewIdResponse, null>({
			query: () => ({
				url: `awards/getnew`,
			}),
			providesTags: ['Reward'],
		}),
		hideAwardById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `awards/hide_item`,
				method: 'POST',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['Reward'],
		}),
		deleteAwardById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `awards/delete_item`,
				method: 'DELETE',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['Reward'],
		}),
		getAllReviews: build.query<ReviewsListResponse, { title?: string }>({
			query: ({ title }) => ({
				url: 'reviews/list',
				params: {
					title,
				},
			}),
			providesTags: ['Review'],
		}),
		getNewIdReview: build.query<PageInfoNewIdResponse, null>({
			query: () => ({
				url: `reviews/getnew`,
			}),
			providesTags: ['Review'],
		}),
		hideReviewById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `reviews/hide`,
				method: 'POST',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['Review'],
		}),
		deleteReviewById: build.mutation<null, string>({
			query: (pageInfoId) => ({
				url: `reviews/delete`,
				method: 'DELETE',
				body: { id: pageInfoId },
			}),
			invalidatesTags: ['Review'],
		}),
		getReviewInfo: build.query<ReviewItemInfoResponse, string>({
			query: (id) => ({
				url: `reviews/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Review'],
		}),
		saveReviewInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `reviews/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Review'],
		}),
	}),
})

export const {
	useDeletePageInfoByIdMutation,
	useGetAllPagesInfoQuery,
	useGetNewIdPageInfoQuery,
	useHidePageInfoByIdMutation,
	useGetPageInfoInfoQuery,
	useSavePageInfoInfoMutation,
	useGetAdPromoInfoQuery,
	useGetAdReklamaInfoQuery,
	useGetAdRewardInfoQuery,
	useSaveAdPromoInfoMutation,
	useSaveAdReklamaInfoMutation,
	useSaveAdRewardInfoMutation,
	useDeleteAwardByIdMutation,
	useGetAllAwardsQuery,
	useGetNewIdAwardQuery,
	useHideAwardByIdMutation,
	useGetAwardInfoQuery,
	useSaveAwardInfoMutation,
	useGetAllReviewsQuery,
	useDeleteReviewByIdMutation,
	useGetNewIdReviewQuery,
	useGetReviewInfoQuery,
	useHideReviewByIdMutation,
	useSaveReviewInfoMutation,
} = marketingApi
