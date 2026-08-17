import {
	type ObjLocationInputs,
	ObjLocationSchema,
} from 'src/pages/object-element-layout/pages/object-location/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'
import { useGetMapObjectInfoQuery, useSaveObjectMapMutation } from 'src/store/objects/objects.api'
import { booleanToNumberString } from 'src/helpers/utils'

import { MapSection } from 'src/pages/object-element-layout/pages/object-location/components/map-section/map-section'
import { RoutesSection } from 'src/pages/object-element-layout/pages/object-location/components/routes-section/routes-section'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'

export const ObjectLocation = () => {
	const { id = '' } = useParams()
	const { data: objectLocationData } = useGetMapObjectInfoQuery(id)
	const [saveObjectMap] = useSaveObjectMapMutation()

	const methods = useForm<ObjLocationInputs>({
		mode: 'onBlur',
		resolver: yupResolver(ObjLocationSchema),
		defaultValues: {
			hide_paths: false,
			paths: [],
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ObjLocationInputs> = async (data) => {
		const objectId = id
		const objectMapFormData = new FormData()

		objectMapFormData.append('id', objectId)

		data.paths?.forEach((pathway, index) => {
			objectMapFormData.append(`path_name[${index}]`, pathway.path_name)
			objectMapFormData.append(`path_desc[${index}]`, pathway.path_desc)
			objectMapFormData.append(`path_yandex[${index}]`, pathway.path_yandex)
		})
		objectMapFormData.append('map_yandex', data.map_yandex)
		objectMapFormData.append('hide_paths', booleanToNumberString(data.hide_paths))

		const res = await saveObjectMap(objectMapFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminObjects}`)
			}
		}
	}

	useEffect(() => {
		if (objectLocationData) {
			methods.reset({ ...objectLocationData })
		}
	}, [objectLocationData])

	return (
		<>
			<Helmet>
				<title>Карта и маршруты</title>
			</Helmet>
			<AdminContent link={`https://атманов-угол.рф/objects-list/${id}`} title='Карта и маршруты'>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<MapSection />
						<RoutesSection />
						<AdminControllers
							variant={'4'}
							outLink={`/${AdminRoute.AdminObjects}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</AdminContent>
		</>
	)
}
