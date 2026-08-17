import React, { type FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AdminRoute } from 'src/routes/admin-routes/consts'
import { AdminLayout } from 'src/routes/admin-layout/admin-layout'

import { AdminNewsLayout } from 'src/pages/admin-news/admin-news-layout'
import { NewsList } from 'src/pages/admin-news/components/news/components/news-list/news-list'
import { OneNews } from 'src/pages/admin-news/components/news/components/one-news/one-news'
import { NewsLayout } from 'src/pages/admin-news/components/news/news-layout'
import { VideosLayout } from 'src/pages/admin-news/components/videos/videos-layout'
import { VideosList } from 'src/pages/admin-news/components/videos/components/videos-list/videos-list'
import { OneVideo } from 'src/pages/admin-news/components/videos/components/one-video/one-video'
import { RequestsLayout } from 'src/pages/admin-news/components/requests/requests-layout'
import { RequestsList } from 'src/pages/admin-news/components/requests/components/requests-list/requests-list'
import { OneRequest } from 'src/pages/admin-news/components/requests/components/one-request/one-request'
import { OpenRequest } from 'src/pages/admin-news/components/requests/components/open-request/open-request'

import { EventsList } from 'src/pages/events-list/components/events-list/events-list'
import { OneEventLayout } from 'src/pages/one-event-layout/one-event-layout'
import { AdminEventProfile } from 'src/pages/one-event-layout/pages/admin-event-profile/admin-event-profile'
import { AdminEventContacts } from 'src/pages/one-event-layout/pages/admin-event-contacts/admin-event-contacts'
import { AdminEventPartnersLayout } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-partners/admin-event-partners-layout'
import { AdminEventHistory } from 'src/pages/one-event-layout/pages/admin-event-history/admin-event-history'

import { CommunityLayout } from 'src/pages/community-layout/community-layout'
import { AdminCommunityAbout } from 'src/pages/community-layout/pages/admin-community-about/admin-community-about'
import { AdminCommunityGames } from 'src/pages/community-layout/pages/admin-community-games/admin-community-games'

import { AdminObjects } from 'src/pages/admin-objects/admin-objects'
import { AdminPartnersLayout } from 'src/pages/admin-partners-layout/admin-partners-layout'
import { ObjectElementLayout } from 'src/pages/object-element-layout/object-element-layout'
import { ObjectInfo } from 'src/pages/object-element-layout/pages/object-info/object-info'
import { ObjectNews } from 'src/pages/object-element-layout/pages/object-news/object-news'
import { ObjectHistory } from 'src/pages/object-element-layout/pages/object-history/object-history'
import { ObjectEvents } from 'src/pages/object-element-layout/pages/object-events/object-events'
import { ObjectGallery } from 'src/pages/object-element-layout/pages/object-gallery/object-gallery'
import { ObjectLocation } from 'src/pages/object-element-layout/pages/object-location/object-location'

import { AdminSupport } from 'src/pages/admin-support/admin-support'
import { AdminSettings } from 'src/pages/admin-settings/admin-settings'
import { Partner } from 'src/pages/admin-partners-layout/components/partner/partner'
import { PartnersElements } from 'src/pages/admin-partners-layout/components/partners-elements/partners-elements'
import { AdminQuestionsLayout } from 'src/pages/admin-questions/admin-questions-layout'
import { QuestionsElements } from 'src/pages/admin-questions/components/questions-elements/questions-elements'
import { Question } from 'src/pages/admin-questions/components/question/question'
import { ObjectVideos } from 'src/pages/object-element-layout/pages/object-videos/object-videos'
import { AdminEventsLayout } from 'src/pages/events-list/admin-events-layout'
import { CiclesList } from 'src/pages/events-list/components/cicles-list/cicles-list'
import { CicleInfo } from 'src/pages/events-list/components/cicles-list/components/cicle-info/cicle-info'
import { CiclesTable } from 'src/pages/events-list/components/cicles-list/components/cicle-table/cicles-table'
import { AdminEventProgramsLayout } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-program/admin-event-programs-layout'
import { VisitorsEventLayout } from 'src/pages/one-event-layout/pages/admin-event-visitors/visitors-event-layout'
import { OneTicket } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/registrations-page/components/one-ticket/one-ticket'
import { AdminEventContentLayout } from 'src/pages/one-event-layout/pages/admin-event-content/admin-event-content-layout'
import { AdminEventContent } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-content/admin-event-content'
import { PartnerElements } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-partners/components/partner-elements/partner-elements'
import { OnePartner } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-partners/components/one-partner/one-partner'
import { AdminEventRules } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-rules/admin-event-rules'
import { AdminEventNews } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-news/admin-event-news'
import { AdminEventVideos } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-videos/admin-event-videos'
import { AdminProgramLayout } from 'src/pages/one-event-layout/pages/admin-event-program/admin-program-layout'
import { ProgramElements } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-program/components/program-elements/program-elements'
import { OneProgram } from 'src/pages/one-event-layout/pages/admin-event-content/layout/event-program/components/one-program/one-program'
import { AdminEventParticipantsLayout } from 'src/pages/one-event-layout/pages/admin-event-program/layout/participants/admin-event-participants-layout'
import { SettingsEventLayout } from 'src/pages/one-event-layout/pages/admin-event-settings/settings-event-layout'
import { RegistrationPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/registration-page/registration-page'
import { TypeTicketsPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/type-tickets-page/type-tickets-page'
import { TypeParticipantsPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/type-participants-page/type-participants-page'
import { TypeGroupsPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/type-groups-page/type-groups-page'
import { GatesPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/gates-page/gates-page'
import { ServicesEventLayout } from 'src/pages/one-event-layout/pages/admin-event-services/services-event-layout'
import { ListPage } from 'src/pages/one-event-layout/pages/admin-event-services/layout/list-page/list-page'
import { ServicesPage } from 'src/pages/one-event-layout/pages/admin-event-services/layout/services-page/services-page'
import { PointsPage } from 'src/pages/one-event-layout/pages/admin-event-services/layout/points-page/points-page'
import { RecipientsPage } from 'src/pages/one-event-layout/pages/admin-event-services/layout/recipients-page/recipients-page'
import { StatisticEventLayout } from 'src/pages/one-event-layout/pages/admin-event-statistic/statistic-event-layout'
import { InspectorsElementsStatistic } from 'src/pages/one-event-layout/pages/admin-event-statistic/layout/inspectors-page/components/inspectors-elements/inspectors-elements'
import { PaymentsPage } from 'src/pages/one-event-layout/pages/admin-event-settings/layout/payments-page/payments-page'
import { StatisticGatesPage } from 'src/pages/one-event-layout/pages/admin-event-statistic/layout/gates-page/gates-page'
import { SMSPage } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/sms-page/sms-page'
import { SMSElements } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/sms-page/components/sms-elements/sms-elements'
import { AdminOrgLayout } from 'src/pages/admin-org/admin-org-layout'
import { AdminGuestsLayout } from 'src/pages/admin-guests/admin-guests-layout'
import { AdminStatisticLayout } from 'src/pages/admin-statistic/admin-statistic-layout'
import { OrgFinances } from 'src/pages/admin-org/pages/org-finances/org-finances'
import { OrgStatistic } from 'src/pages/admin-org/pages/org-statistic/org-statistic'
import { OrgProfile } from 'src/pages/admin-org/pages/org-profile/org-profile'
import { PlacementEventLayout } from 'src/pages/one-event-layout/pages/admin-event-placement/placement-event-layout'
import { OnePersonStatistic } from 'src/pages/one-event-layout/pages/admin-event-statistic/layout/one-person-statistic/one-person-statistic'
import { AdminExpressEventLayout } from 'src/pages/admin-express-event/admin-express-event-layout'
import { StepMain } from 'src/pages/admin-express-event/layout/step-main/step-main'
import { StepInfo } from 'src/pages/admin-express-event/layout/step-info/step-info'
import { StepTickets } from 'src/pages/admin-express-event/layout/step-tickets/step-tickets'
import { StepPass } from 'src/pages/admin-express-event/layout/step-pass/step-pass'
import { StepPlacement } from 'src/pages/admin-express-event/layout/step-placement/step-placement'
import { PurchasedTicketsPage } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/purchased-tickets-page/purchased-tickets-page'
import { PurchasedTicketsElements } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/purchased-tickets-page/components/purchased-tickets-elements/purchased-tickets-elements'
import { EntersListPage } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/enters-list-page/enters-list-page'
import { EntersListElements } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/enters-list-page/components/enters-list-elements/enters-list-elements'
import { SaleStatPage } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/sale-stat-page/sale-stat-page'
import { SaleStatElements } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/sale-stat-page/components/sale-stat-elements/sale-stat-elements'
import { OrgProfileInfo } from 'src/pages/admin-org/pages/org-profile/layout/org-info/org-profile-info'
import { OrgDetails } from 'src/pages/admin-org/pages/org-profile/layout/org-details/org-details'
import { OrgAuth } from 'src/pages/admin-org/pages/org-profile/layout/org-auth/org-auth'
import { OrgFinancesStat } from 'src/pages/admin-org/pages/org-finances/layout/org-finances-stat/org-finances-stat'
import { OrgIncome } from 'src/pages/admin-org/pages/org-finances/layout/org-income/org-income'
import { OrgReqRefund } from 'src/pages/admin-org/pages/org-finances/layout/org-req-refund/org-req-refund'
import { OrgRefund } from 'src/pages/admin-org/pages/org-finances/layout/org-refund/org-refund'
import { AdminEventPass } from 'src/pages/one-event-layout/pages/admin-event-pass/admin-event-pass'
import { RegistrationsElements } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/registrations-page/components/registrations-elements/registrations-elements'
import { RegistrationsPage } from 'src/pages/one-event-layout/pages/admin-event-visitors/layout/registrations-page/registrations-page'
import { LocationsList } from 'src/pages/events-list/components/locations-list/locations-list'
import { LocationsTable } from 'src/pages/events-list/components/locations-list/components/location-table/location-table'
import { LocationInfo } from 'src/pages/events-list/components/locations-list/components/location-info/location-info'
import { OrgFond } from 'src/pages/admin-org/pages/org-fond/org-fond'
import { AdminCommunityDocuments } from 'src/pages/community-layout/pages/admin-community-documents/admin-community-documents'
import { AdminCommunityHistory } from 'src/pages/community-layout/pages/admin-community-history/admin-community-history'
import { AdminCommunityTraditions } from 'src/pages/community-layout/pages/admin-community-traditions/admin-community-traditions'
import { TraditionHistory } from 'src/pages/tradition-element-layout/pages/tradition-history/tradition-history'
import { TraditionInfo } from 'src/pages/tradition-element-layout/pages/tradition-info/tradition-info'
import { TraditionElementLayout } from 'src/pages/tradition-element-layout/tradition-element-layout'
import { AdminCatalogLayout } from 'src/pages/admin-catalog/admin-catalog-layout'
import { TypesPage } from 'src/pages/admin-catalog/layout/types-page/types-page'
import { TypesList } from 'src/pages/admin-catalog/layout/types-page/components/list/types-list'
import { MakersPage } from 'src/pages/admin-catalog/layout/makers-page/makers-page'
import { MakersList } from 'src/pages/admin-catalog/layout/makers-page/components/list/makers-list'
import { CategoriesPage } from 'src/pages/admin-catalog/layout/categories-page/categories-page'
import { CategoriesList } from 'src/pages/admin-catalog/layout/categories-page/components/list/categories-list'
import { GoodsPage } from 'src/pages/admin-catalog/layout/goods-page/goods-page'
import { GoodsList } from 'src/pages/admin-catalog/layout/goods-page/components/list/goods-list'
import { AdminTradingLayout } from 'src/pages/admin-trading/admin-trading-layout'
import { OrdersPage } from 'src/pages/admin-trading/layout/orders-page/order-page'
import { OrdersList } from 'src/pages/admin-trading/layout/orders-page/components/list/orders-list'
import { RefundsPage } from 'src/pages/admin-trading/layout/refunds-page/refunds-page'
import { RefundsList } from 'src/pages/admin-trading/layout/refunds-page/components/list/refunds-list'
import { SalesPage } from 'src/pages/admin-trading/layout/sales-page/sales-page'
import { SalesList } from 'src/pages/admin-trading/layout/sales-page/components/list/sales-list'
import { OneType } from 'src/pages/admin-catalog/layout/types-page/components/one-item/type'
import { OneMaker } from 'src/pages/admin-catalog/layout/makers-page/components/one-item/maker'
import { OneCategory } from 'src/pages/admin-catalog/layout/categories-page/components/one-item/category'
import { OneGoods } from 'src/pages/admin-catalog/layout/goods-page/components/one-item/goods'
import { OneOrder } from 'src/pages/admin-trading/layout/orders-page/components/one-item/order'
import { AdminCustomersLayout } from 'src/pages/admin-customers/admin-customers-layout'
import { AllCustomersPage } from 'src/pages/admin-customers/layout/all-customers/all-customers-page'
import { AllCustomersList } from 'src/pages/admin-customers/layout/all-customers/list/all-customers-list'
import { OneCustomer } from 'src/pages/admin-customers/layout/all-customers/one-item/customer'
import { RegularCustomersPage } from 'src/pages/admin-customers/layout/regular-customers/regular-customers-page'
import { VIPCustomersPage } from 'src/pages/admin-customers/layout/vip-customers/vip-customers-page'
import { AdminMarketingLayout } from 'src/pages/admin-marketing/admin-marketing-layout'
import { MainInfoPartPage } from 'src/pages/admin-marketing/layout/main-info-part/main-info-part-page'
import { MainInfoList } from 'src/pages/admin-marketing/layout/main-info-part/list/main-info-list'
import { OneInfoItem } from 'src/pages/admin-marketing/layout/main-info-part/one-item/info-item'
import { AdMainPage } from 'src/pages/admin-marketing/layout/ad-main/ad-main-page'
import { DistributionPage } from 'src/pages/admin-marketing/layout/distribution/distribution-page'
import { AdList } from 'src/pages/admin-marketing/layout/ad-main/list/ad-list'
import { PromoItem } from 'src/pages/admin-marketing/layout/ad-main/promo-item/promo-item'
import { AdItem } from 'src/pages/admin-marketing/layout/ad-main/ad-item/ad-item'
import { RewardPage } from 'src/pages/admin-marketing/layout/ad-main/reward-item/reward-item'
import { RewardOneItem } from 'src/pages/admin-marketing/layout/ad-main/reward-item/components/reward-one-item/reward-one-item'
import { RewardList } from 'src/pages/admin-marketing/layout/ad-main/reward-item/components/reward-list/reward-list'
import { ReviewsPage } from 'src/pages/admin-marketing/layout/reviews/reviews-page'
import { ReviewsList } from 'src/pages/admin-marketing/layout/reviews/reviews-list/reviews-list'
import { OneReview } from 'src/pages/admin-marketing/layout/reviews/one-item/review'
import { DeletedOrdersPage } from 'src/pages/admin-trading/layout/deleted-orders-page/deleted-order-page'
import { DeletedOrdersList } from 'src/pages/admin-trading/layout/deleted-orders-page/components/list/orders-list'
import { DeletedOneOrder } from 'src/pages/admin-trading/layout/deleted-orders-page/components/one-item/order'

export const AdminRoutes: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<AdminLayout />}>
				<Route path={AdminRoute.Catalog} element={<AdminCatalogLayout />}>
					<Route path={AdminRoute.CatalogTypes} element={<TypesPage />}>
						<Route index element={<TypesList />} />
						<Route path=':id' element={<OneType />} />
					</Route>
					<Route path={AdminRoute.CatalogMakers} element={<MakersPage />}>
						<Route index element={<MakersList />} />
						<Route path=':id' element={<OneMaker />} />
					</Route>
					<Route path={AdminRoute.CatalogCategories} element={<CategoriesPage />}>
						<Route index element={<CategoriesList />} />
						<Route path=':id' element={<OneCategory />} />
					</Route>
					<Route path={AdminRoute.CatalogGoods} element={<GoodsPage />}>
						<Route index element={<GoodsList />} />
						<Route path=':id' element={<OneGoods />} />
					</Route>
				</Route>
				<Route path={AdminRoute.Trading} element={<AdminTradingLayout />}>
					<Route path={AdminRoute.TradingOrder} element={<OrdersPage />}>
						<Route index element={<OrdersList />} />
						<Route path=':id' element={<OneOrder />} />
					</Route>
					<Route path={AdminRoute.TradingDeletedOrder} element={<DeletedOrdersPage />}>
						<Route index element={<DeletedOrdersList />} />
						<Route path=':id' element={<DeletedOneOrder />} />
					</Route>
					<Route path={AdminRoute.TradingRefund} element={<RefundsPage />}>
						<Route index element={<RefundsList />} />
						<Route path=':id' element={<OneVideo />} />
					</Route>
					<Route path={AdminRoute.TradingSale} element={<SalesPage />}>
						<Route index element={<SalesList />} />
						<Route path=':id' element={<OneVideo />} />
					</Route>
				</Route>
				<Route path={AdminRoute.Customers} element={<AdminCustomersLayout />}>
					<Route path={AdminRoute.AllCustomers} element={<AllCustomersPage />}>
						<Route index element={<AllCustomersList />} />
						<Route path=':id' element={<OneCustomer />} />
					</Route>
					<Route path={AdminRoute.RegularCustomers} element={<RegularCustomersPage />}>
						<Route index element={<AllCustomersList />} />
						<Route path=':id' element={<OneCustomer />} />
					</Route>
					<Route path={AdminRoute.VIPCustomers} element={<VIPCustomersPage />}>
						<Route index element={<AllCustomersList />} />
						<Route path=':id' element={<OneCustomer />} />
					</Route>
				</Route>
				<Route path={AdminRoute.Marketing} element={<AdminMarketingLayout />}>
					<Route path={AdminRoute.MarketingAd} element={<AdMainPage />}>
						<Route index element={<AdList />} />
						<Route
							path={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdPromo}`}
							element={<PromoItem />}
						/>
						<Route
							path={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReklama}`}
							element={<AdItem />}
						/>
						<Route
							path={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}`}
							element={<RewardPage />}
						>
							<Route index element={<RewardList />} />
							<Route
								path={`/${AdminRoute.Marketing}/${AdminRoute.MarketingAd}/${AdminRoute.AdReward}/:id`}
								element={<RewardOneItem />}
							/>
						</Route>
					</Route>
					<Route path={AdminRoute.MarketingDistribution} element={<DistributionPage />} />
					<Route path={AdminRoute.MarketingInfo} element={<MainInfoPartPage />}>
						<Route index element={<MainInfoList />} />
						<Route path=':id' element={<OneInfoItem />} />
					</Route>
					<Route path={AdminRoute.MarketingReview} element={<ReviewsPage />}>
						<Route index element={<ReviewsList />} />
						<Route path=':id' element={<OneReview />} />
					</Route>
				</Route>

				<Route path={AdminRoute.AdminNews} element={<AdminNewsLayout />}>
					<Route path={AdminRoute.AdminNewsList} element={<NewsLayout />}>
						<Route index element={<NewsList />} />
						<Route path=':id' element={<OneNews />} />
					</Route>
					<Route path={AdminRoute.AdminVideosList} element={<VideosLayout />}>
						<Route index element={<VideosList />} />
						<Route path=':id' element={<OneVideo />} />
					</Route>
				</Route>
				<Route path={AdminRoute.AdminExpressEvent} element={<AdminExpressEventLayout />}>
					<Route path={AdminRoute.ExpressMain} element={<StepMain />} />
					<Route path={AdminRoute.ExpressInfo} element={<StepInfo />} />
					<Route path={AdminRoute.ExpressRegistration} element={<StepTickets />} />
					<Route path={AdminRoute.ExpressPasses} element={<StepPass />} />
					<Route path={AdminRoute.ExpressPlacement} element={<StepPlacement />} />
				</Route>
				<Route path={AdminRoute.AdminOrg} element={<AdminOrgLayout />}>
					<Route path={AdminRoute.OrgAward} element={<OrgProfile />}>
						<Route path={AdminRoute.OrgInfo} element={<OrgProfileInfo />} />
						<Route path={AdminRoute.OrgAuth} element={<OrgAuth />} />
						<Route path={AdminRoute.OrgDetails} element={<OrgDetails />} />
					</Route>
					<Route path={AdminRoute.OrgFond} element={<OrgFond />} />
					<Route path={AdminRoute.OrgStatistic} element={<OrgStatistic />} />
					<Route path={AdminRoute.OrgFinances} element={<OrgFinances />}>
						<Route path={AdminRoute.OrgStat} element={<OrgFinancesStat />} />
						<Route path={AdminRoute.OrgIncome} element={<OrgIncome />} />
						<Route path={AdminRoute.OrgReqRefund} element={<OrgReqRefund />} />
						<Route path={AdminRoute.OrgRefund} element={<OrgRefund />} />
					</Route>
				</Route>
				<Route path={AdminRoute.Guests} element={<AdminGuestsLayout />} />
				<Route path={AdminRoute.AdminStatistic} element={<AdminStatisticLayout />} />
				<Route path={AdminRoute.AdminNews} element={<AdminNewsLayout />}>
					<Route path={AdminRoute.AdminNewsList} element={<NewsLayout />}>
						<Route index element={<NewsList />} />
						<Route path=':id' element={<OneNews />} />
					</Route>
					<Route path={AdminRoute.AdminVideosList} element={<VideosLayout />}>
						<Route index element={<VideosList />} />
						<Route path=':id' element={<OneVideo />} />
					</Route>
					<Route path={AdminRoute.AdminRequestList} element={<RequestsLayout />}>
						<Route index element={<RequestsList />} />
						<Route path=':id' element={<OpenRequest />} />
						<Route path='new' element={<OneRequest />} />
					</Route>
				</Route>
				<Route path={AdminRoute.AdminAbout} element={<CommunityLayout />}>
					<Route index element={<AdminCommunityAbout />} />
					<Route path={AdminRoute.AdminAboutHistory} element={<AdminCommunityHistory />} />
					<Route path={AdminRoute.AdminAtmansTraditions} element={<AdminCommunityTraditions />} />
					<Route path={AdminRoute.AdminAtmansGames} element={<AdminCommunityGames />} />
					<Route path={AdminRoute.AdminAboutDocuments} element={<AdminCommunityDocuments />} />
				</Route>
				<Route path={AdminRoute.AdminTraditionElement} element={<TraditionElementLayout />}>
					<Route path={`${AdminRoute.AdminTraditionInfo}/:id`} element={<TraditionInfo />} />
					<Route path={`${AdminRoute.AdminTraditionHistory}/:id`} element={<TraditionHistory />} />
				</Route>
				<Route path={AdminRoute.AdminObject} element={<ObjectElementLayout />}>
					<Route path={`${AdminRoute.AdminObjInfo}/:id`} element={<ObjectInfo />} />
					<Route path={`${AdminRoute.AdminObjNews}/:id`} element={<ObjectNews />} />
					<Route path={`${AdminRoute.AdminObjHistory}/:id`} element={<ObjectHistory />} />
					<Route path={`${AdminRoute.AdminObjEvents}/:id`} element={<ObjectEvents />} />
					<Route path={`${AdminRoute.AdminObjGallery}/:id`} element={<ObjectGallery />} />
					<Route path={`${AdminRoute.AdminObjVideos}/:id`} element={<ObjectVideos />} />
					<Route path={`${AdminRoute.AdminObjLocation}/:id`} element={<ObjectLocation />} />
				</Route>
				<Route path={AdminRoute.AdminObjects} element={<AdminObjects />} />

				<Route path={AdminRoute.AdminEventLayout} element={<AdminEventsLayout />}>
					<Route path={AdminRoute.AdminEventsList} element={<EventsList />} />
					<Route path={AdminRoute.AdminCiclesList} element={<CiclesList />}>
						<Route index element={<CiclesTable />} />
						<Route path=':id' element={<CicleInfo />} />
					</Route>
					<Route path={AdminRoute.AdminLocationsList} element={<LocationsList />}>
						<Route index element={<LocationsTable />} />
						<Route path=':id' element={<LocationInfo />} />
					</Route>
				</Route>

				<Route path={AdminRoute.AdminEvent} element={<OneEventLayout />}>
					<Route path={`${AdminRoute.AdminEventProfile}/:id`} element={<AdminEventProfile />} />
					<Route path={`${AdminRoute.AdminEventSettings}/:id`} element={<SettingsEventLayout />}>
						<Route path={`${AdminRoute.Registration}`} element={<RegistrationPage />} />
						<Route path={`${AdminRoute.Tickets}`} element={<TypeTicketsPage />} />
						<Route path={`${AdminRoute.Payments}`} element={<PaymentsPage />} />
						<Route path={`${AdminRoute.Participants}`} element={<TypeParticipantsPage />} />
						<Route path={`${AdminRoute.Groups}`} element={<TypeGroupsPage />} />
						<Route path={`${AdminRoute.Gates}`} element={<GatesPage />} />
					</Route>
					<Route path={`${AdminRoute.AdminEventContacts}/:id`} element={<AdminEventContacts />} />
					<Route
						path={`${AdminRoute.AdminEventPlacement}/:id`}
						element={<PlacementEventLayout />}
					/>
					<Route path={`${AdminRoute.AdminEventContent}/:id`} element={<AdminEventContentLayout />}>
						<Route path={`${AdminRoute.AdminContent}`} element={<AdminEventContent />} />
						<Route path={`${AdminRoute.AdminEventPartners}`} element={<AdminEventPartnersLayout />}>
							<Route index element={<PartnerElements />} />
							<Route
								path={`${AdminRoute.AdminEventOnePartner}/:partnerId`}
								element={<OnePartner />}
							/>
						</Route>
						<Route path={`${AdminRoute.AdminEventRules}`} element={<AdminEventRules />} />
						<Route path={`${AdminRoute.AdminEventNews}`} element={<AdminEventNews />} />
						<Route path={`${AdminRoute.AdminEventVideos}`} element={<AdminEventVideos />} />
						<Route
							path={`${AdminRoute.AdminEventProgram}/:id`}
							element={<AdminEventProgramsLayout />}
						>
							<Route index element={<ProgramElements />} />
							<Route
								path={`${AdminRoute.AdminEventOneProgram}/:programId`}
								element={<OneProgram />}
							/>
							<Route
								path={`${AdminRoute.Participants}`}
								element={<AdminEventParticipantsLayout />}
							/>
						</Route>
					</Route>
					<Route path={`${AdminRoute.AdminEventProgram}/:id`} element={<AdminProgramLayout />}>
						<Route
							path={`${AdminRoute.AdminEventSubEvents}`}
							element={<AdminEventProgramsLayout />}
						>
							<Route index element={<ProgramElements />} />
							<Route
								path={`${AdminRoute.AdminEventOneProgram}/:programId`}
								element={<OneProgram />}
							/>
						</Route>
						<Route path={`${AdminRoute.Participants}`} element={<AdminEventParticipantsLayout />} />
					</Route>
					<Route path={`${AdminRoute.AdminEventHistory}/:id`} element={<AdminEventHistory />} />
					{/*
					<Route path={`${AdminRoute.AdminEventVisitors}/:id`} element={<VisitorsEventLayout />}>
						<Route path={`${AdminRoute.Tickets}`} element={<RegistrationsPage />}>
							<Route index element={<RegistrationsElements />} />
							<Route path=':subId' element={<OneTicket />} />
						</Route>
						<Route path={`${AdminRoute.Guests}`} element={<VisitorPage />}>
							<Route index element={<VisitorElements />} />
							<Route path='new' element={<OneVisitor />} />
							<Route path=':subId' element={<GuestView />} />
						</Route>
						<Route path={`${AdminRoute.Participants}`} element={<VisitorPage />}>
							<Route index element={<ParticipantElements />} />
							<Route path='new' element={<OneParticipant />} />
							<Route path=':subId' element={<ParticipantView />} />
						</Route>
						<Route path={`${AdminRoute.Groups}`} element={<GroupPage />}>
							<Route index element={<GroupElements />} />
							<Route path=':subId' element={<OneGroup />} />
						</Route>
						<Route path={`${AdminRoute.Pass}`} element={<PassPage />}>
							<Route index element={<PassElements />} />
						</Route>
						<Route path={`${AdminRoute.Requests}`} element={<RequestsPage />}>
							<Route index element={<RequestsElements />} />
							<Route path=':subId' element={<OneRequestList />} />
						</Route>
						<Route path={`${AdminRoute.Transport}`} element={<TransportPage />}>
							<Route index element={<TransportElements />} />
						</Route>
						<Route path={`${AdminRoute.Bracelets}`} element={<BraceletPage />}>
							<Route index element={<BraceletElements />} />
						</Route>
						<Route path={`${AdminRoute.Inspectors}`} element={<InspectorsVisitPage />}>
							<Route index element={<InspectorsElements />} />
							<Route path=':subId' element={<OneInspector />} />
						</Route>
					</Route>
					*/}
					<Route path={`${AdminRoute.AdminEventLists}/:id`} element={<VisitorsEventLayout />}>
						<Route
							path={`${AdminRoute.OnePersonStatistic}/:personId`}
							element={<OnePersonStatistic />}
						/>
						<Route path={`${AdminRoute.Registrations}`} element={<RegistrationsPage />}>
							<Route index element={<RegistrationsElements />} />
							<Route path=':subId' element={<OneTicket />} />
						</Route>
						<Route path={`${AdminRoute.Tickets}`} element={<PurchasedTicketsPage />}>
							<Route index element={<PurchasedTicketsElements />} />
							<Route path=':subId' element={<OneTicket />} />
						</Route>
						<Route path={`${AdminRoute.LogEnters}`} element={<EntersListPage />}>
							<Route index element={<EntersListElements />} />
						</Route>
						<Route path={`${AdminRoute.Sales}`} element={<SaleStatPage />}>
							<Route index element={<SaleStatElements />} />
						</Route>
						<Route path={`${AdminRoute.Naplivi}`} element={<SMSPage />}>
							<Route index element={<SMSElements />} />
						</Route>
						<Route path={`${AdminRoute.SMS}`} element={<SMSPage />}>
							<Route index element={<SMSElements />} />
						</Route>
						<Route path={`${AdminRoute.Balance}`} element={<SMSPage />}>
							<Route index element={<SMSElements />} />
						</Route>
					</Route>
					<Route path={`${AdminRoute.AdminEventServices}/:id`} element={<ServicesEventLayout />}>
						<Route path={`${AdminRoute.List}`} element={<ListPage />} />
						<Route path={`${AdminRoute.Services}`} element={<ServicesPage />} />
						<Route path={`${AdminRoute.Points}`} element={<PointsPage />} />
						<Route path={`${AdminRoute.Recipients}`} element={<RecipientsPage />} />
					</Route>
					<Route path={`${AdminRoute.AdminEventStatistic}/:id`} element={<StatisticEventLayout />}>
						<Route path={`${AdminRoute.Gates}`} element={<StatisticGatesPage />}>
							<Route index element={<InspectorsElementsStatistic />} />
						</Route>
					</Route>
					<Route path={`${AdminRoute.AdminEventPass}/:id`} element={<AdminEventPass />} />
				</Route>

				<Route path={AdminRoute.AdminPartners} element={<AdminPartnersLayout />}>
					<Route index element={<PartnersElements />} />
					<Route path={`${AdminRoute.AdminPartner}/:id`} element={<Partner />} />
				</Route>

				<Route path={AdminRoute.AdminFrequentQuestions} element={<AdminQuestionsLayout />}>
					<Route index element={<QuestionsElements />} />
					<Route path={`${AdminRoute.AdminQuestion}/:id`} element={<Question />} />
				</Route>

				<Route path={AdminRoute.AdminSupport} element={<AdminSupport />} />

				<Route path={AdminRoute.AdminSettings} element={<AdminSettings />} />
			</Route>
		</Routes>
	)
}
