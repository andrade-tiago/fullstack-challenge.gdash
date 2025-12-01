import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class PasswordService {
  private _salt?: string;
  private _getSalt = async () =>
    this._salt ??= await bcrypt.genSalt()

  async hash(password: string): Promise<string> {
    const salt = await this._getSalt()

    return bcrypt.hash(password, salt)
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
