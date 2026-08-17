import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { NameSpace } from 'src/helpers/consts'

type ModalState = Record<string, string>

const initialState: ModalState = {}

const tableFiltrationSlice = createSlice({
	name: NameSpace.TableFiltration,
	initialState,
	reducers: {
		setTableFiltration: (state, action: PayloadAction<{ key: string; value: string }>) => {
			state[action.payload.key] = action.payload.value
		},
		clearTableFiltration: () => {
			return {}
		},
	},
})

export const tableFiltrationActions = tableFiltrationSlice.actions

export const tableFiltrationReducer = tableFiltrationSlice.reducer
