export enum ReducerPath {
	Objects = 'objects/api',
	Projects = 'projects/api',
	News = 'news/api',
	Events = 'events/api',
	Culture = 'culture/api',
	Games = 'games/api',
	SiteSettings = 'site-settings/api',
	Videos = 'videos/api',
	Requests = 'requests/api',
	Community = 'community/api',
	Partners = 'partners/api',
	UploadImages = 'uploadImages/api',
	UploadFiles = 'uploadFiles/api',
	Faq = 'faq/api',
	Vids = 'vids/api',
	Statistic = 'statistic/api',
	Catalog = 'catalog/api',
	Trading = 'trading/api',
	Customers = 'customers/api',
	Marketing = 'marketing/api',
}

export const ImagesFormat = ['png', 'jpeg', 'jpg', 'webp', 'gif']

export enum NameSpace {
	Modal = 'MODAL',
	Auth = 'AUTH',
	TableFiltration = 'TABLE_FILTRATION',
}

export enum DisplayBreakpoints {
	Sm = 576,
	Md = 768,
	Lg = 1024,
	Xl = 1280,
	Xxl = 1440,
}

export const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4020/api/v1'

export const MAIN_PROD_URL = 'https://api.imperatorspb.ru/admin'
export const DEV_URL = '/api'
