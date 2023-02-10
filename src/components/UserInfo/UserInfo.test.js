import renderer from "react-test-renderer";
import React from "react";
import UserInfo from "./UserInfo";

const renderTree = (tree) => renderer.create(tree);
describe("<UserInfo>", () => {
  it("should render component", () => {
    expect(renderTree(<UserInfo />).toJSON()).toMatchSnapshot();
  });
});
