import { Info } from '../../types/types.ts';
import s from './Pagination.module.css';

type Props = {
  info?: Info;
  onChangePage: (page: number) => void;
  currentPage: number;
};

export const Pagination = ({ info, onChangePage, currentPage }: Props) => {
  return (
    <div className={s.paginationBox}>
      {info?.prev && (
        <button
          onClick={() => {
            onChangePage(currentPage - 1);
          }}
        >
          prev
        </button>
      )}
      <span>{currentPage}</span>
      {info?.next && (
        <button
          onClick={() => {
            onChangePage(currentPage + 1);
          }}
        >
          next
        </button>
      )}
    </div>
  );
};
