import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateNewBlog from "./CreateNewBlog";

describe("BlogForm component tests", () => {
  test("updates input values", () => {
    const component = render(<CreateNewBlog />);

    const inputTitle = component.container.querySelector("[name=title]");
    const inputAuthor = component.container.querySelector("[name=author]");
    const inputUrl = component.container.querySelector("[name=url]");

    fireEvent.change(inputTitle, {
      target: { value: "test_title" },
    });
    fireEvent.change(inputAuthor, {
      target: { value: "test_author" },
    });
    fireEvent.change(inputUrl, {
      target: { value: "test_url.com" },
    });

    expect(inputTitle.value).toBe("test_title");
    expect(inputAuthor.value).toBe("test_author");
    expect(inputUrl.value).toBe("test_url.com");
  });
});
