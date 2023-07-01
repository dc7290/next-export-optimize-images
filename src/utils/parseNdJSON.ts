const parseNdJSON = (ndjson: string) =>
  ndjson
    .trim()
    .split(/\n/g)
    .map((line) => JSON.parse(line))

export default parseNdJSON
