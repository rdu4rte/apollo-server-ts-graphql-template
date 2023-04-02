import { Service } from 'typedi'
import { type JwtCredentials } from '@/application/dtos/auth'
import * as jwt from 'jsonwebtoken'
import { config } from '@/main/config'

@Service()
export class SessionHelper {
  /**
   * @description Generate jwt-token with provided id as payload ("id" could be anything)
   * @param id string
   * @returns JwtCredentials
   */
  async generateJwtToken(id: string): Promise<JwtCredentials> {
    const payload = { id }
    const currentDate = new Date()
    const iat: number = Math.floor(currentDate.getTime() / 1000)
    const exp: number = iat + config.jwt.sessionTtl
    const expiresIn: Date = new Date(exp * 1000)
    const header: any = { iat, exp }

    const token: string = jwt.sign(payload, config.jwt.secret, {
      algorithm: 'HS512',
      expiresIn: config.jwt.sessionTtl,
      header
    })

    return { token, expiresIn }
  }

  /**
   * @description Decode token
   * @param token string
   * @returns string | JwtPayload
   */
  decodeToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, config.jwt.secret)
  }
}
