const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^\+?[\d\s()-]{7,15}$/

export function validateForm(values) {
	const errors = {}
	const fullName = values?.fullName?.trim() ?? ''
	const email = values?.email?.trim() ?? ''
	const phone = values?.phone?.trim() ?? ''
	const password = values?.password ?? ''

	if (!fullName) {
		errors.fullName = 'Full name is required.'
	} else if (fullName.length < 2) {
		errors.fullName = 'Full name must be at least 2 characters.'
	}

	if (!email) {
		errors.email = 'Email is required.'
	} else if (!EMAIL_REGEX.test(email)) {
		errors.email = 'Please enter a valid email address.'
	}

	if (!phone) {
		errors.phone = 'Phone number is required.'
	} else {
		const normalizedPhone = phone.replace(/[\s-]/g, '')
		const digitsOnly = normalizedPhone.replace(/\D/g, '')

		if (!PHONE_REGEX.test(phone)) {
			errors.phone = 'Please enter a valid phone number.'
		} else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
			errors.phone = 'Phone number must be between 7 and 15 digits.'
		}
	}

	if (!password) {
		errors.password = 'Password is required.'
	} else if (password.length < 6) {
		errors.password = 'Password must be at least 6 characters.'
	}

	return errors
}