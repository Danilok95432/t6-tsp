import React from 'react'
import {
	ComposedChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Bar,
	Line,
	ResponsiveContainer,
	type MouseHandlerDataParam,
} from 'recharts'
import './index.scss'
import { CustomXAxisTick } from './components/custom-tick/custom-tick'
import { CustomTooltip } from './components/custom-tooltip/custom-tooltip'
import { CustomLegend } from './components/custom-legend/custom-legend'

export interface ChartDataItem {
	date: string
	revenue: number // сумма выручки
	refunds: number // сумма возвратов
	soldCount: number // количество проданных
	refundCount: number // количество возвратов
}

export interface ChartColors {
	revenueBar: string
	refundBar: string
	soldLine: string
	refundLine: string
}

interface RevenueChartProps {
	data: ChartDataItem[]
	colors?: ChartColors
}

const defaultColors: ChartColors = {
	revenueBar: '#7CD2E5',
	refundBar: '#FFD0CE',
	soldLine: '#0099BA',
	refundLine: '#FF5356',
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, colors = defaultColors }) => {
	const [activeIndex, setActiveIndex] = React.useState<number | string | null>(null)

	const handleMove = (e: MouseHandlerDataParam) => {
		const index = e?.activeTooltipIndex
		if (index !== undefined && (typeof index === 'number' || typeof index === 'string')) {
			setActiveIndex(index)
		}
	}

	const handleLeave = () => {
		setActiveIndex(null)
	}
	return (
		<div className='wrapper'>
			<ResponsiveContainer width='100%' height={650}>
				<ComposedChart
					data={data}
					barCategoryGap='20%'
					barGap={-100}
					onMouseMove={handleMove}
					onMouseLeave={handleLeave}
				>
					<CartesianGrid strokeDasharray='0' stroke='#DDDDDD' vertical={true} horizontal={true} />
					<XAxis
						dataKey='date'
						axisLine={false}
						tickLine={false}
						tick={(tickProps) => <CustomXAxisTick {...tickProps} activeIndex={activeIndex} />}
					/>
					<YAxis
						yAxisId='left'
						orientation='left'
						tick={{ fill: '#222', fontWeight: 700 }}
						label={{
							value: 'Выручка ₽',
							angle: -90,
							position: 'insideLeft',
							fontWeight: 'bold',
							fill: '#222',
						}}
					/>
					<YAxis
						yAxisId='right'
						orientation='right'
						tick={{ fill: '#222', fontWeight: 700 }}
						label={{
							value: 'Продано билетов',
							angle: 90,
							position: 'insideRight',
							fontWeight: 'bold',
							fill: '#222',
						}}
					/>
					<Tooltip<number, string>
						contentStyle={{
							backgroundColor: '#fff',
							border: '1px solid #ddd',
							borderRadius: '8px',
							fontSize: '13px',
						}}
						content={(tooltipProps) => <CustomTooltip {...tooltipProps} />}
					/>
					<Legend wrapperStyle={{ bottom: '-15px' }} content={<CustomLegend />} />

					{/* Столбцы */}
					<Bar
						yAxisId='left'
						dataKey='revenue'
						name='Билеты, сумма выручки'
						barSize={100}
						fill={colors.revenueBar}
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						yAxisId='left'
						dataKey='refunds'
						name='Возвраты, сумма'
						barSize={100}
						fill={colors.refundBar}
						radius={[4, 4, 0, 0]}
					/>

					{/* Линии */}
					<Line
						yAxisId='right'
						type='monotone'
						dataKey='soldCount'
						name='Билеты, количество проданных'
						stroke={colors.soldLine}
						strokeWidth={2}
						dot={{ r: 4, fill: '#fff', stroke: colors.soldLine, strokeWidth: 2 }}
						activeDot={{ r: 5 }}
					/>
					<Line
						yAxisId='right'
						type='monotone'
						dataKey='refundCount'
						name='Возвраты, количество'
						stroke={colors.refundLine}
						strokeWidth={2}
						dot={{ r: 4, fill: '#fff', stroke: colors.refundLine, strokeWidth: 2 }}
						activeDot={{ r: 5 }}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
}

export default RevenueChart
