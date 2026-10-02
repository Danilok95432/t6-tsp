import { type FileItem } from './files'
import { type ImageItemWithText } from './photos'
import { type SelOption } from './select'

export type SolutionInfoElement = {
	id: string
	name: string
	desc: string
	sumItems: string
	sumWork: string
	totalSum: string
	category: string
	level: string
	part: string
}

export type SolutionInfoResponse = {
	solutions: SolutionInfoElement[]
}

export type SolutionCategoryElement = {
	id: string
	title: string
	desc: string
	projects: string
	solutions: string
}

type EquipItem = {
	name: string
	quantity: number
}

export type SolutionOneItem = {
	id: string
	title: string
	code: string
	part: SelOption[]
	part_id: string
	category: SelOption[]
	category_id: string
	level: SelOption[]
	tools: SelOption[]
	count: string
	equipmentList: EquipItem[]
	level_id: string
	price1: string
	price2: string
	price3: string
	short: string
	full: string
	hidden: boolean
	use_best: boolean
	use_rec: boolean
	use_stop: boolean
	seo_title: string
	seo_description: string
	seo_keywords: string
	seo_virtual: string
	img: ImageItemWithText[]
	images: ImageItemWithText[]
	documents: FileItem[]
}

export type SolutionCategoryResponse = {
	categories: SolutionCategoryElement[]
}

export type SolutionsNewIdResponse = {
	id: string
}

export type SolutionLevelElement = {
	id: string
	title: string
	desc: string
	projects: string
	solutions: string
}

export type SolutionLevelResponse = {
	levels: SolutionCategoryElement[]
}

export type SolutionProjectElement = {
	id: string
	title: string
	usage: string
	desc: string
	categories: string
	level: string
	sum: string
}

export type SolutionProjectsResponse = {
	projects: SolutionProjectElement[]
}

export type SolutionProjectInfo = {
	title: string
	part: SelOption[]
	part_id: string
	category: SelOption[]
	category_id: string
	level: SelOption[]
	level_id: string
	solution: SelOption[]
	solution_id: string
	short?: string
	full?: string
	hidden?: boolean
	customer: string
	finalPrice: string
	seo_title?: string
	seo_description?: string
	seo_keywords?: string
	seo_virtual?: string
	img: ImageItemWithText[]
	images: ImageItemWithText[]
	documents?: FileItem[]
}
