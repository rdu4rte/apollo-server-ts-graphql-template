import { config } from '@/main/config'
import { Service } from 'typedi'
import * as bcrypt from 'bcryptjs'

@Service()
export class Encrypter {
  private readonly salt: number

  constructor() {
    this.salt = config.jwt.salt
  }

  /**
   * @description Encrypt provided password
   * @param password string
   * @returns string
   */
  encrypt(password: string): string {
    const salt = bcrypt.genSaltSync(this.salt)
    return bcrypt.hashSync(password, salt)
  }

  /**
   * @description Decrypt and compare plain-password to hashed-password and return if it matched
   * @param plainPassword string
   * @param hashedPassword string
   * @returns boolean
   */
  decrypt(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword)
  }
}
