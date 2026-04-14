import styles from './FormField.module.css'

function FormField({
	label,
	id,
	type = 'text',
	value,
	onChange,
	onBlur,
	error,
	placeholder,
	required,
}) {
	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={id}>
				{label}
				{required ? <span className={styles.required}>*</span> : null}
			</label>

			<input
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				required={required}
				className={`${styles.input} ${error ? styles.inputError : ''}`}
			/>

			{error ? (
				<p className={styles.error} role="alert">
					<svg
						className={styles.errorIcon}
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							d="M12 3.5L21 20.5H3L12 3.5Z"
							stroke="currentColor"
							strokeWidth="1.8"
							strokeLinejoin="round"
						/>
						<path d="M12 9V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
						<circle cx="12" cy="17.2" r="1" fill="currentColor" />
					</svg>
					{error}
				</p>
			) : null}
		</div>
	)
}

export default FormField