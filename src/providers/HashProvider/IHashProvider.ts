export default interface IHashProvider {
  digest(payload: string): Promise<string>;
  compare(payload: string, digest: string): Promise<boolean>;
}
