import { type TooltipContentProps, type TooltipProps } from 'recharts'

import styles from './index.module.scss'

export const CustomTooltip: React.FC<
	TooltipContentProps<number, string> & TooltipProps<number, string>
> = ({ active, payload, label }) => {
	if (active && payload?.length) {
		const revenueData = payload.find((item: { dataKey: string }) => item.dataKey === 'revenue')
		const refundData = payload.find((item: { dataKey: string }) => item.dataKey === 'refunds')
		const soldCountData = payload.find((item: { dataKey: string }) => item.dataKey === 'soldCount')
		const refundCountData = payload.find(
			(item: { dataKey: string }) => item.dataKey === 'refundCount',
		)

		return (
			<div className={styles.customTooltip}>
				{revenueData && (
					<p className={styles.element}>
						Билеты: <strong>{revenueData.value}</strong> ₽ ({soldCountData?.value || 0} шт.)
					</p>
				)}
				{refundData && (
					<p className={styles.element}>
						Возвраты: <strong>{refundData.value}</strong> ₽ ({refundCountData?.value || 0} шт.)
					</p>
				)}
				<p className={styles.element}>
					Всего: <strong>{revenueData.value - refundData.value}</strong> ₽
				</p>
			</div>
		)
	}

	return null
}
