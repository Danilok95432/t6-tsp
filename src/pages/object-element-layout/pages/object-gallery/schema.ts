import * as yup from 'yup'

export type ObjectGalleryInputs = {
	link: string
}

export const objectGallerySchema = yup.object().shape({
	link: yup.string().url('Неверный формат ссылки').required('Укажите ссылку'),
})
