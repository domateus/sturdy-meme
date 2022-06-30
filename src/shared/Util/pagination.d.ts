type Order = "asc" | "desc";

type Paginate = {
  sort: `${string},${Order}`;
  page: number;
  size: number;
};

type findAndCount<T> = (paging: Paginate) => Promise<[T[], number]>;

type ExtractKeysOfValueType<T, K> = {
  [I in keyof T]: T[I] extends K ? I : never;
}[keyof T];
