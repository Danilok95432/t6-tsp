import * as yup from 'yup'

export type TraditionsInputs = {
	topDescs?: string
}

export const traditionsSchema = yup.object().shape({
	topDescs: yup.string().test('trim', 'Это поле обязательно', function (value) {
		if (!value) {
			return this.createError({ message: 'Это поле обязательно' })
		}
		const strippedValue = value.replace(/<[^>]*>/g, '').trim()
		return strippedValue.length > 0
	}),
})
