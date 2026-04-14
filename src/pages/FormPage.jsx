import { useState } from 'react'
import FormField from '../components/form/FormField'
import PasswordStrength from '../components/form/PasswordStrength'
import PageWrapper from '../components/layout/PageWrapper'
import { validateForm } from '../utils/validators'
import styles from './FormPage.module.css'

const initialValues = {
	fullName: '',
	email: '',
	phone: '',
	password: '',
}

function FormPage() {
	const [values, setValues] = useState(initialValues)
	const [errors, setErrors] = useState({})
	const [touched, setTouched] = useState({})
	const [submitted, setSubmitted] = useState(false)
	const [submitSuccess, setSubmitSuccess] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleChange = (field, value) => {
		setValues((prev) => ({ ...prev, [field]: value }))

		if (errors[field]) {
			setErrors((prev) => {
				const next = { ...prev }
				delete next[field]
				return next
			})
		}
	}

	const handleBlur = (field) => {
		setTouched((prev) => ({ ...prev, [field]: true }))

		setErrors((prev) => {
			const next = { ...prev }
			const fieldErrors = validateForm(values)

			if (fieldErrors[field]) {
				next[field] = fieldErrors[field]
			} else {
				delete next[field]
			}

			return next
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (isSubmitting) {
			return
		}

		setSubmitted(true)

		const nextErrors = validateForm(values)

		if (Object.keys(nextErrors).length > 0) {
			setErrors(nextErrors)
			setTouched({
				fullName: true,
				email: true,
				phone: true,
				password: true,
			})
			return
		}

		setIsSubmitting(true)

		setTimeout(() => {
			setIsSubmitting(false)
			setSubmitSuccess(true)
		}, 800)
	}

	const handleReset = () => {
		setValues(initialValues)
		setErrors({})
		setTouched({})
		setSubmitted(false)
		setIsSubmitting(false)
		setSubmitSuccess(false)
	}

	if (submitSuccess) {
		return (
			<PageWrapper>
				<section className={styles.successWrap}>
					<svg
						className={styles.successIcon}
						viewBox="0 0 56 56"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2.4" />
						<path
							d="M16.5 29.5L24.5 37L40 21.5"
							stroke="currentColor"
							strokeWidth="3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<h1 className={styles.successTitle}>Registration Complete</h1>
					<p className={styles.successText}>Your information has been received.</p>
					<button type="button" className={styles.secondaryAction} onClick={handleReset}>
						Register Another
					</button>
				</section>
			</PageWrapper>
		)
	}

	const showError = (field) => (touched[field] || submitted ? errors[field] : undefined)

	return (
		<PageWrapper title="Create Account" subtitle="Fill in your details to get started.">
			<div className={`${styles.formCard} form-page-card`}>
				<form className={styles.formStack} onSubmit={handleSubmit} noValidate>
					<FormField
						label="Full Name"
						id="fullName"
						value={values.fullName}
						onChange={(event) => handleChange('fullName', event.target.value)}
						onBlur={() => handleBlur('fullName')}
						error={showError('fullName')}
						placeholder="Enter your full name"
						required
					/>

					<FormField
						label="Email"
						id="email"
						type="email"
						value={values.email}
						onChange={(event) => handleChange('email', event.target.value)}
						onBlur={() => handleBlur('email')}
						error={showError('email')}
						placeholder="name@company.com"
						required
					/>

					<FormField
						label="Phone"
						id="phone"
						type="tel"
						value={values.phone}
						onChange={(event) => handleChange('phone', event.target.value)}
						onBlur={() => handleBlur('phone')}
						error={showError('phone')}
						placeholder="+1 555 123 4567"
						required
					/>

					<FormField
						label="Password"
						id="password"
						type="password"
						value={values.password}
						onChange={(event) => handleChange('password', event.target.value)}
						onBlur={() => handleBlur('password')}
						error={showError('password')}
						placeholder="Create a password"
						required
					/>

					{values.password.length > 0 ? <PasswordStrength password={values.password} /> : null}

					<button type="submit" className={styles.submitButton} disabled={isSubmitting}>
						{isSubmitting ? (
							<span className={styles.buttonLoading}>
								<span className={styles.buttonSpinner} aria-hidden="true" />
								Submitting...
							</span>
						) : (
							'Create Account →'
						)}
					</button>
				</form>
			</div>
		</PageWrapper>
	)
}

export default FormPage