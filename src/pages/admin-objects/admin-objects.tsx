import { type ObjectInputs, objectSchema } from './schema'
import { Helmet } from 'react-helmet-async'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { useEffect } from 'react'

import {
	useGetAllObjectsQuery,
	useSaveObjectDescriptionMutation,
} from 'src/store/objects/objects.api'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { ObjectElements } from './components/object-elements/object-elements'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { transformToFormData } from 'src/helpers/utils'

import adminStyles from 'src/routes/admin-layout/index.module.scss'

export const AdminObjects = () => {
	const { data: objectsDataResponse } = useGetAllObjectsQuery({
		title: '',
		type: '',
		relation: '',
	})
	const [saveDescription] = useSaveObjectDescriptionMutation()

	const methods = useForm<ObjectInputs>({
		mode: 'onBlur',
		resolver: yupResolver(objectSchema),
	})

	const onSubmit: SubmitHandler<ObjectInputs> = async (data) => {
		await saveDescription(transformToFormData(data))
	}

	useEffect(() => {
		if (objectsDataResponse?.description) {
			methods.reset({
				description: objectsDataResponse.description,
			})
		}
	}, [objectsDataResponse])

	return (
		<>
			<Helmet>
				<title>Объекты кластера</title>
			</Helmet>
			<div className={adminStyles.adminTitleTab}>
				<h1>Объекты кластера</h1>
			</div>

			<AdminContent $padding='0 0 30px 0' $backgroundColor='#ffffff'>
				<FormProvider {...methods}>
					<AdminContent $padding='30px 30px 0 30px' $height='300px' $backgroundColor='#ffffff'>
						<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
							<ControlledInput
								name='description'
								label='Описание раздела «Объекты»'
								margin='0'
								height='200px'
								isTextarea
							/>
							<AdminButton $margin='25px 0 50px 0' as='button' type='submit'>
								Сохранить
							</AdminButton>
						</form>
					</AdminContent>
				</FormProvider>
				<ObjectElements />
			</AdminContent>
		</>
	)
}
