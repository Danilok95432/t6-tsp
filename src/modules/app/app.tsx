import { type FC, useEffect } from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import { AdminRoutes } from 'src/routes/admin-routes/admin-routes'
import { NotFound } from 'src/pages/not-found/not-found'
import { useLazyCheckAuthQuery } from 'src/store/auth/auth.api'
import { useActions } from 'src/hooks/actions/actions'
import { AuthModal } from 'src/modals/auth-modal/auth-modal'

export const App: FC = () => {
	const [checkAuth, { data: authData }] = useLazyCheckAuthQuery()
	const { openModal, setAuth, setUser } = useActions()
	const location = useLocation()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			checkAuth(null).catch((err) => console.error(err))
		}
	}, [])

	useEffect(() => {
		if (authData) {
			localStorage.setItem('token', authData.token)
			setAuth(true)
			setUser(authData.user)
		}
	}, [authData])

	useEffect(() => {
		if (!localStorage.getItem('token')) openAuthModal()
	}, [location])

	const openAuthModal = () => {
		openModal(<AuthModal />)
	}

	return (
		<Routes>
			<Route path='/*' element={<AdminRoutes />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
export default App
