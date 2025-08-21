// src/context/FormContext.js
import { createContext } from "react";

export const FormFieldContext = createContext({
  name: ""
});

export const FormItemContext = createContext({
  id: ""
});