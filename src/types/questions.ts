export type QuestionItem = {
	id: string
	title: string
	isHidden?: boolean
}

export type QuestionResponse = {
	questions: QuestionItem[]
}
