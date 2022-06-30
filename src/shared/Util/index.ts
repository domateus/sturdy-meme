interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export const getPagination = (query: ParsedQs): Paginate => {
  const page = parseInt(query.page as string, 10) || 0;
  const size = parseInt(query.size as string, 10) || 10;
  const sort = (query.sort || "id,asc") as Paginate["sort"];
  return { page, size, sort };
};

export const paginateToFindAndCount = (paginate: Paginate) => {
  const order = paginate.sort.split(",");
  return {
    order: { [order[0]]: order[1] },
    skip: paginate.page * paginate.size,
    take: paginate.size,
  };
};

export function* range(end: number, start = 0, step = 1) {
  let x = start - step;
  while (x < end - step) yield (x += step);
}

export const queryToObject = (query: ParsedQs) => {
  const obj: any = {};
  if (!query || !Object.keys(query).length) return obj;
  for (const key in query) {
    // eslint-disable-next-line no-prototype-builtins
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      if (typeof value === "string") {
        obj[key] = value;
      } else if (Array.isArray(value)) {
        obj[key] = value.join(",");
      } else if (typeof value === "object") {
        obj[key] = queryToObject(value);
      }
    }
  }
  return obj;
};
