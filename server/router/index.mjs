import {
	getObjectById,
	getObjects,
	getNews,
	deleteNews,
	getNewsById,
	getEvents,
	getVideos,
	getVideoById,
	deleteVideo,
	getCultures,
	getCultureById,
	deleteCulture,
	deleteObject,
	getNewsByObjectId,
	deleteObjectNews,
	deleteEvent,
	getEventsByObjectId,
	deleteObjectEvents,
	getRequests,
	getRequestById,
	deleteRequest,
	getPromoBlocks,
	deleteEventPartner,
	getPartnersByEventId,
} from '../controllers/main-controller.mjs'
import { Router } from 'express'

export const router = new Router()

router.get('/objects', getObjects)
router.get('/objects/:id', getObjectById)
router.get('/objects/:id/news', getNewsByObjectId)
router.get('/objects/:id/events', getEventsByObjectId)
router.delete('/objectDelete/:id', deleteObject)
router.delete('/object/:objectId/newsDelete/:newsId', deleteObjectNews)
router.delete('/object/:objectId/eventDelete/:eventId', deleteObjectEvents)
router.get('/news', getNews)
router.get('/news/:id', getNewsById)
router.delete('/newsDelete/:id', deleteNews)
router.get('/cultures', getCultures)
router.get('/cultures/:id', getCultureById)
router.delete('/cultureDelete/:id', deleteCulture)
router.get('/events', getEvents)
router.delete('/eventDelete/:id', deleteEvent)
router.get('/events/:id/partners', getPartnersByEventId)
router.delete('/event/:eventId/partnerDelete/:partnerId', deleteEventPartner)
router.get('/videos', getVideos)
router.get('/videos/:id', getVideoById)
router.delete('/videoDelete/:id', deleteVideo)
router.get('/requests', getRequests)
router.get('/requests/:id', getRequestById)
router.delete('/requestDelete/:id', deleteRequest)
router.get('/promo-blocks', getPromoBlocks)
