import { useState } from 'react'

export const useTableSearch = (params: string[]) => {
	const formatParams = params.reduce<Record<string, string>>((acc, paramEl) => {
		acc[paramEl] = ''
		return acc
	}, {})

	const [searchParams, setSearchParams] = useState(formatParams)

	const handleSearch = (key: keyof typeof searchParams, value: string) => {
		setSearchParams((prev) => ({ ...prev, [key]: value }))
	}

	return { searchParams, handleSearch }
}
