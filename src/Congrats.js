import React from "react";
import PropTypes from "prop-types";

/**
 * Functional react component for congratulatory message
 * @function
 * @param {object} props - React props
 * @returns {JSX.Element} - Rendered Component (or null if `success` prop is false)
 */
const Congrats = ({ success }) => {
  return (
    <div data-test="congrats-component">
      {success ? <span data-test="congrats-msg">You Guessed It!!</span> : <></>}
    </div>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

export default Congrats;
