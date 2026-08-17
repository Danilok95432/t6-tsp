import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { type AuthResponse } from 'src/types/response'
import { baseQueryWithReauth } from 'src/helpers/base-query'
import {
	type MultiSelOption,
	type RoleSelOption,
	type SubEventOptions,
	type SelOption,
} from 'src/types/select'

export const authApi = createApi({
	reducerPath: 'auth/api',
	tagTypes: ['Auth'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		registrationUser: build.mutation<AuthResponse, FieldValues>({
			query: (formData) => ({
				url: '/registration',
				method: 'POST',
				body: formData,
			}),
		}),
		loginUser: build.mutation<AuthResponse, FieldValues>({
			query: (formData) => ({
				url: '/auth',
				method: 'POST',
				body: formData,
			}),
		}),
		logoutUser: build.mutation({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
		}),
		checkAuth: build.query<AuthResponse, null>({
			query: () => ({
				url: '/refresh',
			}),
		}),
		getRegistrationCode: build.mutation<{ status: string; errortext?: string }, string>({
			query: (phone) => ({
				url: 'https://etnosportapi.npotau.ru/registration/getcode',
				method: 'GET',
				params: {
					phone,
				},
			}),
		}),
		checkRegistrationCode: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => ({
				url: 'https://etnosportapi.npotau.ru/registration/checkcode',
				method: 'POST',
				body: formData,
			}),
		}),
		sendRegistrationForm: build.mutation<{ status: string; errortext: string }, FieldValues>({
			query: (formData) => ({
				url: 'https://etnosportapi.npotau.ru/registration/register',
				method: 'POST',
				body: formData,
			}),
		}),
		// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
		sendRegistrationGuestForm: build.mutation<void, FieldValues>({
			query: (formData) => ({
				url: 'https://etnosportapi.npotau.ru/registration/guest_register',
				method: 'POST',
				body: formData,
			}),
		}),
		getRegionsByValue: build.query<{ regions: SelOption[] }, string>({
			query: (value) => ({
				url: 'https://etnosportapi.npotau.ru/registration/getregions',
				method: 'GET',
				params: {
					value,
				},
			}),
		}),
		getCityByRegion: build.query<{ citys: SelOption[] }, { region: string; city: string }>({
			query: ({ region, city }) => ({
				url: 'https://etnosportapi.npotau.ru/registration/getcitys',
				method: 'GET',
				params: {
					region,
					city,
				},
			}),
		}),
		getInfoRegistation: build.query<
			{
				car_types: SelOption[]
				lager_types: SelOption[]
				dates: SelOption[]
				guest_group_types?: SelOption[]
				etnosport?: MultiSelOption[]
				zabavy?: MultiSelOption[]
				event_roles?: RoleSelOption[]
				sub_events?: SubEventOptions[]
			},
			string
		>({
			query: (id) => ({
				url: 'https://etnosportapi.npotau.ru/registration/getinfo',
				method: 'GET',
				params: {
					id_event: id,
				},
			}),
		}),
	}),
})
export const {
	useLoginUserMutation,
	useRegistrationUserMutation,
	useLogoutUserMutation,
	useLazyCheckAuthQuery,
	useGetCityByRegionQuery,
	useGetInfoRegistationQuery,
	useGetRegionsByValueQuery,
	useGetRegistrationCodeMutation,
	useCheckRegistrationCodeMutation,
	useCheckAuthQuery,
	useSendRegistrationFormMutation,
	useSendRegistrationGuestFormMutation,
} = authApi
