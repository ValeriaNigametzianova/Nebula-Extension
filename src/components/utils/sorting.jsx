import { useMemo } from 'react'

export const useSortList = (list, filter, ascending) => {
  const sortedList = useMemo(() => {
    if (!list) return []
    const array = Object.keys(list)
    if (filter === 'dateCreated') {
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
    if (filter === 'dateEdited') {
      if (ascending) {
        return array.sort(
          (a, b) => new Date(list[b].dateEdited) - new Date(list[a].dateEdited)
        )
      }
      return array
        .sort(
          (a, b) => new Date(list[b].dateEdited) - new Date(list[a].dateEdited)
        )
        .reverse()
    }
    if (filter === 'alphabet') {
      return ascending
        ? array.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        : array
            .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
            .reverse()
    }
    return array
  }, [filter, list, ascending])

  return sortedList
}
