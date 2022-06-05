import { useAppSelector } from "../../app/hooks";

export const useReadlingList = () => {
  const query = useAppSelector((state) => state.list.books);

  return query;
};
