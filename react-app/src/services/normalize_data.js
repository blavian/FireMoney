export const normalizedData = (array) => {
    let normalized = {}
    for (let i = 0; i < array.length; i++) {
        const data = array[i]
        normalized[data.id] = data
    }
    return normalized
}
