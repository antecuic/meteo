import { render, screen } from "@testing-library/react";
import CitiesSearch from "./index";

describe("CitiesSearch", () => {
  it("renders empty input with placeholder", () => {
    render(<CitiesSearch />);

    const input = screen.getByPlaceholderText("Search for a location");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");
  });
});
