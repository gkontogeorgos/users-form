import React from "react";
import renderer from "react-test-renderer";
import UsersForm from "./UsersForm";

jest.mock("formik");
jest.mock("antd");
jest.mock("common/services/endpoints");

const renderTree = (tree) => renderer.create(tree);
describe("<UsersForm>", () => {
  it("should render component", () => {
    expect(renderTree(<UsersForm />).toJSON()).toMatchSnapshot();
  });
});
