import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice, VEHICLES_API_URL } from '../api/vehicles'
import useFetch from '../hooks/useFetch'
import usePersistentIds from '../hooks/usePersistentIds'
import PageWrapper from '../components/layout/PageWrapper'
import styles from './ComparePage.module.css'

function formatMileage(mileage) {
	if (typeof mileage !== 'number') {
		return '—'
	}

	return `${new Intl.NumberFormat('en-US').format(mileage)} mi`
}

function ComparePage() {
	const { ids: compareIds, removeId, clearAll } = usePersistentIds('dealerstack-compare-ids', 3)
	const { data, loading, error } = useFetch(VEHICLES_API_URL)
	const [imageFallbackMap, setImageFallbackMap] = useState({})

	const comparedVehicles = useMemo(() => {
		const source = Array.isArray(data) ? data : []
		return source.filter((vehicle) => compareIds.includes(vehicle.id))
	}, [data, compareIds])

	if (loading) {
		return (
			<PageWrapper title="Compare Vehicles" subtitle="Loading selected vehicles...">
				<p className={styles.helper}>Preparing comparison view...</p>
			</PageWrapper>
		)
	}

	if (error) {
		return (
			<PageWrapper title="Compare Vehicles" subtitle="Something went wrong.">
				<p className={styles.helper}>{error}</p>
			</PageWrapper>
		)
	}

	if (comparedVehicles.length === 0) {
		return (
			<PageWrapper title="Compare Vehicles" subtitle="No vehicles selected yet.">
				<div className={styles.emptyState}>
					<p>Select up to 3 vehicles from Inventory to compare them side by side.</p>
					<Link to="/" className={styles.backLink}>
						Go to Inventory
					</Link>
				</div>
			</PageWrapper>
		)
	}

	return (
		<PageWrapper title="Compare Vehicles" subtitle={`${comparedVehicles.length} selected`}>
			<div className={styles.toolbar}>
				<p className={styles.helper}>Quickly compare key specs and pricing.</p>
				<button type="button" className={styles.clearButton} onClick={clearAll}>
					Clear Compare
				</button>
			</div>

			<section className={styles.grid}>
				{comparedVehicles.map((vehicle) => {
					const imageAlt = `${vehicle?.year ?? ''} ${vehicle?.make ?? ''} ${vehicle?.model ?? ''}`.replace(/\s+/g, ' ').trim() || 'Vehicle image'
					const hideImage = imageFallbackMap[vehicle.id]

					return (
						<article key={vehicle.id} className={styles.card}>
							<button
								type="button"
								className={styles.removeButton}
								onClick={() => removeId(vehicle.id)}
								aria-label={`Remove ${vehicle.make} ${vehicle.model}`}
							>
								×
							</button>

							<div className={styles.media}>
								{vehicle.image && !hideImage ? (
									<img
										src={vehicle.image}
										alt={imageAlt}
										onError={() => {
											setImageFallbackMap((prev) => ({ ...prev, [vehicle.id]: true }))
										}}
									/>
								) : (
									<div className={styles.imagePlaceholder}>No image</div>
								)}
							</div>

							<div className={styles.content}>
								<h3>{`${vehicle.make ?? ''} ${vehicle.model ?? ''}`.trim()}</h3>
								<p className={styles.price}>{formatPrice(vehicle.price ?? 0)}</p>
								<ul className={styles.specs}>
									<li><span>Year</span><strong>{vehicle.year ?? '—'}</strong></li>
									<li><span>Mileage</span><strong>{formatMileage(vehicle.mileage)}</strong></li>
									<li><span>Color</span><strong>{vehicle.color ?? '—'}</strong></li>
									<li><span>Fuel</span><strong>{vehicle.fuel_type ?? '—'}</strong></li>
									<li><span>Transmission</span><strong>{vehicle.transmission ?? '—'}</strong></li>
								</ul>
							</div>
						</article>
					)
				})}
			</section>
		</PageWrapper>
	)
}

export default ComparePage
