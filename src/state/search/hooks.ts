import { useAppSelector } from "../../app/hooks";

export const useQuery = () => {
  const query = useAppSelector((state) => state.search.query);

  return query;
};

export const useBooks = () => {
  const books = useAppSelector((state) => state.search.books);

  return books;
};
