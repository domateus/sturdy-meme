import { compare, hash } from "bcryptjs";
import IHashProvider from "../IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
  public async digest(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compare(payload: string, digest: string): Promise<boolean> {
    return compare(payload, digest);
  }
}
