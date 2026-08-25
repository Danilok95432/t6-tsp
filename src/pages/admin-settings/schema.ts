export type SettingsInputs = {
	use_promo: boolean
	use_big: boolean
	use_small: boolean
	use_projects: boolean
	use_prof: boolean
	use_docs: boolean
	use_contacts: boolean
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
	use_big: false,
	use_small: false,
	use_projects: false,
	use_prof: false,
	use_docs: false,
	use_contacts: false,
}
