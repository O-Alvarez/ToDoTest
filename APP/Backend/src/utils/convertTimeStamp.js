const convertTimeStamp = (IsoDate) => {
  return new Date(IsoDate)
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ');
}
export default convertTimeStamp