import * as yup from 'yup'

export type ResponseInputs = {
	rate?: number
	close?: boolean
}
export const responseModalSchema = yup.object().shape({})
