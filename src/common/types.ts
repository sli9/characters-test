import { Info } from '../features/characters/api/charactersApi.types.ts';

export type BaseResponse<D = []> = {
  info: Info;
  results: D;
}