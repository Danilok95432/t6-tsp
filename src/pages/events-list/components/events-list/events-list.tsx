import { Helmet } from 'react-helmet-async'
import { EventsTable } from 'src/pages/events-list/components/events-list/components/events-table/events-table'

export const EventsList = () => {
	return (
		<>
			<Helmet>
				<title>Номинации</title>
			</Helmet>
			<h3>Номинации</h3>
			<EventsTable />
		</>
	)
}
