import {
	type regEmailField,
	type regField,
	type regPhoneField,
} from 'src/pages/one-event-layout/pages/admin-event-settings/layout/registration-page/schema'
import { type FileItem } from './files'
import { type PartnerCheckBoxesInfo } from './partners'
import { type ImageItemWithText } from './photos'
import { type MultiSelOption, type SelOption } from './select'

export type EventItem = {
	id: string
	hidden: boolean
	title: string
	date: [Date, Date] | string
	object_title: string
	event_type_name: string
	event_part_name: string
	event_level_name: string
}

export type CicleItem = {
	id: string
	cicle_name: string
	cicle_dates: string
	cicle_short: string
	cicle_type_name: string
	cicle_actual_name: string
	age: string
	url: string
	email: string
	telegram: string
	phone: string
	place: string
	hidden: boolean
}

export type EventPartners = {
	id: string
	id_partner: string
	title: string
	partner_types: string[]
	partner_vids: string[]
	partner_number: string
	hidden: boolean
}

export type EventSubEvent = {
	id: string
	hidden: boolean
	title: string
	type: string
	use_end_time: string
	use_group: string
	use_reg: string
	vid_name: string
	registration: string
	date: string
	begin_time: string
	end_time: string
	place: string
}

export type EventSubEventInfoReponse = {
	hidden: boolean
	title: string
	use_real: boolean
	trebovania: string
	reglament: string
	url: string
	use_end_time: boolean
	use_group: boolean
	use_reg: boolean
	begin_time: string
	end_time: string
	short: string
	address: string
	email: string
	phone: string
	telegram: string
	rules: string
	itemdate: string
	organizators_list: SelOption[]
	vids_list: SelOption[]
	age_list: SelOption[]
	reg_list: SelOption[]
	photo: ImageItemWithText[]
}

export type EventSubEventsResponse = {
	sub_events: EventSubEvent[]
}

export type EventPartnersResponse = {
	partners: EventPartners[]
}

export type EventResponse = {
	events: EventItem[]
}

export type CicleResponse = {
	cicles: CicleItem[]
}

export type EventNewIdResponse = {
	status: string
	id: string
}

export type EventInfoResponse = {
	title: string
	objects_list?: SelOption[]
	event_types_list: SelOption[]
	event_levels_list: SelOption[]
	brands_list: SelOption[]
	tags?: string
	date_from: string
	time_from: string
	date_to: string
	time_to: string
	description: string
	fullinfo: string
	conditions: string
	raspisanie: string
	age_list: SelOption[]
	locations_list?: SelOption[]
	main?: boolean
	hidden?: boolean
}

export type CicleInfoResponse = {
	cicle_name: string
	cicle_dates: string
	cicle_short: string
	age: string
	url: string
	email: string
	telegram: string
	phone: string
	place: string
	anonstext: string
	fulltext: string
	id_cicle_type: SelOption[]
	id_cicle_regular: SelOption[]
	id_cicle_actual: SelOption[]
	id_age_limit: SelOption[]
	organizators_list: SelOption[]
	hidden: boolean
	photo: ImageItemWithText[]
	photos: ImageItemWithText[]
	use_gallery: boolean
	use_video: boolean
	use_news: boolean
}

export type pathwaysEvent = {
	title: string
	desc: string
	location: string
}

export type placementsEvent = {
	title: string
	desc: string
	location: string
}

export type linksEvent = {
	title: string
	link: string
	desc: string
	date: string
}

export type InfoBlockContent = {
	title: string
	short: string
	photo: ImageItemWithText[]
	reg_participants: boolean
	reg_guests: boolean
	link_url: string
	link_text: string
	hidden: boolean
	id: string
}

export type EventContacts = {
	website: string
	contact_telphone?: string
	contact_tg?: string
	contact_email?: string
	hide_telphone?: boolean
	hide_tg?: boolean
	hide_email?: boolean
	pathways?: pathwaysEvent[]
	hide_pathways?: boolean
}

export type EventRules = {
	id_event: string
	rule_name: string
	rule_text: string
	politic_name: string
	politic_text: string
}

export type EventContent = {
	placements: placementsEvent[]
	linksBlock_title: string
	hide_placements?: boolean
	hide_gallery?: boolean
	hide_documents?: boolean
	links: linksEvent[]
	hide_links?: boolean
	photo?: ImageItemWithText[]
	photos?: ImageItemWithText[]
	promo?: ImageItemWithText[]
	documents?: FileItem[]
	infoblock: InfoBlockContent
}

export type EventPartnerInfoResponse = {
	partners_list: SelOption[]
	partner_types: PartnerCheckBoxesInfo[]
}

export type EventProgramResponse = {
	program: EventProgram[]
}

export type EventProgram = {
	title: string
	place?: string
	itemdate: Date | string
	begin_time: Date | string
	end_time?: Date | string
}

export type EventTicketsResponse = {
	tickets: EventTickets[]
	total: string
}

export type EventTickets = {
	id: string
	status: string
	ticket_number: string
	sale_type: string
	group: boolean
	fio: string
	telphone: string
	ticket_type: string
	sale_price: string
	delivery_type: string
	createdate: string
}

export type EventGuestsResponse = {
	guests: EventGuests[]
	total: string
}

export type EventGuestCardResponse = {
	guest: EventGuests
}

export type EventGuests = {
	id: string
	fio: string
	phone: string
	age: string
	guest_count: string
	role: string
	ticket: string
	createdate: string
	region_name: string
	data_zaezd: string
	event: string
	data_viezd: string
	cars: string[]
	id_guest_user: string
	use_group: string
	group_name: string
	ticket_link: string
}

export type EventParticipantsResponse = {
	users: EventParticipants[]
}

export type EventParticipantCardResponse = {
	user: EventParticipantCard
}

export type EventParticipantCard = {
	fio: string
	phone: string
	event: string
	dopusk: string
	ticket: string
	use_group: string
	group_name: string
	group_role: string
	sub_events: string[]
	roles_list: string[]
	trader_name: string
	master_name: string
	journal_name: string
	createdate: string
	cars: string[]
	region_name: string
	ticket_link: string
}

export type EventParticipants = {
	id: string
	fio: string
	phone: string
	age: string
	role: string
	ticket_number: string
	createdate: string
	group: string
	group_name: string
	ticket_type: string
	region_name: string
	data_zaezd: string
	data_viezd: string
	status: string
	id_reg_status: string
	sub_event: string
}

export type EventParticipantsResponseSecond = {
	users: EventParticipantsSecond[]
	total: string
}

export type EventParticipantsSecond = {
	id: string
	fio: string
	group_name: string
	group: string
	phone: string
	roles: string
	dopusk: string
	ticket_number: string
	region_name: string
	cars: [{ type: string; number: string; id: string }]
	sub_events: string[]
	vids: string
}

export type EventRequestsResponse = {
	requests: EventRequests[]
}

export type EventRequests = {
	id: string
	fio: string
	requesttype: string
	group_name: string
	region_name: string
	createdate: string
	statusname: string
	event_role: string
	vid: string
}

export type EventRequestItem = {
	id: string
	id_reg_user: string
	fio: string
	event: string
	statusname: string
	statusdate: string
	sub_events: string[]
	cars: string[]
	services: string[]
	is_group: number
	group_users: string[]
	event_role: string
	region_name: string
	city_name: string
	dopinfo: string
	phone: string
	vid: string
}

export type EventGroups = {
	id: string
	fio: string
	phone: string
	region_name: string
	data_zaezd: string
	data_viezd: string
	createdate: string
	group_name: string
	ticket_number: string
	role_name: string
	group_count: string
}

export type EventGroupsResponse = {
	groups: EventGroups[]
}

export type EventInspectors = {
	id: string
	inspector_type: string
	pitanie_place: string
	enter_zone: string
	fio: string
	user_name: string
	telphone: string
	description: string
	active: boolean
	hidden: boolean
}

export type EventInspectorInfo = {
	fio: string
	telphone: string
	description: string
	user_name: string
	inspector_types_list: MultiSelOption[]
	inspector_pitanie_place: SelOption[]
	inspector_enter_zones: SelOption[]
}

export type EventInspectorsResponse = {
	inspectors: EventInspectors[]
}

export type EventBraceletsResponse = {
	braslets: EventBracelets[]
	total: string
}

export type EventBracelets = {
	id: string
	status: string
	braslet_code: string
	fio: string
	telphone: string
	ticket_number: string
	createdate: string
	inspector: string
}

export type EventSettingsRegistration = {
	use_reg?: boolean
	startDate?: string
	startTime?: string
	endDate?: string
	endTime?: string
	regFields: {
		surname: regField
		name: regField
		patronymic: regField
		birthday: regField
		region: regField
		phone: regPhoneField
		email: regEmailField
	}
	guestsLimit?: string
	use_repeat_reg?: boolean
	repeatCount?: string
	rejectEmail?: boolean
	rejectPhone?: boolean
	use_group_ticket?: boolean
	use_follow?: boolean
}

export type EventSettingsPayment = {
	use_card_pay?: boolean
	use_sbp?: boolean
	use_sber_pay?: boolean
}

export type EventSettingsTicketTypes = {
	ticket_types: SettingTicketType[]
}

export type SettingTicketType = {
	id?: string
	title?: string
	ticketsLimit?: string
	price?: string
	use_refund?: boolean
	refunddaylimit?: string
	desc?: string
	use_early?: boolean
	earlyDayLimit?: string
	earlySaleCount?: string
	use_group?: boolean
	guestsCount?: string
	saleGroup?: string
	use_now?: boolean
	saleNow?: string
	use_kid?: boolean
	saleKid?: string
}

export type EventRegistrationsElem = {
	id: string
	date: string
	reg_type: string
	count_tickets: string
	phone: string
	email: string
	guest: string
	paid: string
	deliver_type: string
}

export type EventRegistrationsList = {
	registrations: EventRegistrationsElem[]
	total: string
}

export type EventTicketsElem = {
	id: string
	ticket_type: string
	age: string
	ticket_number: string
	purchase_type: string
	phone: string
	email: string
	discount: string
	paid: string
	status: string
}

export type EventTicketsList = {
	tickets: EventTicketsElem[]
	total: string
}

export type EventEntersElem = {
	id: string
	ticket_type: string
	ticket_number: string
	purchase_type: string
	age_group: string
	date: string
	gate: string
	status: string
}

export type EventEntersList = {
	enters: EventEntersElem[]
	total: string
}

export type EventSMSElem = {
	id: string
	type: string
	phone: string
	status: string
	operator: string
	sended: string
	delivered: string
	cost: string
}

export type EventSMSList = {
	sms: EventSMSElem[]
	total: string
}

export type EventSaleStatTickets = {
	id: string
	type: string
	total_count: string
	sum: string
	refund: string
	sum_refund: string
	discount: string
	total_sum: string
}

export type EventSaleStatDiscounts = {
	id: string
	type: string
	count: string
	sum: string
}

export type EventSaleStat = {
	sales: string
	refunds: string
	sum: string
	tickets_info: {
		saled_total: string
		saled_free: string
		refund_paid: string
		refund_free: string
		tickets: EventSaleStatTickets[]
		discounts_info: {
			sum: string
			discounts: EventSaleStatDiscounts[]
		}
	}
}

export type EventPlacementData = {
	use_widget_event: boolean
	widget_event_code: string
	use_widget_reg: boolean
	widget_reg_code: string
	use_create_land: boolean
	landing: string
	color_schema: SelOption[]
	domains_list: SelOption[]
}

export type EventWidget = {
	widget_event_code: string
}

export type EventWidgetReg = {
	widget_reg_code: string
}

export type EventPassElement = {
	id: string
	inspector: string
	area: string
	login: string
	password: string
}

export type EventPassResponse = {
	control_list: SelOption[]
	auto_list: SelOption[]
	turniketsCount: string
	manual_list: SelOption[]
	inspectorsCount: string
	passTable: EventPassElement[]
	use_tech_conditions: boolean
	use_com_conditions: boolean
	use_paid: boolean
	paidCount: string
	use_docs: boolean
	signed: string
	ready: string
	inWork: string
}
