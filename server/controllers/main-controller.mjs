import { objects } from '../mockData/objects.mjs'
import { news } from '../mockData/news.mjs'
import { events } from '../mockData/events.mjs'
import { videos } from '../mockData/videos.mjs'
import { eventRequests } from '../mockData/eventRequests.mjs'
import { cultureElements } from '../mockData/cultureElements.mjs'
import { promoBlocks } from '../mockData/promo-blocks.mjs'

export const getObjects = (req, res) => {
	const { q } = req.query

	const filteredObjects = objects.filter((el) => el.title.toLowerCase().includes(q))

	res.status(200).json(filteredObjects)
}

export const deleteObject = (req, res) => {
	const objectId = req.params.id
	let deleteIdx
	objects.forEach((el, idx) => {
		if (el.id === objectId) {
			deleteIdx = idx
		}
	})
	objects.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getObjectById = (req, res) => {
	const objectId = req.params.id
	const foundObject = objects.find((object) => object.id === objectId)

	res.status(200).json(foundObject)
}

export const getNewsByObjectId = (req, res) => {
	const objectId = req.params.id
	const foundObject = objects.find((object) => object.id === objectId)

	res.status(200).json(foundObject.news)
}

export const getEventsByObjectId = (req, res) => {
	const objectId = req.params.id
	const foundObject = objects.find((object) => object.id === objectId)

	res.status(200).json(foundObject.events)
}

export const deleteObjectNews = (req, res) => {
	const objectId = req.params.objectId
	const newsId = req.params.newsId
	const foundObject = objects.find((object) => object.id === objectId)
	let deleteIdx
	foundObject.news.forEach((el, idx) => {
		if (el.id === newsId) {
			deleteIdx = idx
		}
	})
	foundObject.news.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const deleteObjectEvents = (req, res) => {
	const objectId = req.params.objectId
	const eventId = req.params.newsId
	const foundObject = objects.find((object) => object.id === objectId)
	let deleteIdx
	foundObject.events.forEach((el, idx) => {
		if (el.id === eventId) {
			deleteIdx = idx
		}
	})
	foundObject.events.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getProjects = (req, res) => {
	const { q } = req.query

	const filteredProjects = projects.filter((el) => el.title.toLowerCase().includes(q))

	res.status(200).json(filteredProjects)
}

export const getProjectById = (req, res) => {
	const projectId = req.params.id
	const foundProject = projects.find((project) => project.id === projectId)

	res.status(200).json(foundProject)
}

export const getNews = (req, res) => {
	const { q, y } = req.query

	const filteredNews = news.filter((el) => {
		if (y) {
			return String(new Date(el.date).getFullYear()) === y && el.title.toLowerCase().includes(q)
		}
		return el.title.toLowerCase().includes(q)
	})

	res.status(200).json(filteredNews)
}

export const getNewsById = (req, res) => {
	const newsId = req.params.id
	const foundNews = news.find((newsItem) => newsItem.id === newsId)

	res.status(200).json(foundNews)
}

export const deleteNews = (req, res) => {
	const newsId = req.params.id
	let deleteIdx
	news.forEach((el, idx) => {
		if (el.id === newsId) {
			deleteIdx = idx
		}
	})
	news.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getCultures = (req, res) => {
	const { q } = req.query

	const filteredCultures = cultureElements.filter((el) => el.title.toLowerCase().includes(q))
	res.status(200).json(filteredCultures)
}

export const getCultureById = (req, res) => {
	const cultureId = req.params.id
	const foundCulture = cultureElements.find((cultureItem) => cultureItem.id === cultureId)

	res.status(200).json(foundCulture)
}

export const deleteCulture = (req, res) => {
	const cultureId = req.params.id
	let deleteIdx
	cultureElements.forEach((el, idx) => {
		if (el.id === cultureId) {
			deleteIdx = idx
		}
	})
	cultureElements.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getEvents = (req, res) => {
	const { q } = req.query

	const filteredEvents = events.filter((el) => el.title.toLowerCase().includes(q))

	res.status(200).json(filteredEvents)
}

export const deleteEvent = (req, res) => {
	const eventId = req.params.id
	let deleteIdx
	events.forEach((el, idx) => {
		if (el.id === eventId) {
			deleteIdx = idx
		}
	})
	events.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getPartnersByEventId = (req, res) => {
	const eventId = req.params.id

	const filteredEvents = events.find((el) => el.id === eventId)
	res.status(200).json(filteredEvents.partners)
}

export const deleteEventPartner = (req, res) => {
	const eventId = req.params.eventId
	const partnerId = req.params.partnerId
	const foundEvent= events.find((event) => event.id === eventId)
	let deleteIdx
	foundEvent.partners.forEach((el, idx) => {
		if (el.id === partnerId) {
			deleteIdx = idx
		}
	})
	foundEvent.partners.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getVideos = (req, res) => {
	const { q, y } = req.query

	const filteredVideos = videos.filter((el) => {
		if (y) {
			return String(new Date(el.date).getFullYear()) === y && el.title.toLowerCase().includes(q)
		}
		return el.title.toLowerCase().includes(q)
	})

	res.status(200).json(filteredVideos)
}

export const getVideoById = (req, res) => {
	const videoId = req.params.id
	const foundVideo = videos.find((videoItem) => videoItem.id === videoId)

	res.status(200).json(foundVideo)
}

export const deleteVideo = (req, res) => {
	const videoId = req.params.id
	let deleteIdx
	videos.forEach((el, idx) => {
		if (el.id === videoId) {
			deleteIdx = idx
		}
	})
	videos.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getRequests = (req, res) => {
	const { q, y } = req.query
	const filteredRequests = eventRequests.filter((el) => {
		if (y) {
			return !y.includes(el.status) && el.title.toLowerCase().includes(q)
		}
		return el.title.toLowerCase().includes(q)
	})

	res.status(200).json(filteredRequests)
}

export const getRequestById = (req, res) => {
	const requestId = req.params.id
	const foundRequest = eventRequests.find((requestItem) => requestItem.id === requestId)

	res.status(200).json(foundRequest)
}

export const deleteRequest = (req, res) => {
	const requestId = req.params.id
	let deleteIdx
	eventRequests.forEach((el, idx) => {
		if (el.id === requestId) {
			deleteIdx = idx
		}
	})
	eventRequests.splice(deleteIdx, 1)

	res.status(200).json(deleteIdx)
}

export const getPromoBlocks = (req, res) => {
	res.status(200).json(promoBlocks)
}
