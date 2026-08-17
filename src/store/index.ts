import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { NameSpace } from 'src/helpers/consts'
import { rtkQueryErrorLogger } from 'src/helpers/utils'
import { authReducer } from 'src/store/auth/auth.slice'
import { modalReducer } from 'src/modules/modal/store/modal.slice'
import { tableFiltrationReducer } from 'src/modules/table-filtration/store/table-filtration.slice'

import { authApi } from 'src/store/auth/auth.api'
import { objectsApi } from 'src/store/objects/objects.api'
import { newsApi } from 'src/store/news/news.api'
import { videosApi } from './videos/videos.api'
import { requestsApi } from './requests/requests.api'
import { eventsApi } from 'src/store/events/events.api'
import { culturesApi } from 'src/store/cultures/cultures.api'
import { siteSettingsApi } from 'src/store/site-settings/site-settings.api'
import { communityApi } from 'src/store/community/community.api'
import { partnersApi } from './partners/partners.api'
import { uploadImagesApi } from './uploadImages/uploadImages.api'
import { uploadFilesApi } from './uploadFiles/uploadFiles.api'
import { faqApi } from './faq/faq.api'
import { gamesApi } from './games/games.api'
import { vidsApi } from './vids/vids.api'
import { statisticApi } from './statistic/statistic.api'
import { catalogApi } from './catalog/catalog.api'
import { tradingApi } from './trading/trading.api'
import { customerApi } from './customers/customers.api'
import { marketingApi } from './marketing/marketing.api'

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[NameSpace.Auth]: authReducer,
		[NameSpace.Modal]: modalReducer,
		[NameSpace.TableFiltration]: tableFiltrationReducer,
		[objectsApi.reducerPath]: objectsApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[videosApi.reducerPath]: videosApi.reducer,
		[requestsApi.reducerPath]: requestsApi.reducer,
		[eventsApi.reducerPath]: eventsApi.reducer,
		[culturesApi.reducerPath]: culturesApi.reducer,
		[siteSettingsApi.reducerPath]: siteSettingsApi.reducer,
		[communityApi.reducerPath]: communityApi.reducer,
		[partnersApi.reducerPath]: partnersApi.reducer,
		[uploadImagesApi.reducerPath]: uploadImagesApi.reducer,
		[uploadFilesApi.reducerPath]: uploadFilesApi.reducer,
		[faqApi.reducerPath]: faqApi.reducer,
		[gamesApi.reducerPath]: gamesApi.reducer,
		[vidsApi.reducerPath]: vidsApi.reducer,
		[statisticApi.reducerPath]: statisticApi.reducer,
		[catalogApi.reducerPath]: catalogApi.reducer,
		[tradingApi.reducerPath]: tradingApi.reducer,
		[customerApi.reducerPath]: customerApi.reducer,
		[marketingApi.reducerPath]: marketingApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			objectsApi.middleware,
			newsApi.middleware,
			videosApi.middleware,
			requestsApi.middleware,
			eventsApi.middleware,
			culturesApi.middleware,
			siteSettingsApi.middleware,
			authApi.middleware,
			communityApi.middleware,
			partnersApi.middleware,
			uploadImagesApi.middleware,
			uploadFilesApi.middleware,
			faqApi.middleware,
			gamesApi.middleware,
			vidsApi.middleware,
			statisticApi.middleware,
			catalogApi.middleware,
			tradingApi.middleware,
			customerApi.middleware,
			marketingApi.middleware,
			rtkQueryErrorLogger,
		),
})

setupListeners(store.dispatch)
