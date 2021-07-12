import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import Congrats from "./Congrats";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory Functional to create a ShallowWrapper for the Congrats component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  return shallow(<Congrats {...props} />);
};

test("renders without error", () => {});

test("renders no text when `success` prop is false", () => {});

test("renders non-empty congrats msg when `success` prop is true", () => {});

test("", () => {});
