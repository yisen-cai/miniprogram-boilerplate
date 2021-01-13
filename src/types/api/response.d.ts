
/**
 * Encounter errors response body
 */
type ErrResult = {
  errMsg: string,
  errCode: number,
  details: any|undefined,
}


/**
 * Ok response response body
 */
type OkResult = {
  msg: string,
  location: string
}