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
