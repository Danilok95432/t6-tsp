// src/hooks/usePagination.ts
import { useState } from 'react'

type UsePaginationProps<T> = {
	data: T[]
	initialPage?: number
	initialItemsPerPage?: number | 'all'
}

type UsePaginationReturn<T> = {
	currentPage: number
	itemsPerPage: number | 'all'
	paginatedData: T[]
	totalPages: number
	totalItems: number
	setCurrentPage: (page: number) => void
	setItemsPerPage: (items: number | 'all') => void
}

export const usePagination = <T,>({
	data,
	initialPage = 1,
	initialItemsPerPage = 100,
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
	const [currentPage, setCurrentPage] = useState(initialPage)
	const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(initialItemsPerPage)

	const paginatedData =
		itemsPerPage === 'all'
			? data
			: data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(data.length / itemsPerPage)

	return {
		currentPage,
		itemsPerPage,
		paginatedData,
		totalPages,
		totalItems: data.length,
		setCurrentPage,
		setItemsPerPage,
	}
}
