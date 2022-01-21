import React, {FC, FormEvent, useEffect, useState} from 'react';
import "./login.scss";
import {useStore} from "../../../store/store";
import {InputWithValidation, validationInput} from "../../input/input-with-validation/input-with-validation";
import ModalPortal from "../../modal-portal/modal-portal";

interface ILoginProps {
  onClose?: () => void;
  show: boolean;
}

const LoginModal: FC<ILoginProps> = ({show, onClose}) => {
  const [email, setEmail] = useState<validationInput>({
    value: '', isValid: null, validationMsg: null
  });

  const [password, setPassword] = useState<validationInput>({
    value: '', isValid: null, validationMsg: null
  });

  const {login} = useStore();

  const onLogin = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    await login(email.value, password.value);
    onClose?.();
  }

  const resetState = () => {
    setPassword({value: '', isValid: null, validationMsg: null});
    setEmail({value: '', isValid: null, validationMsg: null});
  }

  useEffect(() => {
    return function cleanup() {
      resetState();
    }
  }, []);

  return <ModalPortal>
    <div className={`modal ${show ? 'enter-done' : 'exit'}`} onClick={onClose}>
      <div className="modal-content has-text-secondary" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Login</h4>
          <span className="close" onClick={onClose}>
          <i className="fas fa-times has-hover has-hover-affect"/>
        </span>
        </div>

        <div className="modal-body">
          <form onSubmit={onLogin} autoComplete="off">
            <div className="row mt-3">
              <div className="mb-3">
                <InputWithValidation id="Email"
                                     label="Email"
                                     type="email"
                                     input={email}
                                     onAfterChange={setEmail}/>
              </div>

              <div className="mb-3">
                <InputWithValidation id="Password"
                                     label="Password"
                                     type="password"
                                     input={password}
                                     onAfterChange={setPassword}/>
              </div>

              <div className="col-md-3 my-3">
                <button type="submit" className="btn btn-primary" disabled={!email.isValid || !password.isValid}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ModalPortal>
};


export default LoginModal;
