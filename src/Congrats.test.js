import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr, checkProps } from "../test/testUtils";
import Congrats from "./Congrats";

// In case we have a lot of common defaultprops
const defaultProps = { success: false };
/**
 * Factory Functional to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "congrats-component");
  expect(component.length).toBe(1);
});

test("renders no text when `success` prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "congrats-component");
  expect(component.text()).toBe(""); // React Fragment returned == Empty string
});

test("renders non-empty congrats msg when `success` prop is true", () => {
  const wrapper = setup({ success: true });
  const component = findByTestAttr(wrapper, "congrats-msg");
  expect(component.text().length).not.toBe(0);
});

test("does not throw warning with expected props", () => {
  // No need to call setup and create a shallowWrapper
  const expectedProps = { success: false };
  checkProps(Congrats, expectedProps);
});
