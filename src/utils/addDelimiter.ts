function addDelimiter(value: number | string, delimiter = ',') {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter) || '0'
}

export default addDelimiter
