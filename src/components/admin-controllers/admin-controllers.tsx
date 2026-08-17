import { type FC } from 'react'

import { AdminButton } from 'src/UI/AdminButton/AdminButton'

import styled from 'styled-components'

type AdminControllersProps = {
	outLink?: string
	variant?: '1' | '2' | '3' | '4' | '5'
	isSent?: boolean
	actionHandler: (action: 'apply' | 'save') => void
}

type AdminStyledBtns = {
	$margin?: string
}

const StyledAdminControllers = styled.section<AdminStyledBtns>`
	margin: ${({ $margin }) => $margin ?? '35px 0 0 0'};
	display: flex;
	gap: 20px;
	flex-wrap: wrap;

	._extreme {
		margin-left: auto;
	}
`

export const AdminControllers: FC<AdminControllersProps> = ({
	outLink,
	variant = '1',
	isSent = false,
	actionHandler,
	...props
}) => {
	const renderButtonsVariant = (variant: AdminControllersProps['variant']) => {
		switch (variant) {
			case '1':
				return (
					<>
						<AdminButton
							as='button'
							type='submit'
							$height='40px'
							$variant={isSent ? 'sent' : 'primary'}
							onClick={() => actionHandler('apply')}
						>
							{isSent ? 'Изменения сохранены' : 'Применить и продолжить'}
						</AdminButton>
						<AdminButton
							as='button'
							type='submit'
							$variant='light'
							$height='40px'
							onClick={() => actionHandler('save')}
						>
							Сохранить и выйти
						</AdminButton>
					</>
				)
			case '2':
				return (
					<>
						<AdminButton
							as='button'
							type='submit'
							$height='40px'
							$variant={isSent ? 'sent' : 'primary'}
							onClick={() => actionHandler('apply')}
						>
							{isSent ? 'Изменения сохранены' : 'Применить и продолжить'}
						</AdminButton>
						<AdminButton
							as='button'
							type='submit'
							$variant='light'
							$height='40px'
							onClick={() => actionHandler('save')}
						>
							Сохранить и выйти
						</AdminButton>
						<AdminButton
							className='_extreme'
							as='link'
							to={outLink}
							$variant='cancel'
							$height='40px'
						>
							Отменить изменения
						</AdminButton>
					</>
				)
			case '3':
				return (
					<AdminButton
						as='button'
						type='submit'
						$variant={isSent ? 'sent' : 'primary'}
						$height='40px'
						onClick={() => actionHandler('apply')}
					>
						{isSent ? 'Изменения сохранены' : 'Применить и продолжить'}
					</AdminButton>
				)
			case '4':
				return (
					<>
						<AdminButton
							as='button'
							type='submit'
							$variant={isSent ? 'sent' : 'primary'}
							$height='40px'
							onClick={() => actionHandler('apply')}
						>
							{isSent ? 'Изменения сохранены' : 'Применить и продолжить'}
						</AdminButton>
						<AdminButton
							as='button'
							type='submit'
							$variant='light'
							$height='40px'
							onClick={() => actionHandler('save')}
						>
							Сохранить и выйти
						</AdminButton>
					</>
				)
			case '5':
				return (
					<AdminButton
						as='button'
						type='submit'
						$variant={isSent ? 'sent' : 'primary'}
						$height='40px'
						onClick={() => actionHandler('apply')}
					>
						{isSent ? 'Изменения сохранены' : 'Сохранить'}
					</AdminButton>
				)
		}
	}

	return <StyledAdminControllers {...props}>{renderButtonsVariant(variant)}</StyledAdminControllers>
}
