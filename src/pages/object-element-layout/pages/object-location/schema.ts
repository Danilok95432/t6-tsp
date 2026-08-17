import * as yup from 'yup'
import { type pathObjectMap } from 'src/types/objects'

export type ObjLocationInputs = {
	map_yandex: string
	hide_paths?: boolean
	paths?: pathObjectMap[]
}

export const ObjLocationSchema = yup.object().shape({
	map_yandex: yup.string().required('Введите текст скрипта'),
})
