import { useEffect, useState } from 'react'
import styles from './AdvancedFilters.module.css'

function AdvancedFilters({
	open,
	onClose,
	filters,
	onChange,
	onReset,
	fuelOptions,
	transmissionOptions,
}) {
	const [activeSelect, setActiveSelect] = useState('')

	const handleSelectMouseDown = (name, event) => {
		if (activeSelect === name) {
			event.preventDefault()
			event.currentTarget.blur()
			setActiveSelect('')
		}
	}

	useEffect(() => {
		if (!open) {
			return undefined
		}

		const onKeyDown = (event) => {
			if (event.key === 'Escape') {
				setActiveSelect('')
				onClose()
			}
		}

		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [open, onClose])

	return (
		<div
			className={`${styles.overlay} ${open ? styles.open : ''}`}
			onClick={open ? () => {
				setActiveSelect('')
				onClose()
			} : undefined}
			role="presentation"
			aria-hidden={!open}
		>
			<aside
				id="advanced-filters-panel"
				className={styles.drawer}
				onClick={(event) => event.stopPropagation()}
				aria-label="Advanced filters"
			>
				<div className={styles.header}>
					<h3 className={styles.title}>Advanced Filters</h3>
					<button
						type="button"
						className={styles.closeButton}
						onClick={() => {
							setActiveSelect('')
							onClose()
						}}
						aria-label="Close filters"
					>
						×
					</button>
				</div>

				<div className={styles.group}>
					<label className={styles.label} htmlFor="filter-fuel">Fuel Type</label>
					<div
						className={`${styles.selectWrap} ${activeSelect === 'fuel' ? styles.selectWrapActive : ''}`}
					>
						<select
							id="filter-fuel"
							className={`${styles.input} ${styles.selectInput}`}
							value={filters.fuelType}
							onMouseDown={(event) => handleSelectMouseDown('fuel', event)}
							onFocus={() => setActiveSelect('fuel')}
							onBlur={() => setActiveSelect('')}
							onChange={(event) => {
								onChange('fuelType', event.target.value)
								event.target.blur()
								setActiveSelect('')
							}}
						>
							<option value="">All</option>
							{fuelOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className={styles.group}>
					<label className={styles.label} htmlFor="filter-transmission">Transmission</label>
					<div
						className={`${styles.selectWrap} ${activeSelect === 'transmission' ? styles.selectWrapActive : ''}`}
					>
						<select
							id="filter-transmission"
							className={`${styles.input} ${styles.selectInput}`}
							value={filters.transmission}
							onMouseDown={(event) => handleSelectMouseDown('transmission', event)}
							onFocus={() => setActiveSelect('transmission')}
							onBlur={() => setActiveSelect('')}
							onChange={(event) => {
								onChange('transmission', event.target.value)
								event.target.blur()
								setActiveSelect('')
							}}
						>
							<option value="">All</option>
							{transmissionOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.group}>
						<label className={styles.label} htmlFor="filter-min-price">Min Price</label>
						<input
							id="filter-min-price"
							type="number"
							className={`${styles.input} ${styles.numberInput}`}
							placeholder="0"
							value={filters.minPrice}
							onChange={(event) => onChange('minPrice', event.target.value)}
						/>
					</div>
					<div className={styles.group}>
						<label className={styles.label} htmlFor="filter-max-price">Max Price</label>
						<input
							id="filter-max-price"
							type="number"
							className={`${styles.input} ${styles.numberInput}`}
							placeholder="200000"
							value={filters.maxPrice}
							onChange={(event) => onChange('maxPrice', event.target.value)}
						/>
					</div>
				</div>

				<div className={styles.footer}>
					<button type="button" className={styles.secondary} onClick={onReset}>
						Reset
					</button>
					<button
						type="button"
						className={styles.primary}
						onClick={() => {
							setActiveSelect('')
							onClose()
						}}
					>
						Apply
					</button>
				</div>
			</aside>
		</div>
	)
}

export default AdvancedFilters
