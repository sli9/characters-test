import { Info } from '../../types/types.ts';
import s from './Pagination.module.css';

type Props = {
  info?: Info;
  onChangePage: (pageUrl: string | null) => void;
};

export const Pagination = ({ info, onChangePage }: Props) => {
  const onClickHandler = (pageUrl: string | null) => {
    onChangePage(pageUrl);
  };

  return (
    <div className={s.paginationBox}>
      {info?.prev && (
        <button
          onClick={() => {
            onClickHandler(info?.prev);
          }}
        >
          prev
        </button>
      )}
      {info?.next && (
        <button
          onClick={() => {
            onClickHandler(info?.next);
          }}
        >
          next
        </button>
      )}
    </div>
  );
};
