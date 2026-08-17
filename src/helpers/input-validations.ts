// Функция для очистки маски и валидации номера телефона
export const validatePhoneNumber = (value: string | null | undefined): boolean => {
	if (!value || value.trim() === '') {
		return true
	}
	const cleanedValue = value.replace(/\D/g, '')
	return cleanedValue.length === 11
}
