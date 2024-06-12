export const createFetch = (options: Pick<RequestInit, 'cache'>) => (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options,
    });
  };