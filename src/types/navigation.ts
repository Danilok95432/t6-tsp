import { type ReactNode } from 'react'

export type NavigationItem = {
	title: string
	link: string
	accent?: boolean
	icon?: ReactNode
	childItems?: NavigationItem[]
	exact?: boolean
	disable?: boolean
}

export type ContentNav = {
	linkIdx: number
}

export type TabNavigationItem = {
	title: string
	subtitle?: string
	link: string
	indexLink?: string
	exact?: boolean
	icon?: ReactNode
}
