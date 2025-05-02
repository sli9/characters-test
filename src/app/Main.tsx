import './App.css';
import { useEffect, useRef } from 'react';
import { useGetTransCharactersInfiniteQuery } from '../features/characters/api/charactersApi.ts';

export const Main = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetching,
  } = useGetTransCharactersInfiniteQuery();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          if (entries[0].target.id === 'next-trigger') {
            window.scrollBy(0, -(entries[0].target.clientHeight + 10));
            fetchNextPage();
          }
          if (entries[0].target.id === 'prev-trigger') {
            window.scrollBy(0, entries[0].target.clientHeight + 10);
            fetchPreviousPage();
          }
        }
      },
      { threshold: 1 }
    );

    const nextLoader = nextRef.current;
    const prevLoader = prevRef.current;
    if (nextLoader) {
      observer.observe(nextLoader);
    }
    if (prevLoader) {
      observer.observe(prevLoader);
    }

    return (): void => {
      if (nextLoader) {
        observer.unobserve(nextLoader);
      }
      if (prevLoader) {
        observer.unobserve(prevLoader);
      }
    };
  }, [
    data,
    hasNextPage,
    hasPreviousPage,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
  ]);

  const allResults = data?.pages.map((page) => page.characters).flat();

  return (
    <div>
      {hasPreviousPage && (
        <div id={'prev-trigger'} ref={prevRef} style={{ color: 'red' }}>
          Fetch Previous
        </div>
      )}
      <div>
        {allResults?.map((pokemon, i: number | null | undefined) => (
          <div key={i}>{pokemon}</div>
        ))}
      </div>
      {hasNextPage && (
        <div id={'next-trigger'} ref={nextRef} style={{ color: 'red' }}>
          Fetch More
        </div>
      )}
    </div>
  );
};
