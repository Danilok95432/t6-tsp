import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/modules/app/app'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import { Modal } from 'src/modules/modal/modal'

import 'react-toastify/dist/ReactToastify.min.css'
import 'swiper/swiper-bundle.css'
import 'react-datepicker/dist/react-datepicker.css'

import './index.scss'
import { ScrollToTop } from './UI/ScrollToTop/scroll-to-top'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<HelmetProvider>
			<BrowserRouter>
				<ScrollToTop />
				<ToastContainer />
				<App />
				<Modal />
			</BrowserRouter>
		</HelmetProvider>
	</Provider>,
)
