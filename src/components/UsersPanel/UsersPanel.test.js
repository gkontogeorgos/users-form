import React from "react";
import renderer from "react-test-renderer";
import UsersPanel from "./UsersPanel";

jest.mock("formik");
jest.mock("@material-ui/core");
jest.mock("common/services/endpoints");
jest.mock("common/assets/images/loading.gif");
jest.mock("components/UserInfo/UserInfo");
jest.mock("components/UsersForm/UsersForm");
jest.mock("./utils/utils");
jest.mock("./utils/utils");

const renderTree = (tree) => renderer.create(tree);
describe("<UsersPanel>", () => {
  it("should render component", () => {
    expect(renderTree(<UsersPanel />).toJSON()).toMatchSnapshot();
  });
});
