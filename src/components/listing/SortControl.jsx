import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './SortControl.module.css'

const SORT_OPTIONS = [
	{ value: '', label: 'Default' },
	{ value: 'price_asc', label: 'Price: Low to High' },
	{ value: 'price_desc', label: 'Price: High to Low' },
	{ value: 'name_asc', label: 'Name: A–Z' },
]

function SortControl({ value, onChange }) {
	const [isOpen, setIsOpen] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	const rootRef = useRef(null)
	const triggerRef = useRef(null)
	const optionRefs = useRef([])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!rootRef.current?.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const selectedOption = useMemo(() => {
		return SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0]
	}, [value])

	const selectedIndex = useMemo(() => {
		return SORT_OPTIONS.findIndex((option) => option.value === value)
	}, [value])

	useEffect(() => {
		if (isOpen) {
			optionRefs.current[highlightedIndex]?.focus()
		}
	}, [isOpen, highlightedIndex])

	const closeMenu = () => {
		setIsOpen(false)
		triggerRef.current?.focus()
	}

	const selectOption = (nextValue) => {
		onChange(nextValue)
		closeMenu()
	}

	const handleTriggerKeyDown = (event) => {
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault()
			setIsOpen(true)
			setHighlightedIndex(selectedIndex < 0 ? 0 : selectedIndex)
		}

		if (event.key === 'Escape') {
			setIsOpen(false)
		}
	}

	const handleMenuKeyDown = (event) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault()
			setHighlightedIndex((prev) => (prev + 1) % SORT_OPTIONS.length)
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault()
			setHighlightedIndex((prev) => (prev - 1 + SORT_OPTIONS.length) % SORT_OPTIONS.length)
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			selectOption(SORT_OPTIONS[highlightedIndex].value)
		}

		if (event.key === 'Escape' || event.key === 'Tab') {
			setIsOpen(false)
		}
	}

	return (
		<div className={styles.control} ref={rootRef}>
			<label className={styles.label} htmlFor="sort-control">
				Sort by
			</label>
			<div className={styles.selectWrap}>
				<button
					id="sort-control"
					type="button"
					ref={triggerRef}
					className={styles.selectButton}
					onClick={() => {
						setIsOpen((prev) => {
							const nextOpen = !prev

							if (nextOpen) {
								setHighlightedIndex(selectedIndex < 0 ? 0 : selectedIndex)
							}

							return nextOpen
						})
					}}
					onKeyDown={handleTriggerKeyDown}
					aria-haspopup="listbox"
					aria-expanded={isOpen}
					aria-controls="sort-options-listbox"
				>
					{selectedOption.label}
				</button>
				<svg
					className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
					viewBox="0 0 20 20"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
				</svg>

				{isOpen ? (
					<ul
						id="sort-options-listbox"
						className={styles.dropdown}
						role="listbox"
						aria-label="Sort options"
						onKeyDown={handleMenuKeyDown}
					>
						{SORT_OPTIONS.map((option) => {
							const isSelected = option.value === value
							const optionIndex = SORT_OPTIONS.indexOf(option)

							return (
								<li key={option.value || 'default'}>
									<button
										type="button"
										ref={(element) => {
											optionRefs.current[optionIndex] = element
										}}
										className={`${styles.option} ${isSelected ? styles.optionActive : ''} ${highlightedIndex === optionIndex ? styles.optionHighlighted : ''}`}
										onClick={() => selectOption(option.value)}
										onMouseEnter={() => setHighlightedIndex(optionIndex)}
										role="option"
										aria-selected={isSelected}
										tabIndex={-1}
									>
										{option.label}
									</button>
								</li>
							)
						})}
					</ul>
				) : null}
			</div>
		</div>
	)
}

export default SortControl