import { type State } from 'src/types/state'
import { NameSpace } from 'src/helpers/consts'

export const getFiltrationValues = (state: State) => state[NameSpace.TableFiltration]
