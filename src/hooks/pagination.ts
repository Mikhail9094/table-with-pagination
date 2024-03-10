import React, { useCallback } from "react";

const usePagination = (limit: number, offset: number, setOffset: React.Dispatch<React.SetStateAction<number>>, amount: number) => {
  const nextPage = useCallback(()=>setOffset(prev=>prev+limit), [offset,limit]);
  const prevPage = useCallback(()=>setOffset(prev=>prev-limit), [offset,limit]);

  return {
    allPage: amount / limit,
    nextPage,
    prevPage,
  };
};

export default usePagination;
