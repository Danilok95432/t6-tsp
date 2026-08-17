import { type State } from 'src/types/state'
import { NameSpace } from 'src/helpers/consts'

export const getModalContent = (state: State) => state[NameSpace.Modal].content
