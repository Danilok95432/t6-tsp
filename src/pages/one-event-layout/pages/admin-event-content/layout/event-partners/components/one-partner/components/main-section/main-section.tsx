import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledSelect } from 'src/components/controlled-select/controlled-select'
import { type PartnerCheckBoxesInfo } from 'src/types/partners'
import { type SelOption } from 'src/types/select'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { Disclaimer } from './components/disclaimer/disclaimer'
import { CustomText } from 'src/components/custom-text/custom-text'
import { type FC } from 'react'
import { PartnerEventTypesSection } from './components/partnerTypes/partnerTypes'

type MainSectionProps = {
	partnerTypes?: PartnerCheckBoxesInfo[]
	partnersList?: SelOption[]
}

export const MainSection: FC<MainSectionProps> = ({ partnerTypes = [], partnersList = [] }) => {
	return (
		<AdminSection isBlock={false}>
			<ControlledSelect
				label='Название партнера *'
				name='partners_list'
				margin='0 0 10px 0'
				selectOptions={
					partnersList.length > 0 ? partnersList : [{ label: 'Не выбрано', value: '0' }]
				}
			/>
			<CustomText $fontSize='14px' $fontWeight='400' $margin='0 0 40px'>
				Введите часть названия партнера и выберите из предложенного системой списка
			</CustomText>
			<CustomText $fontSize='14px' $fontWeight='600' $margin='0 0 18px'>
				Виды партнерства (возможен выбор нескольких видов)
			</CustomText>
			<FlexRow $margin='0 0 40px' $direction='row' $gap='45px'>
				<PartnerEventTypesSection partnerTypes={partnerTypes} />
				<Disclaimer />
			</FlexRow>
		</AdminSection>
	)
}
