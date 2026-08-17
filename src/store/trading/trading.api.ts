import { type FieldValues } from 'react-hook-form'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from 'src/helpers/base-query'

import { ReducerPath } from 'src/helpers/consts'
import {
	type CitysResponse,
	type OrderInfoResponse,
	type OrderNewIdResponse,
	type OrderResponse,
	type RefundInfoResponse,
	type RefundNewIdResponse,
	type RefundResponse,
	type SaleInfoResponse,
	type SaleNewIdResponse,
	type SalesResponse,
} from 'src/types/trading'

export const tradingApi = createApi({
	reducerPath: ReducerPath.Trading,
	tagTypes: ['Trading', 'Orders', 'Refunds', 'Sales', 'OrderInfo', 'SaleInfo', 'RefundInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllOrders: build.query<
			OrderResponse,
			{
				source?: string
				customer?: string
				phone?: string
				date?: string
				limit?: number
				page?: number
			}
		>({
			query: ({ source, customer, phone, date, limit, page }) => ({
				url: 'orders/list',
				params: {
					source,
					customer,
					phone,
					date,
					limit,
					page,
				},
			}),
			providesTags: ['Orders'],
		}),
		getAllDeletedOrders: build.query<
			OrderResponse,
			{
				source?: string
				customer?: string
				phone?: string
				date?: string
				limit?: number
				page?: number
			}
		>({
			query: ({ source, customer, phone, date, limit, page }) => ({
				url: 'orders/list_deleted',
				params: {
					source,
					customer,
					phone,
					date,
					limit,
					page,
				},
			}),
			providesTags: ['Orders'],
		}),
		getNewIdOrder: build.query<OrderNewIdResponse, null>({
			query: () => ({
				url: `orders/getnew`,
			}),
			providesTags: ['Orders'],
		}),
		deleteOrderById: build.mutation<null, string>({
			query: (orderId) => ({
				url: `orders/delete`,
				method: 'DELETE',
				body: { id: orderId },
			}),
			invalidatesTags: ['Orders'],
		}),
		getOrderInfo: build.query<OrderInfoResponse, string>({
			query: (id) => ({
				url: `orders/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Orders', 'OrderInfo'],
		}),
		saveOrderInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `orders/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Orders', 'OrderInfo'],
		}),
		getAllSales: build.query<
			SalesResponse,
			{ customer?: string; phone?: string; dateOrder?: string; dateSale?: string }
		>({
			query: ({ customer, phone, dateOrder, dateSale }) => ({
				url: 'sales/list',
				params: {
					customer,
					phone,
					dateOrder,
					dateSale,
				},
			}),
			providesTags: ['Sales'],
		}),
		getNewIdSale: build.query<SaleNewIdResponse, null>({
			query: () => ({
				url: `sales/getnew`,
			}),
			providesTags: ['Sales'],
		}),
		deleteSaleById: build.mutation<null, string>({
			query: (saleId) => ({
				url: `sales/delete`,
				method: 'DELETE',
				body: { id: saleId },
			}),
			invalidatesTags: ['Sales'],
		}),
		getSaleInfo: build.query<SaleInfoResponse, string>({
			query: (id) => ({
				url: `sales/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Sales', 'SaleInfo'],
		}),
		saveSaleInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `sales/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Sales', 'SaleInfo'],
		}),
		getAllRefunds: build.query<
			RefundResponse,
			{ dateOrder?: string; dateRefund?: string; customer?: string; phone?: string }
		>({
			query: ({ dateOrder, dateRefund, customer, phone }) => ({
				url: 'refunds/list',
				params: {
					dateOrder,
					dateRefund,
					customer,
					phone,
				},
			}),
			providesTags: ['Refunds'],
		}),
		getNewIdRefund: build.query<RefundNewIdResponse, null>({
			query: () => ({
				url: `refunds/getnew`,
			}),
			providesTags: ['Refunds'],
		}),
		deleteRefundById: build.mutation<null, string>({
			query: (refundId) => ({
				url: `refunds/delete`,
				method: 'DELETE',
				body: { id: refundId },
			}),
			invalidatesTags: ['Refunds'],
		}),
		getRefundInfo: build.query<RefundInfoResponse, string>({
			query: (id) => ({
				url: `refunds/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['Refunds', 'RefundInfo'],
		}),
		saveRefundInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `refunds/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['Refunds', 'RefundInfo'],
		}),
		getSearchCity: build.query<CitysResponse, { search: string; id?: string }>({
			query: ({ search, id }) => ({
				url: `orders/search_city`,
				params: { search, id },
			}),
		}),
	}),
})

export const {
	useDeleteOrderByIdMutation,
	useDeleteRefundByIdMutation,
	useDeleteSaleByIdMutation,
	useGetAllOrdersQuery,
	useGetAllRefundsQuery,
	useGetAllSalesQuery,
	useGetNewIdOrderQuery,
	useGetNewIdRefundQuery,
	useGetNewIdSaleQuery,
	useGetOrderInfoQuery,
	useGetRefundInfoQuery,
	useGetSaleInfoQuery,
	useSaveOrderInfoMutation,
	useSaveRefundInfoMutation,
	useSaveSaleInfoMutation,
	useGetAllDeletedOrdersQuery,
	useGetSearchCityQuery,
} = tradingApi
