import searchReducer, { initialState, updateQuery } from "./reducer";

describe("search reducer", () => {
  let reducer = null;
  it("should handle initial state", () => {
    expect(searchReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle update query", () => {
    reducer = searchReducer(initialState, updateQuery("test"));
    expect(reducer.query).toEqual("test");
  });
});
