import { useCallback } from 'react'

export const useCopyToClipboard = () => {
	const copyToClipboard = useCallback(async (text: string) => {
		if (navigator.clipboard && window.isSecureContext) {
			return await navigator.clipboard.writeText(text)
		} else {
			return await new Promise((resolve, reject) => {
				const textArea = document.createElement('textarea')
				textArea.value = text
				textArea.style.position = 'fixed'
				textArea.style.left = '-999999px'
				textArea.style.top = '-999999px'
				document.body.appendChild(textArea)
				textArea.focus()
				textArea.select()

				try {
					const successful = document.execCommand('copy')
					if (successful) {
						resolve(text)
					} else {
						reject(new Error('Не удалось скопировать текст'))
					}
				} catch (err) {
					reject(err)
				} finally {
					document.body.removeChild(textArea)
				}
			})
		}
	}, [])

	return copyToClipboard
}
