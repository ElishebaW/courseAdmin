import React from "react";
import CourseForm from "./CourseForm";
import { cleanup, render } from "react-testing-library";

afterEach(cleanup);

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add Course");
});

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm({ saving: true });
  getByText("Saving...");
});
