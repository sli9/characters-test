export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type BaseResponse<D = []> = {
  info: Info;
  results: D;
};
