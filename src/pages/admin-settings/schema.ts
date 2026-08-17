export type SettingsInputs = {
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
	metric?: string
}

export const defaultMainBlocksValues = {
	use_promo: false,
	use_awards: false,
	use_mainslider: false,
	use_best: false,
	use_adv: false,
	use_catalog: false,
	use_reviews: false,
}
