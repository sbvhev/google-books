import { useState } from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import { useAppDispatch } from "./app/hooks";
import { fetchBooks, updateQuery } from "./state/search/reducer";
import { useBooks } from "./state/search/hooks";
import { Book } from "./state/types";

const BookItem = styled.div<{ selected: boolean }>`
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  transition: color 1s;
  border-color: ${({ selected }) => (selected ? "red" : "black")};

  &:hover {
    border-color: red;
  }
`;

const BookInfo = styled.div`
  display: flex;

  span {
    margin-left: auto;
    font-size: 12px;
    opacity: 0.7;
  }
`;

const Section = styled.div`
  width: 50%;
  padding: 50px 60px;
`;

const SectionLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const AppContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ReadingItem = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const AddButton = styled.button`
  margin-top: 32px;
  padding: 8px 12px;
  cursor: pointer;
`;

function App() {
  const dispatch = useAppDispatch();

  const books = useBooks();
  const list = useReadlingList();

  const [selectedBook, setSelectedBook] = useState<Book>();

  const handleChangeQuery = (event: any) => {
    dispatch(updateQuery(event.target.value));
    if (event.target.value) {
      dispatch(fetchBooks(event.target.value));
    }
  };


  const debouncedChangeHandler = debounce(handleChangeQuery, 300);

  return (
    <AppContainer>
      <Section>
        <SectionLabel>Search</SectionLabel>
        <input onChange={debouncedChangeHandler} type="text" placeholder="Type a query..." />
        <SectionLabel>Result</SectionLabel>
        {books.map((book: Book) => (
          <BookItem
            key={book.id}
            onClick={() => setSelectedBook(book)}
            selected={selectedBook?.id === book.id}
          >
            <BookInfo>
              {book.title}
              <span>title</span>
            </BookInfo>
            <BookInfo>
              {book.author}
              <span>author</span>
            </BookInfo>
            <BookInfo>
              {book.publisher}
              <span>publisher</span>
            </BookInfo>
          </BookItem>
        ))}
        <AddButton onClick={() => handleSaveBook()} disabled={!selectedBook}>
          Save to Reading List
        </AddButton>
      </Section>
 
    </AppContainer>
  );
}

export default App;
