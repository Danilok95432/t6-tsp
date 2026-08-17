import { AdminSection } from 'src/components/admin-section/admin-section'

import styles from './index.module.scss'
import { ControlledCheckbox } from 'src/components/controlled-checkbox/controlled-checkbox'
import { AdminRoute } from 'src/routes/admin-routes/consts'

export const PaymentSection = () => {
	return (
		<AdminSection
			titleText='Агентская схема оплаты'
			fullSection
			checkBoxSection={
				<ControlledCheckbox
					className={styles.checkBox}
					name='auto'
					disabled
					autoActive
					value={true}
					label='Подключена агентская (стандартная) схема оплаты'
					type={'checkbox'}
				/>
			}
		>
			<p className={styles.text}>
				Агентская схема получения платы означает, что непосредственно с гостя средства взимает Агент
				(ООО «НПО «ТАУ»), Ваше юридическое или физическое лицо получает сумму, собранную в качестве
				платы за билеты непосредственно на расчетный счет, за вычетом операционных расходов и
				комиссии Агента.
			</p>
			<p className={styles.text}>
				<strong className={styles.bold}>ВНИМАНИЕ!</strong> Агентская схема не предусматривает
				взимания оплаты билетов за наличный расчет!
			</p>
			<p className={styles.text}>
				Расчетный счет, сумма комиссии, порядок и очередность перечесления средств указаны в
				агентском Договоре, а также{' '}
				<a className={styles.link} href={`/${AdminRoute.AdminOrg}/${AdminRoute.OrgInfo}`}>
					в разделе {'"Организатор"'}
				</a>{' '}
				Вашего кабинета в настоящей системе управления. Вы можете выбрать схему оплаты для каждого
				Вашего события в отдельности. Агентская схема подключена к каждому событию по умолчанию.
			</p>
			<ControlledCheckbox
				className={styles.checkBox}
				name='use_card_pay'
				type={'checkbox'}
				label='Подключить оплату банковской картой'
				$margin='20px 0 20px 0'
			/>
			<ControlledCheckbox
				name='use_sbp'
				className={styles.checkBox}
				type={'checkbox'}
				label='Подключить оплату через систему быстрых платежей (СБП, 15 крупнейших банков России)'
				$margin='0 0 20px 0'
			/>
			<ControlledCheckbox
				name='use_sber_pay'
				className={styles.checkBox}
				type={'checkbox'}
				label='Подключить оплату через SberPay (приложение Сбера)'
				$margin='0 0 20px 0'
			/>
			<p className={styles.text}>
				Для подключения дополнительной (альтернативной или социальной) системы оплаты,{' '}
				<a className={styles.link} href='#'>
					свяжитесь с нашим коммерческим отделом.
				</a>
			</p>
		</AdminSection>
	)
}
