export const fetcher = async <T>(
  url: string,
  options: RequestInit = { method: 'GET' },
): Promise<T> => {
  return await (await fetch(url, options)).json();
};

export const asyncMapper = (
  array: any[],
  callback: Function,
): Promise<any>[] => {
  return array.map(async (value) => await callback(value));
};
