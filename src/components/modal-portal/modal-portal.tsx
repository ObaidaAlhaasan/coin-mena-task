import { FC } from "react";
import ReactDOM from "react-dom";

export const ModalPortal: FC = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal-root") as Element
  );
};
