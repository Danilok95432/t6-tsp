import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import { type GoodsInfoResponse } from 'src/types/catalogTypes'
import {
	type SolutionLevelResponse,
	type SolutionProjectsResponse,
	type SolutionCategoryResponse,
	type SolutionInfoResponse,
	type SolutionsNewIdResponse,
	type SolutionOneItem,
	type SolutionProjectInfo,
} from 'src/types/solutions-types'

export const solutionsApi = createApi({
	reducerPath: ReducerPath.Solutions,
	tagTypes: [
		'Solutions',
		'SolutionsInfo',
		'SolCategory',
		'SolCategoryInfo',
		'SolLevel',
		'SolLevelInfo',
		'SolProjects',
		'SolProjectInfo',
	],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllSolutions: build.query<
			SolutionInfoResponse,
			{ title?: string; limit?: number; page?: number }
		>({
			query: ({ title, limit, page }) => ({
				url: 'solutions/list',
				params: {
					title,
					limit,
					page,
				},
			}),
			providesTags: ['Solutions'],
		}),
		getNewIdSolution: build.query<SolutionsNewIdResponse, null>({
			query: () => ({
				url: `solutions/getnew`,
			}),
			providesTags: ['Solutions'],
		}),
		deleteSolutionById: build.mutation<null, string>({
			query: (solutionId) => ({
				url: `solutions/delete`,
				method: 'DELETE',
				body: { id: solutionId },
			}),
			invalidatesTags: ['Solutions'],
		}),
		hideSolutionById: build.mutation<null, string>({
			query: (solutionId) => ({
				url: `solutions/hide`,
				method: 'POST',
				body: { id: solutionId },
			}),
			invalidatesTags: ['Solutions'],
		}),
		getSolutionInfo: build.query<SolutionOneItem, string>({
			query: (id) => ({
				url: `solutions/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Solutions', 'SolutionsInfo'],
		}),
		saveSolutionInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `solutions/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Solutions', 'SolutionsInfo'],
		}),
		getAllSolCategories: build.query<
			SolutionCategoryResponse,
			{ title?: string; limit?: number; page?: number }
		>({
			query: ({ title, limit, page }) => ({
				url: 'solutions_categories/list',
				params: {
					title,
					limit,
					page,
				},
			}),
			providesTags: ['SolCategory'],
		}),
		getNewIdSolCategory: build.query<SolutionsNewIdResponse, null>({
			query: () => ({
				url: `solutions_categories/getnew`,
			}),
			providesTags: ['SolCategory'],
		}),
		deleteSolCategoryById: build.mutation<null, string>({
			query: (solutionId) => ({
				url: `solutions_categories/delete`,
				method: 'DELETE',
				body: { id: solutionId },
			}),
			invalidatesTags: ['SolCategory'],
		}),
		getSolCategoryInfo: build.query<GoodsInfoResponse, string>({
			query: (id) => ({
				url: `solutions_categories/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['SolCategory', 'SolCategoryInfo'],
		}),
		saveSolCategoryInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `solutions_categories/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['SolCategory', 'SolCategoryInfo'],
		}),
		getAllSolLevels: build.query<
			SolutionLevelResponse,
			{ title?: string; limit?: number; page?: number }
		>({
			query: ({ title, limit, page }) => ({
				url: 'solutions_levels/list',
				params: {
					title,
					limit,
					page,
				},
			}),
			providesTags: ['SolLevel'],
		}),
		getNewIdSolLevel: build.query<SolutionsNewIdResponse, null>({
			query: () => ({
				url: `solutions_levels/getnew`,
			}),
			providesTags: ['SolLevel'],
		}),
		deleteSolLevelById: build.mutation<null, string>({
			query: (solutionId) => ({
				url: `solutions_levels/delete`,
				method: 'DELETE',
				body: { id: solutionId },
			}),
			invalidatesTags: ['SolLevel'],
		}),
		getSolLevelInfo: build.query<GoodsInfoResponse, string>({
			query: (id) => ({
				url: `solutions_levels/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['SolLevel', 'SolLevelInfo'],
		}),
		saveSolLevelInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `solutions_levels/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['SolLevel', 'SolLevelInfo'],
		}),
		getAllSolProjects: build.query<
			SolutionProjectsResponse,
			{ title?: string; limit?: number; page?: number }
		>({
			query: ({ title, limit, page }) => ({
				url: 'solutions_projects/list',
				params: {
					title,
					limit,
					page,
				},
			}),
			providesTags: ['SolProjects'],
		}),
		getNewIdSolProject: build.query<SolutionsNewIdResponse, null>({
			query: () => ({
				url: `solutions_projects/getnew`,
			}),
			providesTags: ['SolProjects'],
		}),
		deleteSolProjectById: build.mutation<null, string>({
			query: (solutionId) => ({
				url: `solutions_projects/delete`,
				method: 'DELETE',
				body: { id: solutionId },
			}),
			invalidatesTags: ['SolProjects'],
		}),
		getSolProjectInfo: build.query<SolutionProjectInfo, string>({
			query: (id) => ({
				url: `solutions_projects/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['SolProjects', 'SolProjectInfo'],
		}),
		saveSolProjectInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `solutions_projects/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['SolProjects', 'SolProjectInfo'],
		}),
	}),
})

export const {
	useDeleteSolutionByIdMutation,
	useGetAllSolutionsQuery,
	useGetNewIdSolutionQuery,
	useGetSolutionInfoQuery,
	useSaveSolutionInfoMutation,
	useHideSolutionByIdMutation,
	// <----------------->
	useDeleteSolCategoryByIdMutation,
	useGetAllSolCategoriesQuery,
	useGetNewIdSolCategoryQuery,
	useGetSolCategoryInfoQuery,
	useSaveSolCategoryInfoMutation,
	// <----------------->
	useDeleteSolLevelByIdMutation,
	useGetAllSolLevelsQuery,
	useGetNewIdSolLevelQuery,
	useGetSolLevelInfoQuery,
	useSaveSolLevelInfoMutation,
	// <----------------->
	useDeleteSolProjectByIdMutation,
	useGetAllSolProjectsQuery,
	useGetNewIdSolProjectQuery,
	useGetSolProjectInfoQuery,
	useSaveSolProjectInfoMutation,
} = solutionsApi
