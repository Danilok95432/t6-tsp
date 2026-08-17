import type { FileWithPreview } from 'src/types/files'
import * as yup from 'yup'

export type PromoInputs = {
	promoTitle: string
	contentType?: string
	contentChoice?: string
	promoDesktopImage?: FileWithPreview[]
	promoMobileImage?: FileWithPreview[]
	isHiddenPromo?: boolean
}
export const promoModalSchema = yup.object().shape({
	promoTitle: yup.string().required('Введите название'),
})
