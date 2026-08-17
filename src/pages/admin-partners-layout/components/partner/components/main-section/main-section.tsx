import { type PartnerCheckBoxesInfo } from 'src/types/partners'
import { type FC } from 'react'

import { AdminSection } from 'src/components/admin-section/admin-section'
import { ControlledInput } from 'src/components/controlled-input/controlled-input'
import { FlexRow } from 'src/components/flex-row/flex-row'
import { ReactDropzone } from 'src/components/react-dropzone/react-dropzone'
import { Disclaimer } from './components/disclaimer/disclaimer'
import { CustomText } from 'src/components/custom-text/custom-text'
import { PartnerVidsSection } from './components/partnerVids/partnerVids'
import { PartnerTypesSection } from './components/partnerTypes/partnerTypes'
import { type ImageItemWithText } from 'src/types/photos'

type MainSectionProps = {
	partnerVids?: PartnerCheckBoxesInfo[]
	partnerTypes?: PartnerCheckBoxesInfo[]
	photo?: ImageItemWithText[]
}

export const MainSection: FC<MainSectionProps> = ({
	partnerVids = [],
	partnerTypes = [],
	photo,
}) => {
	return (
		<AdminSection isBlock={false}>
			<ControlledInput
				name='title'
				label='Название партнера *'
				placeholder='Введите название'
				maxWidth='1140px'
				margin='0 0 20px 0'
			/>
			<CustomText $fontSize='14px' $fontWeight='600' $margin='0 0 18px'>
				Виды партнерства (возможен выбор нескольких видов)
			</CustomText>
			<FlexRow $margin='0 0 40px' $direction='row' $gap='45px'>
				<PartnerVidsSection partnerVids={partnerVids} />
				<Disclaimer />
			</FlexRow>
			<CustomText $fontSize='14px' $fontWeight='600' $margin='0 0 18px'>
				Тип организации по роду деятельности (возможен выбор нескольких типов)
			</CustomText>
			<FlexRow $margin='0 0 40px' $direction='row' $gap='45px'>
				<PartnerTypesSection partnerTypes={partnerTypes} />
				<Disclaimer />
			</FlexRow>
			<ControlledInput
				name='itemlink'
				label='Ссылка на сайт партнера *'
				placeholder='Введите url, начиная с http://'
				maxWidth='1140px'
				margin='0 0 40px 0'
			/>
			<ReactDropzone
				label='Логотип партнера *'
				name='logoPartner'
				prompt='соотношение сторон 1:1 или 3:4, JPEG, PNG'
				accept={{ 'image/png': ['.png'], 'image/jpeg': ['.jpeg'] }}
				margin='0 0 40px 0'
				previewVariant='sm-img'
				imgtype='partners'
				fileImages={photo}
			/>
		</AdminSection>
	)
}
