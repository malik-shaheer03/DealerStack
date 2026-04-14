import { useMemo, useState } from 'react'
import { VEHICLES_API_URL } from '../api/vehicles'
import useFetch from '../hooks/useFetch'
import usePersistentIds from '../hooks/usePersistentIds'
import SearchBar from '../components/listing/SearchBar'
import VehicleGrid from '../components/listing/VehicleGrid'
import VehicleDetailsModal from '../components/listing/VehicleDetailsModal'
import PageWrapper from '../components/layout/PageWrapper'
import styles from './SavedPage.module.css'

function SavedPage() {
	const { ids: savedIds, toggleId, clearAll, isSelected } = usePersistentIds('dealerstack-saved-ids')
	const { data, loading, error, refetch } = useFetch(VEHICLES_API_URL)
	const [search, setSearch] = useState('')
	const [selectedVehicle, setSelectedVehicle] = useState(null)

	const savedVehicles = useMemo(() => {
		const source = Array.isArray(data) ? data : []
		return source.filter((vehicle) => savedIds.includes(vehicle.id))
	}, [data, savedIds])

	const filteredSaved = useMemo(() => {
		const needle = search.trim().toLowerCase()

		if (!needle) {
			return savedVehicles
		}

		return savedVehicles.filter((vehicle) => {
			return `${vehicle.make ?? ''} ${vehicle.model ?? ''}`.toLowerCase().includes(needle)
		})
	}, [savedVehicles, search])

	return (
		<PageWrapper title="Saved Vehicles" subtitle={`${filteredSaved.length} saved`}>
			<div className={styles.controls}>
				<div className={styles.searchSlot}>
					<SearchBar value={search} onChange={setSearch} />
				</div>
				{savedIds.length > 0 ? (
					<button
						type="button"
						onClick={clearAll}
						className={styles.clearButton}
					>
						Clear Saved
					</button>
				) : null}
			</div>

			<VehicleGrid
				vehicles={filteredSaved}
				loading={loading}
				error={error}
				onRetry={refetch}
				onSelectVehicle={setSelectedVehicle}
				onClearFilters={() => setSearch('')}
				savedLookup={isSelected}
				onToggleSaved={toggleId}
			/>

			{selectedVehicle ? (
				<VehicleDetailsModal
					key={selectedVehicle.id}
					vehicle={selectedVehicle}
					onClose={() => setSelectedVehicle(null)}
				/>
			) : null}
		</PageWrapper>
	)
}

export default SavedPage
