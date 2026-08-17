import { type FC } from 'react'

import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import { setActive } from 'src/helpers/utils'
import { adminMenuItems } from 'src/modules/admin-navigation/consts'
import { AdminNavBtn } from 'src/components/admin-nav-btn/admin-nav-btn'

import styles from './index.module.scss'
import { useAppSelector } from 'src/hooks/store'
import { isAuthUser } from 'src/store/auth/auth.selectors'

export const AdminNavigation: FC = () => {
	const isAuth = useAppSelector(isAuthUser)

	return (
		<aside className={styles.adminNavigation}>
			{/* <AdminButton
				as='route'
				to={`${AdminRoute.AdminExpressEvent}/${AdminRoute.ExpressMain}`}
				className={styles.express}
			>
				<AdminExpressEventIconSVG />
				<p>Экспресс-событие</p>
			</AdminButton> */}
			<ul className={styles.adminNavigationList}>
				{adminMenuItems.map((navItem) => (
					<li
						className={cn({ [styles._disableLink]: navItem.disable ?? !isAuth })}
						key={navItem.link}
					>
						{navItem.childItems ? (
							<AdminNavBtn
								title={navItem.title}
								icon={navItem.icon}
								childNavItems={navItem.childItems}
							/>
						) : (
							<NavLink
								className={({ isActive }) => setActive(isActive, styles.activeLink)}
								to={navItem.link}
							>
								{navItem.icon}
								{navItem.title}
							</NavLink>
						)}
					</li>
				))}
			</ul>
		</aside>
	)
}
