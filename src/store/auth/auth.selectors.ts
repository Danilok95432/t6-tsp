import { type State } from 'src/types/state'
import { NameSpace } from 'src/helpers/consts'

export const isAuthUser = (state: State) => state[NameSpace.Auth].isAuth
export const authUser = (state: State) => state[NameSpace.Auth].currentUser
