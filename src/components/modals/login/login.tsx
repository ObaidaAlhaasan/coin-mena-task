import React, {FC, FormEvent, useEffect, useState} from 'react';
import "./login.scss";
import {useStore} from "../../../store/store";
import {validateEmail, validatePassword} from "../../../utils/string-utils";

interface ILoginProps {
  onClose?: () => void;
  show: boolean;
}

type inputWithValidation = { value: string, isValid: boolean | null, validationMsg: string | null }
const LoginModal: FC<ILoginProps> = ({show, onClose}) => {
  const [email, setEmail] = useState<inputWithValidation>({
    value: '',
    isValid: null,
    validationMsg: null
  });

  const [password, setPassword] = useState<inputWithValidation>({
    value: '',
    isValid: null,
    validationMsg: null
  });

  const {login} = useStore();

  const onLogin = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (!email.isValid || !password.isValid)
      return;

    const result = await login(email.value, password.value);
    console.log(result);
  }

  const onCheckEmail = (value: string) => {
    if (!validateEmail(value))
      return setEmail({...email, isValid: false, validationMsg: 'Email Is Invalid'});

    setEmail({...email, isValid: true, validationMsg: ''});
  }

  const onCheckPassword = (value: string) => {
    console.log(value, validatePassword(value));

    if (!validatePassword(value))
      return setPassword({
        ...password,
        isValid: false,
        validationMsg: 'Password Is Invalid, should contain  number and one special character'
      });

    setPassword({...password, isValid: true, validationMsg: ''});
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

  return <div className={`modal ${show ? 'enter-done' : 'exit'}`} onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h4 className="modal-title">Login</h4>
        <span className="close" onClick={onClose}>
          <i className="fas fa-times has-hover has-hover-affect"/>
        </span>
      </div>

      <div className="modal-body">
        <form onSubmit={onLogin} autoComplete="off">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="Email">Email</label>
              <input id="Email"
                     type="email"
                     className={`form-control ${email.isValid ? 'is-valid' : 'is-invalid'}`}
                     value={email.value}
                     onChange={e => setEmail({...email, value: e.target.value})}
                     onBlur={e => onCheckEmail(e.target.value)}
              />
              {email.isValid === false && <span className="alert-danger">{email.validationMsg}</span>}
            </div>

            <div className="col-md-6">
              <label htmlFor="Password">Password</label>
              <input id="Password"
                     type="password"
                     className={`form-control ${password.isValid ? 'is-valid' : 'is-invalid'}`}
                     value={password.value}
                     onChange={e => setPassword({...password, value: e.target.value})}
                     onBlur={e => onCheckPassword(e.target.value)}
              />
              {password.isValid === false && <span className="alert-danger">{password.validationMsg}</span>}
            </div>

            <div className="col-md-3 my-3">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
};


export default LoginModal;
