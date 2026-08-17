import { type FileUploadRespone } from 'src/types/files'
import { type SelOption } from 'src/types/select'

export type PlacementInputs = {
	use_widget_event?: boolean
	widget_event_code?: string
	use_widget_reg?: boolean
	widget_reg_code?: string
	use_create_land?: boolean
	landing?: FileUploadRespone | string
	color_schema?: SelOption[] | string
	domain_list?: SelOption[] | string
}
