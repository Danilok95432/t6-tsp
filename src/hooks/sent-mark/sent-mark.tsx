import { useEffect, useRef, useState } from 'react'
import { useWatch, type Control, type FieldValues } from 'react-hook-form'

export const useIsSent = <T extends FieldValues>(control: Control<T>) => {
	const [isSent, setIsSent] = useState(false)
	const watchedValues = useWatch({ control })
	const prevValuesRef = useRef<string>(JSON.stringify(watchedValues))

	useEffect(() => {
		const currentValues = JSON.stringify(watchedValues)

		if (prevValuesRef.current !== currentValues) {
			setIsSent(false)
			prevValuesRef.current = currentValues
		}
	}, [watchedValues])

	const markAsSent = (mark: boolean) => setIsSent(mark)

	return { isSent, markAsSent }
}
