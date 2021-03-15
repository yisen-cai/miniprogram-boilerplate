
/**
 * Encounter errors response body
 */
type ErrResult = {
  errMsg: string,
  errCode: number,
  details: any | undefined,
}


type PageResult<T> = {
  total: number,
  entities: Array<T>,
  hasNext: boolean
}


type SearchResult<T> = {
  tests?: PageResult<T>,
  articles?: PageResult<T>,
  tags?: PageResult<T>,
  questions?: PageResult<T>,
  users?: PageResult<T>
}

/**
 * Ok response response body
 */
type OkResult = {
  msg: string,
  location: string
}

type OssSignature = {
  ossAccessKeyId: string,
  policy: string,
  signature: string,
  securityToken: string?= null // STS signature
}

/**
 * Auth related
 */
type AuthResult = {
  accessToken: string,
  expiration: number
}

type WechatAuthResult = {
  user: any,
  auth: AuthResult
}