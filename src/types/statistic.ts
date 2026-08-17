export type LogEntersResponse = {
	log: LogEnters[]
	people_total: string
	prohod_total: string
	tickets_total: string
	total: string
	users_total: string
	guests_total: string
}

export type LogEnters = {
	id: string
	fio: string
	telphone: string
	role: string
	zone_name: string
	inspector: string
	prohod: string
	status: string
	scandate: string
	ticket: string
}

export type LogServicesResponse = {
	total: string
	log: LogServices[]
}

export type LogServices = {
	id: string
	service_name: string
	inspector: string
	fio: string
	telphone: string
	place_name: string
	status: string
	status_code: string
	ticket: string
	scandate: string
}
