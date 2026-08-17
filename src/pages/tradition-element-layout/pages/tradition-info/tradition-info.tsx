// import { useCallback, useEffect, useState } from 'react'
import { Link /* useParams */ } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
// import { yupResolver } from '@hookform/resolvers/yup'
import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminContent } from 'src/components/admin-content/admin-content'

import { AddButton } from 'src/UI/AddButton/AddButton'
import { AddImageCulturePlusSVG } from 'src/UI/icons/addImageCulturePlusSVG'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { QuillEditor } from 'src/components/quill-editor/quill-editor'
import { FlexRow } from 'src/components/flex-row/flex-row'

import adminStyles from 'src/routes/admin-layout/index.module.scss'
import styles from './index.module.scss'

export const TraditionInfo = () => {
	// const { id = '0' } = useParams()
	const methods = useForm({ mode: 'onBlur' })

	return (
		<>
			<Helmet>
				<title>Одна традиция</title>
			</Helmet>
			<AdminContent className={styles.traditionInfoPage}>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAbout}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
				<h3>Информация</h3>
				<FormProvider {...methods}>
					<form /* onSubmit={methods.handleSubmit(onSubmit)} */ noValidate>
						<ControlledInput
							name='title'
							label='Наименование элемента *'
							maxWidth='1140px'
							margin='0 0 20px 0'
						/>
						<ControlledInput
							name='website'
							label='Адрес интернет-сайта *'
							maxWidth='1140px'
							margin='0 0 20px 0'
						/>
						<ReactDropzone
							label='Фотография *'
							name='logo'
							prompt='PNG, JPG, JPEG. 1000 х1000px, не более 3 Мб'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							margin='0 0 20px 0'
							previewVariant='sm-img'
							imgtype='tradition'
							// fileImages={}
						/>
						<QuillEditor
							name='topDesc'
							label='Первый текстовый блок'
							$maxWidth='1140px'
							$heightEditor='105px'
						/>

						<ReactDropzone
							margin='30px 0 20px 0'
							label='Галерея изображений'
							previewVariant='img-list'
							variant='culture'
							name='photos'
							accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
							maxFiles={8}
							// fileImages={localeImages}
							// syncAdd={syncAddImagesHandler}
							// syncEdit={syncEditImagesHandler}
							imgtype='tradition_photo'
							dzAreaClassName={styles.traditionGalleryController}
							multiple
							customOpenModal={
								<AddButton
									// onClick={handleOpenModal}
									icon={<AddImageCulturePlusSVG />}
									$padding='44px 60px'
								>
									{' '}
								</AddButton>
							}
							customUploadBtn={
								<AddButton
									// onClick={handleOpenModal}
									icon={<AddImageCulturePlusSVG />}
									$padding='44px 60px'
								>
									{' '}
								</AddButton>
							}
						/>
						<QuillEditor
							name='bottomDesc'
							label='Текст статьи'
							$heightEditor='105px'
							$maxWidth='1140px'
						/>
						<FlexRow $margin='40px 0 45px 0' $gap='15px'>
							<AdminButton as='button' type='submit' /* $variant={isSent ? 'sent' : 'primary'} */>
								Сохранить
							</AdminButton>
							<AdminButton as='link' to='/' $variant='light'>
								Отменить
							</AdminButton>
						</FlexRow>
					</form>
				</FormProvider>
				<Link
					to={`/${AdminRoute.AdminAbout}/${AdminRoute.AdminAbout}`}
					className={adminStyles.adminReturnLink}
				>
					Возврат к списку элементов
				</Link>
			</AdminContent>
		</>
	)
}
