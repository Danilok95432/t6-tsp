import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { useIsSent } from 'src/hooks/sent-mark/sent-mark'

import { Container } from 'src/UI/Container/Container'
import { AdminControllers } from 'src/components/admin-controllers/admin-controllers'
import { AdminRoute } from 'src/routes/admin-routes/consts'

import styles from './index.module.scss'
import adminStyles from 'src/routes/admin-layout/index.module.scss'
import classNames from 'classnames'
import {
	useDeleteAwardByIdMutation,
	useGetAllAwardsQuery,
	useGetNewIdAwardQuery,
	useHideAwardByIdMutation,
	useSaveAdRewardInfoMutation,
} from 'src/store/marketing/marketing.api'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { RowController } from 'src/components/row-controller/row-controller'
import { useAppSelector } from 'src/hooks/store'
import { getFiltrationValues } from 'src/modules/table-filtration/store/table-filtration.selectors'
import { CheckMarkSvg } from 'src/UI/icons/checkMarkSVG'
import { MainCheckBox } from 'src/UI/MainCheckBox/MainCheckBox'
import { CustomTable } from 'src/components/custom-table/custom-table'
import { GridRow } from 'src/components/grid-row/grid-row'
import { TableFooter } from 'src/components/table-footer/table-footer'
import { TableFiltration } from 'src/modules/table-filtration/table-filtration'
import { type AdRewardItem } from 'src/types/marketing'
import { TypeElementsFiltrationInputs } from './consts'
import { type RewardItemInputs, rewardItemsSchema } from './schema'

export const RewardList = () => {
	const filterValues = useAppSelector(getFiltrationValues)

	const { data: TypesInfoData } = useGetAllAwardsQuery({
		title: filterValues.title,
	})
	const { refetch: getNewId } = useGetNewIdAwardQuery(null)
	const [deleteTypeById] = useDeleteAwardByIdMutation()
	const [hidePageInfoById] = useHideAwardByIdMutation()
	const [saveRewardInfo] = useSaveAdRewardInfoMutation()
	const [action, setAction] = useState<'apply' | 'save'>('apply')
	const navigate = useNavigate()

	const methods = useForm<RewardItemInputs>({
		mode: 'onBlur',
		resolver: yupResolver(rewardItemsSchema),
	})
	const { isSent, markAsSent } = useIsSent(methods.control)
	const onSubmit: SubmitHandler<RewardItemInputs> = async (data) => {
		const formData = new FormData()

		formData.append('block_name', data.block_name ?? '')
		const res = await saveRewardInfo(formData)
		if (res) {
			markAsSent(true)
			if (action === 'save') {
				navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`)
			}
		}
	}

	useEffect(() => {
		if (!TypesInfoData) return

		methods.reset({
			block_name: TypesInfoData.block_name ?? '',
		})
	}, [TypesInfoData, methods])

	const addAward = async () => {
		const newIdResponse = await getNewId().unwrap()
		return newIdResponse.id
	}

	const tableTitles = ['ID', 'Название награды', 'Спрятать', '']
	const formatObjectsTableData = (awardData: AdRewardItem[]) => {
		return awardData.map((awardEl) => {
			return {
				rowId: awardEl.id,
				cells: [
					<p key='0'>{awardEl.id}</p>,
					<p key='1'>{awardEl.title}</p>,
					<MainCheckBox
						key='2'
						checked={awardEl.hidden}
						onChangeBox={async () => await hidePageInfoById(awardEl.id)}
						svgNode={<CheckMarkSvg />}
						className={styles.checkBoxWrapperNews}
					/>,
					<RowController
						id={awardEl.id}
						className={styles.rowActionButton}
						removeHandler={rowDeleteHandler}
						noHide
						key='3'
					/>,
				],
			}
		})
	}

	const rowDeleteHandler = async (id: string) => {
		await deleteTypeById(id)
	}

	const rowClickHandler = (id: string) => {
		navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}/${id}`)
	}

	const handleAddTypeClick = async () => {
		const newId = await addAward()
		navigate(`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}/${newId}`)
	}

	// if (isLoading || !TypesInfoData?.awards) return <Loader />
	return (
		<>
			<Link
				to={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`}
				className={classNames(adminStyles.adminReturnLink, styles.linkBack)}
			>
				Возврат к списку рекламных блоков
			</Link>
			<h4 className={styles.titleNewsForm}>Блок «Награды»</h4>
			<Container className={styles.cont}>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
						<div className={styles.oneNewsContent}>
							<div className={styles.oneNewsContentLeft}>
								<ControlledInput
									name='block_name'
									label='Название блока рекламы'
									margin=' 0 0 0 0'
								/>
							</div>
						</div>
						<AdminControllers
							variant='4'
							outLink={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}`}
							isSent={isSent}
							actionHandler={setAction}
						/>
					</form>
				</FormProvider>
			</Container>
			<GridRow $margin='0 0 15px 0' $padding='0 29px' className={styles.searchRow}>
				<TableFiltration filterInputs={TypeElementsFiltrationInputs} />
			</GridRow>
			<CustomTable
				className={styles.typesTable}
				rowData={formatObjectsTableData(TypesInfoData?.awards ?? [])}
				colTitles={tableTitles}
				rowClickHandler={rowClickHandler}
			/>
			<TableFooter
				className={styles.footer}
				totalElements={TypesInfoData?.awards.length}
				addClickHandler={handleAddTypeClick}
				addText='Добавить награду'
			/>
		</>
	)
}
