import { useEffect, useState, type FC } from 'react'
import { type TypeTicketsInputs } from './schema'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'

import { AdminContent } from 'src/components/admin-content/admin-content'

import styles from './index.module.scss'
import { AdminButton } from 'src/UI/AdminButton/AdminButton'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { TicketSection } from './components/ticket-section/ticket-section'
import { AddTicketBtnSVG } from 'src/UI/icons/addTicketBtnSVG'
import {
	useDeleteSettingsTicketByIdMutation,
	useGetNewIdTicketQuery,
	useGetSettingsTicketTypesQuery,
	useSaveSettingsTicketTypeMutation,
} from 'src/store/events/events.api'
import { useParams } from 'react-router-dom'
import { booleanToNumberString } from 'src/helpers/utils'

export const TypeTicketsPage: FC = () => {
	const { id = '0' } = useParams()

	const methods = useForm<TypeTicketsInputs>({
		mode: 'onBlur',
	})

	const { data: ticketTypes, refetch: refetchTicketTypes } = useGetSettingsTicketTypesQuery(id)
	const [saveNewTicket] = useSaveSettingsTicketTypeMutation()
	const [deleteTicketType] = useDeleteSettingsTicketByIdMutation()

	const { refetch: getNewId } = useGetNewIdTicketQuery(id)
	const [, setAction] = useState<'apply' | 'save'>('apply')
	const [idxSave, setIdxSave] = useState<string>('')

	const [, setIsAdding] = useState(false)

	const handleAddType = async () => {
		setIsAdding(true)
		try {
			const newIdResponse = await getNewId().unwrap()
			await handleSaveType(Number(newIdResponse.id))
			await refetchTicketTypes()
			return newIdResponse.id
		} catch (error) {
			console.error('Error adding new ticket type:', error)
		} finally {
			setIsAdding(false)
		}
	}

	const handleSaveType = async (index: number) => {
		const formData = new FormData()
		formData.append('id', String(index))
		formData.append('title', '')
		formData.append('desc', '')
		formData.append('earlyDayLimit', '0')
		formData.append('earlySaleCount', '0')
		formData.append('guestsCount', '0')
		formData.append('hidden', booleanToNumberString(false))
		formData.append('price', '0.00')
		formData.append('refunddaylimit', '0')
		formData.append('saleGroup', '0')
		formData.append('saleKid', '0')
		formData.append('saleNow', '0')
		formData.append('ticketsLimit', '0')
		formData.append('use_early', booleanToNumberString(false))
		formData.append('use_group', booleanToNumberString(false))
		formData.append('use_kid', booleanToNumberString(false))
		formData.append('use_now', booleanToNumberString(false))
		formData.append('use_refund', booleanToNumberString(false))

		await saveNewTicket(formData).unwrap()
	}

	const handleRemoveType = async (index: number) => {
		await deleteTicketType(String(index)).unwrap()
	}

	const onSubmit: SubmitHandler<TypeTicketsInputs> = async (data) => {
		const idx = data.ticket_types.findIndex((type) => type.id === idxSave)
		const formData = new FormData()
		formData.append('id', String(data.ticket_types[idx].id))
		formData.append('title', data.ticket_types[idx].title ?? '')
		formData.append('desc', data.ticket_types[idx].desc ?? '')
		formData.append('earlyDayLimit', data.ticket_types[idx].earlyDayLimit ?? '')
		formData.append('earlySaleCount', data.ticket_types[idx].earlySaleCount ?? '')
		formData.append('guestsCount', data.ticket_types[idx].guestsCount ?? '')
		formData.append('hidden', booleanToNumberString(false))
		formData.append('price', data.ticket_types[idx].price ?? '')
		formData.append('refunddaylimit', data.ticket_types[idx].refunddaylimit ?? '')
		formData.append('saleGroup', data.ticket_types[idx].saleGroup ?? '')
		formData.append('saleKid', data.ticket_types[idx].saleKid ?? '')
		formData.append('saleNow', data.ticket_types[idx].saleNow ?? '')
		formData.append('ticketsLimit', data.ticket_types[idx].ticketsLimit ?? '')
		formData.append('use_early', booleanToNumberString(data.ticket_types[idx].use_early))
		formData.append('use_group', booleanToNumberString(data.ticket_types[idx].use_group))
		formData.append('use_kid', booleanToNumberString(data.ticket_types[idx].use_kid))
		formData.append('use_now', booleanToNumberString(data.ticket_types[idx].use_now))
		formData.append('use_refund', booleanToNumberString(data.ticket_types[idx].use_refund))

		await saveNewTicket(formData).unwrap()
		await refetchTicketTypes()
	}

	useEffect(() => {
		if (ticketTypes) {
			methods.reset({ ...(ticketTypes as TypeTicketsInputs) })
		}
	}, [ticketTypes, methods])

	return (
		<AdminContent className={styles.typeTicketsPage} $backgroundColor='#fff' $padding='0 35px 30px'>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)} noValidate autoComplete='off'>
					{ticketTypes?.ticket_types.map((type, idx) => {
						return (
							<TicketSection
								key={type.id}
								index={idx}
								removeId={Number(type.id)}
								removeHandle={handleRemoveType}
								setIdx={setIdxSave}
							/>
						)
					})}
					<FlexRow>
						<AdminButton
							as='button'
							type='button'
							$height='40px'
							$fontSize='14px'
							$padding='0px 24px'
							onClick={() => {
								setAction('save')
								void handleAddType()
							}}
							className={styles.addBtn}
						>
							<AddTicketBtnSVG />
							{'Добавить еще один вид билета'}
						</AdminButton>
					</FlexRow>
				</form>
			</FormProvider>
		</AdminContent>
	)
}
