export const BASE_PATH = "/Portfolio";

export const getAssetPath = (path: string): string => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
};
