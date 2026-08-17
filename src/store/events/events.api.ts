import {
	type EventNewIdResponse,
	type EventInfoResponse,
	type EventResponse,
	type EventContacts,
	type EventContent,
	type EventPartnerInfoResponse,
	type EventPartnersResponse,
	type CicleResponse,
	type CicleInfoResponse,
	type EventSubEventsResponse,
	type EventSubEventInfoReponse,
	type EventRules,
	type EventTicketsResponse,
	type EventParticipantsResponse,
	type EventGuestsResponse,
	type EventRequestsResponse,
	type EventRequestItem,
	type EventGroupsResponse,
	type EventParticipantsResponseSecond,
	type EventGuestCardResponse,
	type EventParticipantCardResponse,
	type EventInspectorsResponse,
	type EventInspectorInfo,
	type EventBraceletsResponse,
	type EventSettingsRegistration,
	type EventSettingsPayment,
	type EventSettingsTicketTypes,
	type EventRegistrationsList,
	type EventTicketsList,
	type EventEntersList,
	type EventSMSList,
	type EventSaleStat,
	type EventPlacementData,
	type EventWidget,
	type EventWidgetReg,
	type EventPassResponse,
} from 'src/types/events'
import { type FieldValues } from 'react-hook-form'

import { createApi } from '@reduxjs/toolkit/query/react'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const eventsApi = createApi({
	reducerPath: ReducerPath.Events,
	tagTypes: [
		'Events',
		'EventInfo',
		'EventPartners',
		'EventContacts',
		'EventContent',
		'EventNews',
		'EventVideo',
		'EventProgram',
		'EventPartner',
		'SubEvent',
		'SubEventInfo',
		'Cicles',
		'CicleInfo',
		'EventRules',
		'EventTickets',
		'EventGuests',
		'EventUsers',
		'EventRequests',
		'EventRequestInfo',
		'EventGroups',
		'EventInspectors',
		'EventInspectorInfo',
		'EventBracelets',
		'EventSettingsRegistration',
		'EventSettingsPayment',
		'EventSettingsTicket',
		'EventSettingsTickets',
		'EventRegistrationsList',
		'EventTicketsList',
		'EventEntersList',
		'EventSMSList',
		'EventSaleStats',
		'EventRegistrationsCSV',
		'EventTicketsCSV',
		'EventEntersCSV',
		'EventSMSCSV',
		'EventPlacement',
		'EventWidget',
		'EventWidgetReg',
		'EventLanding',
		'EventSaveColorLanding',
		'EventPass',
		'EventSaveDomainLanding',
	],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getAllEvents: build.query<
			EventResponse,
			{
				idObject?: string
				title?: string
				objectTitle?: string
				dateFrom?: string
				dateTo?: string
			}
		>({
			query: ({ idObject = '', title = '', objectTitle = '', dateFrom = '', dateTo = '' }) => ({
				url: `events/list`,
				params: {
					idObject,
					title,
					objectTitle,
					dateFrom,
					dateTo,
				},
			}),
			providesTags: ['Events'],
		}),
		getAllCicles: build.query<CicleResponse, null>({
			query: () => ({
				url: `cicles/list`,
			}),
			providesTags: ['Cicles'],
		}),
		deleteCicleById: build.mutation<null, string>({
			query: (cicleId) => ({
				url: `cicles/delete`,
				method: 'DELETE',
				body: { id: cicleId },
			}),
			invalidatesTags: ['Cicles'],
		}),
		hideCicleById: build.mutation<null, string>({
			query: (cicleId) => ({
				url: `cicles/hide`,
				method: 'POST',
				body: { id: cicleId },
			}),
			invalidatesTags: ['Cicles'],
		}),
		getCicleInfo: build.query<CicleInfoResponse, string>({
			query: (id) => ({
				url: `cicles/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['CicleInfo'],
		}),
		saveCicleInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `cicles/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['CicleInfo', 'Cicles'],
		}),
		getNewIdCicle: build.query<EventNewIdResponse, null>({
			query: () => ({
				url: `cicles/getnew`,
			}),
			providesTags: ['CicleInfo', 'Cicles'],
		}),
		deleteEventById: build.mutation<null, string>({
			query: (eventId) => ({
				url: `events/delete`,
				method: 'DELETE',
				body: { id: eventId },
			}),
			invalidatesTags: ['Events'],
		}),
		hideEventById: build.mutation<null, string>({
			query: (eventId) => ({
				url: `events/hide`,
				method: 'POST',
				body: { id: eventId },
			}),
			invalidatesTags: ['Events'],
		}),
		getEventInfo: build.query<EventInfoResponse, string>({
			query: (id) => ({
				url: `events/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['EventInfo'],
		}),
		saveEventProfileInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventInfo', 'Events'],
		}),
		getNewIdEvent: build.query<EventNewIdResponse, null>({
			query: () => ({
				url: `events/getnew`,
			}),
			providesTags: ['EventInfo', 'Events'],
		}),
		getContactsByEventId: build.query<EventContacts, string>({
			query: (id) => ({
				url: `events/edit_contacts`,
				params: {
					id,
				},
			}),
			providesTags: ['Events', 'EventContacts'],
		}),
		saveEventContactInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_contacts`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventInfo', 'Events', 'EventContacts'],
		}),
		getContentByEventId: build.query<EventContent, string>({
			query: (id) => ({
				url: `events/edit_content`,
				params: {
					id,
				},
			}),
			providesTags: ['EventInfo', 'Events', 'EventContacts'],
		}),
		saveEventContentInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_content`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventInfo', 'Events', 'EventContacts'],
		}),
		getPartnersByEventId: build.query<
			EventPartnersResponse,
			{ idEvent: string | undefined; title?: string; partnerVids?: string; partnerTypes?: string }
		>({
			query: ({ idEvent, title, partnerVids = '', partnerTypes = '' }) => ({
				url: `events/partners`,
				params: {
					id_event: idEvent,
					title,
					partner_vids: partnerVids,
					partner_types: partnerTypes,
				},
			}),
			providesTags: ['Events', 'EventPartners'],
		}),
		deleteEventPartnerById: build.mutation<null, string>({
			query: (partnerId) => ({
				url: `events/delete_partner`,
				method: 'DELETE',
				body: { id: partnerId },
			}),
			invalidatesTags: ['Events', 'EventPartner'],
		}),
		hideEventPartnerById: build.mutation<null, string>({
			query: (partnerId) => ({
				url: `events/hide_partner`,
				method: 'POST',
				body: { id: partnerId },
			}),
			invalidatesTags: ['Events', 'EventPartner'],
		}),
		getNewPartnerIdEvent: build.query<EventNewIdResponse, string>({
			query: (id) => ({
				url: `events/getnew_partner`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventPartner', 'Events'],
		}),
		getEventPartnerInfo: build.query<EventPartnerInfoResponse, string>({
			query: (id) => ({
				url: `events/edit_partner`,
				params: {
					id,
				},
			}),
			providesTags: ['EventPartner', 'Events'],
		}),
		saveEventPartnerInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_partner`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventPartner', 'Events'],
		}),
		getSubEventsByEventId: build.query<
			EventSubEventsResponse,
			{ idEvent: string | undefined; title?: string }
		>({
			query: ({ idEvent, title }) => ({
				url: `sub_events/list`,
				params: {
					id_event: idEvent,
					title,
				},
			}),
			providesTags: ['Events', 'SubEvent'],
		}),
		deleteSubEventById: build.mutation<null, string>({
			query: (subEventId) => ({
				url: `sub_events/delete`,
				method: 'DELETE',
				body: { id: subEventId },
			}),
			invalidatesTags: ['Events', 'SubEvent'],
		}),
		hideSubEventById: build.mutation<null, string>({
			query: (subEventId) => ({
				url: `sub_events/hide`,
				method: 'POST',
				body: { id: subEventId },
			}),
			invalidatesTags: ['Events', 'SubEvent'],
		}),
		getNewSubEventId: build.query<EventNewIdResponse, string>({
			query: (id) => ({
				url: `sub_events/getnew`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['SubEvent', 'Events'],
		}),
		getSubEventInfo: build.query<EventSubEventInfoReponse, string>({
			query: (id) => ({
				url: `sub_events/edit`,
				params: {
					id,
				},
			}),
			providesTags: ['SubEvent', 'SubEventInfo'],
		}),
		saveSubEventInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `sub_events/save`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['SubEvent', 'SubEventInfo'],
		}),
		getRulesInfo: build.query<EventRules, string>({
			query: (id) => ({
				url: `events/edit_rules`,
				params: {
					id,
				},
			}),
			providesTags: ['EventRules'],
		}),
		saveRulesInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_rules`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventRules'],
		}),
		// <--------------- Списки и регистрации --------------->
		getTickets: build.query<
			EventTicketsResponse,
			{
				id: string
				telphone?: string
				surname?: string
				useGroup?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({ id, telphone, surname, useGroup, limit, step, page }) => ({
				url: `events/tickets`,
				params: {
					id_event: id,
					telphone,
					surname,
					use_group: useGroup,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventTickets'],
		}),
		getRequests: build.query<
			EventRequestsResponse,
			{ id: string; surname?: string; region?: string; roleName?: string }
		>({
			query: ({ id, surname, region, roleName }) => ({
				url: `events/requests`,
				params: {
					id_event: id,
					surname,
					region,
					id_event_role: roleName,
				},
			}),
			providesTags: ['EventRequests'],
		}),
		getRequestInfo: build.query<EventRequestItem, string>({
			query: (id) => ({
				url: `events/request_item`,
				params: {
					id_request: id,
				},
			}),
			providesTags: ['EventRequests', 'EventRequestInfo'],
		}),
		getAcceptStatusRequest: build.mutation<{ status?: string }, string>({
			query: (id) => ({
				url: `events/request_accept`,
				params: {
					id_request: id,
				},
			}),
			invalidatesTags: ['EventRequests', 'EventRequestInfo'],
		}),
		getDeclineStatusRequest: build.mutation<{ status?: string }, string>({
			query: (id) => ({
				url: `events/request_decline`,
				params: {
					id_request: id,
				},
			}),
			invalidatesTags: ['EventRequests', 'EventRequestInfo'],
		}),
		getGuests: build.query<
			EventGuestsResponse,
			{ id: string; phone?: string; surname?: string; limit?: number; step?: number; page?: number }
		>({
			query: ({ id, phone, surname, limit, step, page }) => ({
				url: `events/guests`,
				params: {
					id_event: id,
					phone,
					surname,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventGuests'],
		}),
		getGuestInfo: build.query<EventGuestCardResponse, string>({
			query: (id) => ({
				url: `events/guest_card`,
				params: {
					id_guest_user: id,
				},
			}),
			providesTags: ['EventGuests'],
		}),
		getUsers: build.query<EventParticipantsResponse, string>({
			query: (id) => ({
				url: `events/users`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventUsers'],
		}),
		getUsersSecondRequest: build.query<
			EventParticipantsResponseSecond,
			{ id: string; phone?: string; surname?: string; limit?: number; step?: number; page?: number }
		>({
			query: ({ id, limit, step, page, phone, surname }) => ({
				url: `events/users_new`,
				params: {
					id_event: id,
					limit,
					step,
					page,
					phone,
					surname,
				},
			}),
			providesTags: ['EventUsers'],
		}),
		getUserInfo: build.query<EventParticipantCardResponse, string>({
			query: (id) => ({
				url: `events/user_card`,
				params: {
					id_reg_list: id,
				},
			}),
			providesTags: ['EventUsers'],
		}),
		getGroups: build.query<EventGroupsResponse, { id: string; phone?: string; surname?: string }>({
			query: ({ id, phone, surname }) => ({
				url: `events/groups`,
				params: {
					id_event: id,
					phone,
					surname,
				},
			}),
			providesTags: ['EventGroups'],
		}),
		getInspectors: build.query<EventInspectorsResponse, string>({
			query: (id) => ({
				url: `events/inspectors`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventInspectors'],
		}),
		getInspectorInfo: build.query<EventInspectorInfo, string>({
			query: (id) => ({
				url: `events/edit_inspector`,
				params: {
					id,
				},
			}),
			providesTags: ['EventInspectors', 'EventInspectorInfo'],
		}),
		getNewIdInspector: build.query<{ status: string; id: string }, string>({
			query: (id) => ({
				url: `events/getnew_inspector`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventInspectorInfo'],
		}),
		deleteInspectorById: build.mutation<null, string>({
			query: (inspectorId) => ({
				url: `events/delete_inspector`,
				method: 'DELETE',
				body: { id: inspectorId },
			}),
			invalidatesTags: ['EventInspectors'],
		}),
		hideInspectorById: build.mutation<null, string>({
			query: (inspectorId) => ({
				url: `events/hide_inspector`,
				method: 'POST',
				body: { id: inspectorId },
			}),
			invalidatesTags: ['EventInspectors'],
		}),
		saveInspectorInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_inspector`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventInspectors'],
		}),
		getBracelets: build.query<
			EventBraceletsResponse,
			{
				id?: string
				telphone?: string
				surname?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({ id, telphone, surname, limit, step, page }) => ({
				url: `events/braslets`,
				params: {
					id_event: id,
					telphone,
					surname,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventInspectors'],
		}),
		// <--------------- Настройка -> Регистрация --------------->
		getSettingsRegistration: build.query<EventSettingsRegistration, string>({
			query: (id) => ({
				url: `events/edit_settings_registration`,
				params: {
					id,
				},
			}),
			providesTags: ['EventSettingsRegistration'],
		}),
		saveSettingsRegistrationInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_settings_registration`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventSettingsRegistration'],
		}),
		// <--------------- Настройка -> Оплата --------------->
		getSettingsPayment: build.query<EventSettingsPayment, string>({
			query: (id) => ({
				url: `events/edit_settings_payment`,
				params: {
					id,
				},
			}),
			providesTags: ['EventSettingsPayment'],
		}),
		saveSettingsPaymentInfo: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_settings_payment`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventSettingsPayment'],
		}),
		// <--------------- Настройка -> Типы билетов --------------->
		getSettingsTicketTypes: build.query<EventSettingsTicketTypes, string>({
			query: (id) => ({
				url: `events/ticket_types`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventSettingsTickets'],
		}),
		getNewIdTicket: build.query<{ status: string; id: string }, string>({
			query: (id) => ({
				url: `events/getnew_ticket_type`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventSettingsTickets', 'EventSettingsTicket'],
		}),
		deleteSettingsTicketById: build.mutation<null, string>({
			query: (ticketId) => ({
				url: `events/delete_ticket_type`,
				method: 'DELETE',
				body: { id: ticketId },
			}),
			invalidatesTags: ['EventSettingsTickets', 'EventSettingsTicket'],
		}),
		saveSettingsTicketType: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_ticket_type`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventSettingsTicket'],
		}),
		// <--------------- Списки и статистика -> Регистрация --------------->
		getRegistrationsList: build.query<
			EventRegistrationsList,
			{
				id: string
				phone?: string
				surname?: string
				email?: string
				regType?: string
				deliverType?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({ id, phone, surname, email, regType, deliverType, limit, step, page }) => ({
				url: `events/registrations`,
				params: {
					id_event: id,
					phone,
					surname,
					email,
					reg_type: regType,
					deliver_type: deliverType,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventRegistrationsList'],
		}),
		getRegistrationsCSV: build.query<Blob, string>({
			query: (id) => ({
				url: `events/registrations_csv`,
				params: {
					id_event: id,
				},
				responseHandler: async (response) => await response.blob(),
			}),
			providesTags: ['EventRegistrationsCSV'],
		}),
		// <--------------- Списки и статистика -> Купленные билеты --------------->
		getTicketsList: build.query<
			EventTicketsList,
			{
				id: string
				ticketNumber?: string
				email?: string
				ticketType?: string
				purchaseType?: string
				status?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({
				id,
				ticketNumber,
				email,
				ticketType,
				purchaseType,
				status,
				limit,
				step,
				page,
			}) => ({
				url: `events/tickets`,
				params: {
					id_event: id,
					ticket_number: ticketNumber,
					email,
					ticket_type: ticketType,
					purchase_type: purchaseType,
					status,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventTicketsList'],
		}),
		getTicketsCSV: build.query<Blob, string>({
			query: (id) => ({
				url: `events/tickets_csv`,
				params: {
					id_event: id,
				},
				responseHandler: async (response) => await response.blob(),
			}),
			providesTags: ['EventTicketsCSV'],
		}),
		// <--------------- Списки и статистика -> Журнал проходов --------------->
		getEntersList: build.query<
			EventEntersList,
			{
				id: string
				dateFrom?: string
				dateTo?: string
				ticketType?: string
				ticketNumber?: string
				purchaseType?: string
				status?: string
				ageGroup?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({
				id,
				dateFrom,
				dateTo,
				ticketNumber,
				ticketType,
				purchaseType,
				status,
				ageGroup,
				limit,
				step,
				page,
			}) => ({
				url: `events/enters`,
				params: {
					id_event: id,
					ticket_number: ticketNumber,
					ticket_type: ticketType,
					purchase_type: purchaseType,
					status,
					age_group: ageGroup,
					datefrom: dateFrom,
					dateto: dateTo,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventEntersList'],
		}),
		getEntersCSV: build.query<Blob, string>({
			query: (id) => ({
				url: `events/enters_csv`,
				params: {
					id_event: id,
				},
				responseHandler: async (response) => await response.blob(),
			}),
			providesTags: ['EventEntersCSV'],
		}),
		// <--------------- Списки и статистика -> Статистика SMS --------------->
		getSMSList: build.query<
			EventSMSList,
			{
				id: string
				phone?: string
				operator?: string
				smsType?: string
				status?: string
				limit?: number
				step?: number
				page?: number
			}
		>({
			query: ({ id, phone, operator, smsType, status, limit, step, page }) => ({
				url: `events/sms_stats`,
				params: {
					id_event: id,
					phone,
					operator,
					sms_type: smsType,
					status,
					limit,
					step,
					page,
				},
			}),
			providesTags: ['EventSMSList'],
		}),
		getSMSCSV: build.query<Blob, string>({
			query: (id) => ({
				url: `events/sms_stats_csv`,
				params: {
					id_event: id,
				},
				responseHandler: async (response) => await response.blob(),
			}),
			providesTags: ['EventSMSCSV'],
		}),
		// <--------------- Списки и статистика -> Сводка продаж --------------->
		getSaleStat: build.query<EventSaleStat, string>({
			query: (id) => ({
				url: `events/sales`,
				params: {
					id_event: id,
				},
			}),
			providesTags: ['EventSaleStats'],
		}),
		// <--------------- Размещение и публикация --------------->
		getEventPlacement: build.query<EventPlacementData, string>({
			query: (id) => ({
				url: `events/edit_publication`,
				params: {
					id,
				},
			}),
			providesTags: ['EventPlacement'],
		}),
		getEventWidgetReg: build.query<EventWidgetReg, string>({
			query: (id) => ({
				url: `events/widget_reg_code`,
				params: {
					id,
				},
			}),
			providesTags: ['EventWidgetReg'],
		}),
		getEventWidget: build.query<EventWidget, string>({
			query: (id) => ({
				url: `events/widget_event_code`,
				params: {
					id,
				},
			}),
			providesTags: ['EventWidget'],
		}),
		getEventLanding: build.query<{ landing: string }, string>({
			query: (id) => ({
				url: `events/landing`,
				params: {
					id,
				},
			}),
			providesTags: ['EventLanding'],
		}),
		saveColorLandingChoice: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_color_shema`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventSaveColorLanding'],
		}),
		saveDomainLandingChoice: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_settings_publication_domain`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventSaveDomainLanding'],
		}),
		// <--------------- Пропуск --------------->
		getEventPass: build.query<EventPassResponse, string>({
			query: (id) => ({
				url: `events/edit_propusk`,
				params: {
					id,
				},
			}),
			providesTags: ['EventPass'],
		}),
		saveEventPass: build.mutation<string, FieldValues>({
			query: (FormData) => ({
				url: `events/save_propusk`,
				method: 'POST',
				body: FormData,
			}),
			invalidatesTags: ['EventPass'],
		}),
	}),
})

export const {
	useGetAllEventsQuery,
	useGetAllCiclesQuery,
	useGetCicleInfoQuery,
	useHideCicleByIdMutation,
	useSaveCicleInfoMutation,
	useDeleteCicleByIdMutation,
	useGetNewIdCicleQuery,
	useDeleteEventByIdMutation,
	useHideEventByIdMutation,
	useGetEventInfoQuery,
	useSaveEventProfileInfoMutation,
	useGetNewIdEventQuery,
	useGetContactsByEventIdQuery,
	useSaveEventContactInfoMutation,
	useGetContentByEventIdQuery,
	useSaveEventContentInfoMutation,
	useGetPartnersByEventIdQuery,
	useDeleteEventPartnerByIdMutation,
	useHideEventPartnerByIdMutation,
	useGetNewPartnerIdEventQuery,
	useGetEventPartnerInfoQuery,
	useSaveEventPartnerInfoMutation,
	useGetNewSubEventIdQuery,
	useGetSubEventInfoQuery,
	useDeleteSubEventByIdMutation,
	useHideSubEventByIdMutation,
	useSaveSubEventInfoMutation,
	useGetSubEventsByEventIdQuery,
	useGetRulesInfoQuery,
	useSaveRulesInfoMutation,
	useGetTicketsQuery,
	useGetGuestsQuery,
	useGetUsersQuery,
	useGetRequestsQuery,
	useGetRequestInfoQuery,
	useGetGroupsQuery,
	useGetAcceptStatusRequestMutation,
	useGetDeclineStatusRequestMutation,
	useGetUsersSecondRequestQuery,
	useGetGuestInfoQuery,
	useGetUserInfoQuery,
	useGetInspectorsQuery,
	useGetInspectorInfoQuery,
	useGetNewIdInspectorQuery,
	useDeleteInspectorByIdMutation,
	useHideInspectorByIdMutation,
	useSaveInspectorInfoMutation,
	useGetBraceletsQuery,
	useGetSettingsRegistrationQuery,
	useSaveSettingsRegistrationInfoMutation,
	useGetSettingsPaymentQuery,
	useSaveSettingsPaymentInfoMutation,
	useGetSettingsTicketTypesQuery,
	useGetNewIdTicketQuery,
	useLazyGetNewIdTicketQuery,
	useDeleteSettingsTicketByIdMutation,
	useSaveSettingsTicketTypeMutation,
	useGetRegistrationsListQuery,
	useGetTicketsListQuery,
	useGetEntersListQuery,
	useGetSMSListQuery,
	useGetSaleStatQuery,
	useGetRegistrationsCSVQuery,
	useLazyGetRegistrationsCSVQuery,
	useLazyGetTicketsCSVQuery,
	useLazyGetEntersCSVQuery,
	useLazyGetSMSCSVQuery,
	useGetEventLandingQuery,
	useGetEventWidgetQuery,
	useGetEventPlacementQuery,
	useGetEventWidgetRegQuery,
	useSaveColorLandingChoiceMutation,
	useGetEventPassQuery,
	useSaveEventPassMutation,
	useSaveDomainLandingChoiceMutation,
} = eventsApi
