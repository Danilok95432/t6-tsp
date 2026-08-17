import { type SettingsResponse, type PromoBlock } from 'src/types/site-settings'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { type FieldValues } from 'react-hook-form'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const siteSettingsApi = createApi({
	reducerPath: ReducerPath.SiteSettings,
	tagTypes: ['SiteSettings'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getPromos: build.query<PromoBlock[], null>({
			query: () => ({
				url: `promo-blocks`,
			}),
		}),
		getSettings: build.query<SettingsResponse, null>({
			query: () => ({
				url: `sitesettings/edit`,
			}),
		}),
		saveSettingsInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `sitesettings/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['SiteSettings'],
		}),
	}),
})

export const { useGetPromosQuery, useGetSettingsQuery, useSaveSettingsInfoMutation } =
	siteSettingsApi
