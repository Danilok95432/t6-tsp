import { objectInfoSchema, type ObjectInfoInputs } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { transformToFormData } from 'src/helpers/utils'
import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { AdminContent } from 'src/components/admin-content/admin-content'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { MainSection } from './components/main-section/main-section'
import { ContactsSection } from './components/contacts-section/contacts-section'
import { OrganizerSection } from './components/organizer-section/organizer-section'
import { useGetObjectInfoQuery, useSaveObjectInfoMutation } from 'src/store/objects/objects.api'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const ObjectInfo = () => {
	const { id = '0' } = useParams()

	const { data: objInfoData } = useGetObjectInfoQuery(id)

	const [saveObjectInfo] = useSaveObjectInfoMutation()

	const methods = useForm<ObjectInfoInputs>({
		mode: 'onBlur',
		resolver: yupResolver(objectInfoSchema),
		defaultValues: {
			photo: [],
			phone: '',
		},
	})

	const { isSent, markAsSent } = useIsSent(methods.control)
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<ObjectInfoInputs> = async (data) => {
		const serverData = {
			title: data.title,
			photo: data.photo,
			icon: data.icon,
			mainDesc: data.mainDesc,
			descList: data.descList,
			phone: data.phone,
			email: data.email,
			address: data.address,
			tgName: data.tgName,
			tgSoc: data.tgSoc,
			vkName: data.vkName,
			vkSoc: data.vkSoc,
			coords: data.coords,
			object_type:
				typeof data.object_types === 'string'
					? data.object_types
					: data.object_types
						? data.object_types[0].value
						: '0',
			object_apply:
				typeof data.object_apply === 'string'
					? data.object_apply
					: data.object_apply
						? data.object_apply[0].value
						: '0',
			org_name: data.org_name,
			org_ogrn: data.org_ogrn,
			org_inn: data.org_inn,
			org_address: data.org_address,
			org_phone: data.org_phone,
		}
		const objectInfoFormData = transformToFormData(serverData)
		objectInfoFormData.append('id', id)
		const res = await saveObjectInfo(objectInfoFormData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.AdminObjects}`)
			}
		}
	}

	useEffect(() => {
		if (objInfoData) {
			methods.reset({ ...objInfoData })
		}
	}, [objInfoData])

	return (
		<>
			<Helmet>
				<title>Об объекте</title>
			</Helmet>
			<AdminContent>
				<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLink}>
					Возврат к списку объектов
				</Link>
				<AdminContent
					title='Об объекте'
					link={`https://атманов-угол.рф/objects-list/${id}`}
					$padding='0 0 50px 0'
				>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
							<MainSection photo={objInfoData?.photo} />
							<ContactsSection />
							<OrganizerSection />
							<AdminControllers
								outLink={AdminRoute.AdminHome}
								isSent={isSent}
								actionHandler={setAction}
							/>
						</form>
					</FormProvider>
				</AdminContent>
				<Link to={`/${AdminRoute.AdminObjects}`} className={adminStyles.adminReturnLink}>
					Возврат к списку объектов
				</Link>
			</AdminContent>
		</>
	)
}
