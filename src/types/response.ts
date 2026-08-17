import { type User } from 'src/types/users'

export type AuthResponse = {
	token: string
	user: User
}
