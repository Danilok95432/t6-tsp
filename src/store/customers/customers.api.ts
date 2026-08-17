import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import {
	type CustomerInfoResponse,
	type CustomerNewIdResponse,
	type CustomerResponse,
} from 'src/types/customers'

export const customerApi = createApi({
	reducerPath: ReducerPath.Customers,
	tagTypes: ['Customers', 'CustomerInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllCustomers: build.query<
			CustomerResponse,
			{ customer?: string; phone?: string; date?: string; limit?: number; page?: number }
		>({
			query: ({ customer, phone, date, limit, page }) => ({
				url: 'siteusers/list',
				params: {
					customer,
					phone,
					date,
					limit,
					page,
				},
			}),
			providesTags: ['Customers'],
		}),
		getNewIdCustomer: build.query<CustomerNewIdResponse, null>({
			query: () => ({
				url: `siteusers/getnew`,
			}),
			providesTags: ['Customers'],
		}),
		deleteCustomerById: build.mutation<null, string>({
			query: (customerId) => ({
				url: `siteusers/delete`,
				method: 'DELETE',
				body: { id: customerId },
			}),
			invalidatesTags: ['Customers'],
		}),
		getCustomerInfo: build.query<CustomerInfoResponse, string>({
			query: (id) => ({
				url: `siteusers/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Customers', 'CustomerInfo'],
		}),
		saveCustomerInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `siteusers/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Customers', 'CustomerInfo'],
		}),
	}),
})

export const {
	useGetAllCustomersQuery,
	useDeleteCustomerByIdMutation,
	useGetCustomerInfoQuery,
	useGetNewIdCustomerQuery,
	useSaveCustomerInfoMutation,
} = customerApi
