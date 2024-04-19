import { useMemo } from 'react'

export const useSortList = (list, filter, ascending) => {
  const sortedList = useMemo(() => {
    if (!list) return []
    console.log(list)
    const array = Object.keys(list)
    if (filter === 'date') {
      if (ascending) {
        return array.sort(
          (a, b) =>
            new Date(list[b].dateCreated) - new Date(list[a].dateCreated)
        )
      }
      return array
        .sort(
          (a, b) =>
            new Date(list[b].dateCreated) - new Date(list[a].dateCreated)
        )
        .reverse()
    }
    if (filter === 'alphabet') {
      return ascending ? array.sort() : array.sort().reverse()
    }
    return array
  }, [filter, list, ascending])

  return sortedList
}
