import listReducer, { initialState, addBook } from "./reducer";

describe("list reducer", () => {
  it("should handle initial state", () => {
    expect(listReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle update query", () => {
    const reducer = listReducer(
      initialState,
      addBook({
        id: "u-le-N_NzdwC",
        title: "The Best",
        publisher: "Bookhouse Fulfillment",
        author: "Robert F. Strauss",
      }),
    );
    expect(reducer.books).toEqual([
      {
        id: "u-le-N_NzdwC",
        title: "The Best",
        publisher: "Bookhouse Fulfillment",
        author: "Robert F. Strauss",
      },
    ]);
  });
});
