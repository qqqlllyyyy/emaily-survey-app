// 'SurveyField' contains logic to render a single label and text input.
import React from "react";

export default ({ input, label }) => {
  // props.input contains many event handlers
  return (
    <div>
      <label>{label}</label>
      {/*
        The syntax will pass in all the properties in 'input' object to the 'input' tag.
        Equivalent to:
        <input onBlur={input.onBlur} onClick={input.onClick} ... />
      */}
      <input {...input} />
    </div>
  );
};
