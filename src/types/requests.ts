export type RequestItem = {
	id: string
	hidden: boolean
	title: string
	request_type: string
	id_request_status: string
	request_status_name: string
	short: string
	date: Date
	source: string
}

export type RequestResponse = {
	requests: RequestItem[]
}

export type RequestNewIdResponse = {
	status: string
	id: string
}

export type RequestInfoResponse = {
	id: string
	hidden: boolean
	title: string
	request_type: string
	id_request_status: string
	request_status_name: string
	short: string
	date: Date
	source: string
}
