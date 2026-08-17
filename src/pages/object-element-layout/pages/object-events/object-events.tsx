import { Helmet } from 'react-helmet-async'

import { Container } from 'src/UI/Container/Container'
import { AdminContent } from 'src/components/admin-content/admin-content'
import { EventElements } from './components/event-elements/event-elements'

import styles from './index.module.scss'

export const ObjectEvents = () => {
	return (
		<>
			<Helmet>
				<title>События</title>
			</Helmet>
			<AdminContent $padding='0' $backgroundColor='#ffffff'>
				<Container $padding='33px 20px 20px 28px' $paddingMobile='33px 20px 20px 28px'>
					<h3 className={styles.title}>События</h3>
				</Container>
				<EventElements />
			</AdminContent>
		</>
	)
}
