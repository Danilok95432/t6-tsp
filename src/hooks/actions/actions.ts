import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { modalActions } from 'src/modules/modal/store/modal.slice'
import { authActions } from 'src/store/auth/auth.slice'
import { tableFiltrationActions } from 'src/modules/table-filtration/store/table-filtration.slice'

const actions = {
	...modalActions,
	...authActions,
	...tableFiltrationActions,
}
export const useActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators(actions, dispatch)
}
