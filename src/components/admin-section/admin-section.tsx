import { type FC, type ReactNode } from 'react'

import cn from 'classnames'

import { AdminSwitcher } from 'src/components/admin-switcher/admin-switcher'
import { useFormContext } from 'react-hook-form'

import styles from './index.module.scss'
import { FlexRow } from '../flex-row/flex-row'
import { CloseSvg } from 'src/UI/icons/closeSVG'

type AdminSectionProps = {
	children: ReactNode
	additionalNodeForHead?: ReactNode
	sectionName?: string
	className?: string
	innerClassName?: string
	headSectionClassName?: string
	titleText?: string
	titleStyleClass?: string
	isBlock?: boolean
	noBorder?: boolean
	fullSection?: boolean
	checkBoxSection?: ReactNode
	close?: (index: number) => Promise<void>
	idxClose?: number
}

export const AdminSection: FC<AdminSectionProps> = ({
	children,
	sectionName,
	className,
	innerClassName,
	titleText,
	headSectionClassName,
	isBlock = true,
	noBorder = false,
	additionalNodeForHead,
	titleStyleClass,
	fullSection = false,
	checkBoxSection,
	close,
	idxClose = 0,
}) => {
	const { watch } = useFormContext()
	const isChecked = sectionName ? watch(sectionName) : true
	if (fullSection) {
		return (
			<section className={cn(styles.fullAdminSection, { [styles._noBlock]: !isBlock }, className)}>
				<div
					className={cn(styles.sectionHead, headSectionClassName, {
						[styles._activeSection]: sectionName ? !!watch(sectionName) : false,
					})}
				>
					<FlexRow className={styles.titleSectionRow}>
						{sectionName ? (
							<AdminSwitcher name={sectionName}>{titleText}</AdminSwitcher>
						) : (
							titleText && (
								<h2
									className={cn(
										styles.singleTitle,
										{ [styles.noBorderBottom]: noBorder },
										{ [styles.titleWithNoBorder]: noBorder },
										titleStyleClass,
									)}
								>
									{titleText}
								</h2>
							)
						)}
						{checkBoxSection}
						{additionalNodeForHead}
					</FlexRow>
					{close && (
						<div className={styles.closeBtn} onClick={async () => await close(idxClose)}>
							<CloseSvg />
						</div>
					)}
				</div>

				{isChecked && (
					<div
						className={cn(
							innerClassName,
							{ [styles.switchedContentWrapper]: sectionName },
							styles.innerClass,
						)}
					>
						{children}
					</div>
				)}
			</section>
		)
	} else
		return (
			<section className={cn(styles.adminSection, { [styles._noBlock]: !isBlock }, className)}>
				<div
					className={cn(styles.sectionHead, headSectionClassName, {
						[styles._activeSection]: sectionName ? !!watch(sectionName) : false,
					})}
				>
					{sectionName ? (
						<AdminSwitcher name={sectionName}>{titleText}</AdminSwitcher>
					) : (
						titleText && (
							<h2
								className={cn(
									styles.singleTitle,
									{ [styles.noBorderBottom]: noBorder },
									{ [styles.titleWithNoBorder]: noBorder },
									titleStyleClass,
								)}
							>
								{titleText}
							</h2>
						)
					)}
					{additionalNodeForHead}
				</div>

				{isChecked && (
					<div className={cn(innerClassName, { [styles.switchedContentWrapper]: sectionName })}>
						{children}
					</div>
				)}
			</section>
		)
}
