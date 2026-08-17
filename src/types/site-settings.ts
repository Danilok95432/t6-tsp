import { type FileWithPreview } from 'src/types/files'

export type PromoBlock = {
	id: string
	title: string
	isHidden: boolean
	contentType: string
	contentChoice: string
	createdAt: Date
	promoDesktopImage: FileWithPreview[]
	promoMobileImage: FileWithPreview[]
}

export type SettingsResponse = {
	use_promo: boolean
	use_awards: boolean
	use_mainslider: boolean
	use_best: boolean
	use_adv: boolean
	use_catalog: boolean
	use_reviews: boolean
	contact_address: string
	contact_telphone: string
	contact_email: string
	contact_vk: string
	info_copyright: string
	site_title: string
	metric: string
}
