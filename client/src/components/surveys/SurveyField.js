// 'SurveyField' contains logic to render a single label and text input.
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // console.log(meta);
  // props.input contains many event handlers
  return (
    <div>
      <label>{label}</label>
      {/*
        The syntax will pass in all the properties in 'input' object to the 'input' tag.
        Equivalent to:
        <input onBlur={input.onBlur} onClick={input.onClick} ... />
      */}
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
