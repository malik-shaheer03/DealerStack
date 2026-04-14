import { useEffect, useState } from 'react'

function readIds(key) {
	try {
		const raw = localStorage.getItem(key)
		const parsed = raw ? JSON.parse(raw) : []
		return Array.isArray(parsed) ? parsed : []
	} catch {
		return []
	}
}

function usePersistentIds(key, maxItems = Number.POSITIVE_INFINITY) {
	const [ids, setIds] = useState(() => readIds(key))

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(ids))
	}, [key, ids])

	const toggleId = (id) => {
		setIds((prev) => {
			if (prev.includes(id)) {
				return prev.filter((item) => item !== id)
			}

			const next = [...prev, id]
			if (next.length <= maxItems) {
				return next
			}

			return next.slice(next.length - maxItems)
		})
	}

	const removeId = (id) => {
		setIds((prev) => prev.filter((item) => item !== id))
	}

	const clearAll = () => {
		setIds([])
	}

	return {
		ids,
		toggleId,
		removeId,
		clearAll,
		isSelected: (id) => ids.includes(id),
	}
}

export default usePersistentIds
