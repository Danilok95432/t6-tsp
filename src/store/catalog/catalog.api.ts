import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import {
	type CategoryInfoResponse,
	type CategoryNewIdResponse,
	type CategoryResponse,
	type GoodsInfoResponse,
	type GoodsNewIdResponse,
	type GoodsResponse,
	type MakerInfoResponse,
	type MakerNewIdResponse,
	type MakerResponse,
	type TypeInfoResponse,
	type TypeNewIdResponse,
	type TypeResponse,
} from 'src/types/catalogTypes'

export const catalogApi = createApi({
	reducerPath: ReducerPath.Catalog,
	tagTypes: [
		'Catalog',
		'Types',
		'TypeInfo',
		'Makers',
		'MakerInfo',
		'Categories',
		'CategoryInfo',
		'Goods',
		'GoodsInfo',
	],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllTypes: build.query<TypeResponse, { category?: string; title?: string; date?: string }>({
			query: ({ category, title, date }) => ({
				url: 'catalog_types/list',
				params: {
					category,
					title,
					date,
				},
			}),
			providesTags: ['Types'],
		}),
		getNewIdType: build.query<TypeNewIdResponse, null>({
			query: () => ({
				url: `catalog_types/getnew`,
			}),
			providesTags: ['Types'],
		}),
		deleteTypeById: build.mutation<null, string>({
			query: (typeId) => ({
				url: `catalog_types/delete`,
				method: 'DELETE',
				body: { id: typeId },
			}),
			invalidatesTags: ['Types'],
		}),
		getTypeInfo: build.query<TypeInfoResponse, string>({
			query: (id) => ({
				url: `catalog_types/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Types', 'TypeInfo'],
		}),
		saveTypeInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `catalog_types/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Types', 'TypeInfo'],
		}),
		getAllMakers: build.query<
			MakerResponse,
			{ title?: string; country?: string; urlMaker?: string; types?: string }
		>({
			query: ({ title, country, urlMaker, types }) => ({
				url: 'brands/list',
				params: {
					title,
					country,
					urlMaker,
					types,
				},
			}),
			providesTags: ['Makers'],
		}),
		getNewIdMaker: build.query<MakerNewIdResponse, null>({
			query: () => ({
				url: `brands/getnew`,
			}),
			providesTags: ['Makers'],
		}),
		deleteMakerById: build.mutation<null, string>({
			query: (makerId) => ({
				url: `brands/delete`,
				method: 'DELETE',
				body: { id: makerId },
			}),
			invalidatesTags: ['Makers'],
		}),
		getMakerInfo: build.query<MakerInfoResponse, string>({
			query: (id) => ({
				url: `brands/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Makers', 'MakerInfo'],
		}),
		saveMakerInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `brands/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Makers', 'MakerInfo'],
		}),
		getAllCategories: build.query<CategoryResponse, null>({
			query: () => ({
				url: 'catalog_content/list',
			}),
			providesTags: ['Categories'],
		}),
		getNewIdCategory: build.query<CategoryNewIdResponse, null>({
			query: () => ({
				url: `catalog_content/getnew`,
			}),
			providesTags: ['Categories'],
		}),
		deleteCategoryById: build.mutation<null, string>({
			query: (categoryId) => ({
				url: `catalog_content/delete`,
				method: 'DELETE',
				body: { id: categoryId },
			}),
			invalidatesTags: ['Categories'],
		}),
		getCategoryInfo: build.query<CategoryInfoResponse, string>({
			query: (id) => ({
				url: `catalog_content/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Categories', 'CategoryInfo'],
		}),
		saveCategoryInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `catalog_content/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Categories', 'CategoryInfo'],
		}),
		getAllGoods: build.query<GoodsResponse, { title?: string; limit?: number; page?: number }>({
			query: ({ title, limit, page }) => ({
				url: 'catalog_items/list',
				params: {
					title,
					limit,
					page,
				},
			}),
			providesTags: ['Goods'],
		}),
		getNewIdGoods: build.query<GoodsNewIdResponse, null>({
			query: () => ({
				url: `catalog_items/getnew`,
			}),
			providesTags: ['Goods'],
		}),
		deleteGoodsById: build.mutation<null, string>({
			query: (goodsId) => ({
				url: `catalog_items/delete`,
				method: 'DELETE',
				body: { id: goodsId },
			}),
			invalidatesTags: ['Goods'],
		}),
		getGoodsInfo: build.query<GoodsInfoResponse, string>({
			query: (id) => ({
				url: `catalog_items/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Goods', 'GoodsInfo'],
		}),
		saveGoodsInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `catalog_items/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Goods', 'GoodsInfo'],
		}),
	}),
})

export const {
	useGetAllTypesQuery,
	useGetNewIdTypeQuery,
	useDeleteTypeByIdMutation,
	useGetTypeInfoQuery,
	useSaveTypeInfoMutation,
	useGetAllMakersQuery,
	useDeleteMakerByIdMutation,
	useGetMakerInfoQuery,
	useGetNewIdMakerQuery,
	useSaveMakerInfoMutation,
	useGetAllCategoriesQuery,
	useDeleteCategoryByIdMutation,
	useGetCategoryInfoQuery,
	useGetNewIdCategoryQuery,
	useSaveCategoryInfoMutation,
	useDeleteGoodsByIdMutation,
	useGetAllGoodsQuery,
	useGetGoodsInfoQuery,
	useGetNewIdGoodsQuery,
	useSaveGoodsInfoMutation,
} = catalogApi
