import React from "react";
import { mount } from "enzyme";
import { authors } from "../../../tools/mockData";
import { ManageAuthorPage } from "./ManageAuthorPage";

function render(args) {
  const defaultProps = {
    authors,
    // Passed from React Router in real app, so just stubbing in for test.
    // Could also choose to use MemoryRouter as shown in Header.test.js,
    // or even wrap with React Router, depending on whether I
    // need to test React Router related behavior.
    history: {},
    saveAuthor: jest.fn(),
    loadAuthors: jest.fn(),
    match: {}
  };

  const props = { ...defaultProps, ...args };

  return mount(<ManageAuthorPage {...props} />);
}

it("sets error when attempting to save an empty author field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Author is required.");
});
