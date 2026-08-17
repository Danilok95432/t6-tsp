import { createApi } from '@reduxjs/toolkit/query/react'
import { type FieldValues } from 'react-hook-form'
import { type GameInfoResponse, type GameNewIdResponse } from 'src/types/games'

import { ReducerPath } from 'src/helpers/consts'
import { baseQueryWithReauth } from 'src/helpers/base-query'

export const gamesApi = createApi({
	reducerPath: ReducerPath.Games,
	tagTypes: ['Games', 'GameInfo'],
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		getGameInfo: build.query<GameInfoResponse, string>({
			query: (id) => ({
				url: `home/game/edit_item`,
				params: {
					id,
				},
			}),
			providesTags: ['GameInfo'],
		}),
		getNewIdGame: build.query<GameNewIdResponse, null>({
			query: () => ({
				url: `home/game/getnew`,
			}),
			providesTags: ['GameInfo', 'Games'],
		}),
		saveGameInfoCommunity: build.mutation<null, FieldValues>({
			query: (formData) => ({
				url: `home/game/save_item`,
				method: 'POST',
				body: formData,
			}),
			invalidatesTags: ['GameInfo'],
		}),
	}),
})

export const { useGetGameInfoQuery, useSaveGameInfoCommunityMutation, useGetNewIdGameQuery } =
	gamesApi
