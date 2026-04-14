import VehicleCard from './VehicleCard'
import ErrorState from '../ui/ErrorState'
import styles from './VehicleGrid.module.css'

function VehicleGrid({
	vehicles,
	loading,
	error,
	onRetry,
	onSelectVehicle,
	onClearFilters,
	savedLookup,
	onToggleSaved,
}) {
	if (loading) {
		return (
			<section className={styles.grid} aria-label="Loading vehicles">
				{Array.from({ length: 6 }, (_, index) => (
					<article key={index} className={styles.skeletonCard} aria-hidden="true">
						<div className={styles.skeletonMedia} />
						<div className={styles.skeletonContent}>
							<div className={styles.skeletonLineShort} />
							<div className={styles.skeletonLine} />
							<div className={styles.skeletonDivider} />
							<div className={styles.skeletonStats}>
								<div className={styles.skeletonLineShort} />
								<div className={styles.skeletonLineShort} />
							</div>
							<div className={styles.skeletonPrice} />
						</div>
					</article>
				))}
			</section>
		)
	}

	if (error) {
		return <ErrorState message={error} onRetry={onRetry} />
	}

	if (vehicles.length === 0) {
		return (
			<div className={styles.emptyStateWrap}>
				<p className={styles.emptyState}>No vehicles match your search.</p>
				<button type="button" className={styles.clearButton} onClick={onClearFilters}>
					Clear filters
				</button>
			</div>
		)
	}

	return (
		<section className={`${styles.grid} vehicle-grid`} aria-label="Vehicle results">
			{vehicles.map((vehicle, index) => (
				<VehicleCard
					key={vehicle.id}
					vehicle={vehicle}
					index={index}
					onSelect={onSelectVehicle}
					isSaved={savedLookup?.(vehicle.id)}
					onToggleSaved={onToggleSaved}
				/>
			))}
		</section>
	)
}

export default VehicleGrid