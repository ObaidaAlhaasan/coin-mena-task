import React, { FC, useEffect, useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../../utils/string-utils";

export type validationInput = {
  value: string;
  isValid: boolean | null;
  validationMsg: string | null;
};

interface IInputWithValidation {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  className?: string;
  input: validationInput;
  onAfterChange: (input: validationInput) => void;
}

export const InputWithValidation: FC<IInputWithValidation> = (props) => {
  const [input, setInput] = useState<validationInput>({
    value: "",
    isValid: null,
    validationMsg: null,
  });

  const onValidate = (value: string) => {
    if (props.type === "text" && !validateUsername(value))
      return setInput({
        ...input,
        isValid: false,
        validationMsg: "Email field Is Invalid and required",
      });
    else if (props.type === "email" && !validateEmail(value))
      return setInput({
        ...input,
        isValid: false,
        validationMsg: "Email field Is Invalid and required",
      });

    if (props.type === "password" && !validatePassword(value))
      return setInput({
        ...input,
        isValid: false,
        validationMsg:
          "Password field Is Invalid should contain one special character, one number",
      });

    setInput({ ...input, isValid: true, validationMsg: "" });
  };

  useEffect(() => {
    return function cleanup() {
      setInput({ value: "", validationMsg: null, isValid: null });
    };
  }, []);

  useEffect(() => {
    onValidate(input.value);
    props.onAfterChange(input);
  }, [input.value]);

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        className={`form-control ${
          props.input.value && (props.input.isValid ? "is-valid" : "is-invalid")
        } ${props.className}`}
        value={input.value}
        onChange={(e) => setInput({ ...input, value: e.target.value })}
        autoComplete="false"
      />
      {props.input.value && !props.input.isValid && (
        <span className="invalid-feedback">{props.input.validationMsg}</span>
      )}
    </>
  );
};
