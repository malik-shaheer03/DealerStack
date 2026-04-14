import styles from './PasswordStrength.module.css'

function getStrengthScore(password) {
	if (!password) return 0
	if (password.length < 6) return 1

	const hasUppercase = /[A-Z]/.test(password)
	const hasNumber = /\d/.test(password)
	const hasSymbol = /[^A-Za-z0-9]/.test(password)

	if (password.length >= 10 && hasUppercase && hasNumber && hasSymbol) {
		return 4
	}

	if (password.length >= 8 && (hasNumber || hasSymbol)) {
		return 3
	}

	return 2
}

function getStrengthMeta(score) {
	switch (score) {
		case 1:
			return { label: 'Weak', color: 'var(--color-error)' }
		case 2:
			return { label: 'Fair', color: 'var(--color-accent)' }
		case 3:
			return { label: 'Good', color: 'rgba(76, 175, 132, 0.7)' }
		case 4:
			return { label: 'Strong', color: 'var(--color-success)' }
		default:
			return { label: 'Weak', color: 'var(--color-text-muted)' }
	}
}

function getBarColor(score, index) {
	if (score === 0) {
		return 'var(--color-border)'
	}

	if (score === 1) {
		return index === 0 ? 'var(--color-error)' : 'var(--color-border)'
	}

	if (score === 2) {
		return index < 2 ? 'var(--color-accent)' : 'var(--color-border)'
	}

	if (score === 3) {
		return index < 3 ? 'rgba(76, 175, 132, 0.7)' : 'var(--color-border)'
	}

	return 'var(--color-success)'
}

function PasswordStrength({ password }) {
	const score = getStrengthScore(password)
	const { label, color } = getStrengthMeta(score)

	return (
		<div className={styles.strengthWrap}>
			<div className={styles.bars} aria-hidden="true">
				{Array.from({ length: 4 }, (_, index) => (
					<span
						key={index}
						className={styles.bar}
						style={{ backgroundColor: getBarColor(score, index) }}
					/>
				))}
			</div>
			<p className={styles.label} style={{ color }}>
				{label}
			</p>
		</div>
	)
}

export default PasswordStrength