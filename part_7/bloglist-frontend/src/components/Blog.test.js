import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog component tests", () => {
  test("Component shows content", () => {
    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 1,
    };

    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent("title");
    expect(component.container).toHaveTextContent("author");
    expect(component.container).not.toHaveTextContent("url");
    expect(component.container).not.toHaveTextContent(1);
  });

  test("clicking the button shows url and likes", () => {
    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 1,
    };

    const component = render(<Blog blog={blog} />);

    const viewBtn = component.container.querySelector(".blog-view-btn");
    fireEvent.click(viewBtn);

    const url = component.container.querySelector(".blog-url");
    const likes = component.container.querySelector(".blog-likes");
    expect(url).toHaveTextContent("url");
    expect(likes).toHaveTextContent("likes 1");
  });
});
