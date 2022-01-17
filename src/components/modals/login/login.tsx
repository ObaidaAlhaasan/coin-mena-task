import React, {FC, FormEvent} from 'react';
import "./login.scss";

interface ILoginProps {
  onClose?: () => void;
  show: boolean;
}

const LoginModal: FC<ILoginProps> = ({show, onClose}) => {

  const onLogin = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
  }

  return <div className={`modal ${show ? 'enter-done' : 'exit'}`} onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h4 className="modal-title">Login</h4>
        <span className="close" onClick={onClose}>
          <i className="fas fa-times has-hover has-hover-affect"/>
        </span>
      </div>

      <div className="modal-body">
        <form onSubmit={onLogin}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="Email">Email</label>
              <input type="text" className='form-control' id="Email"/>
            </div>
            <div className="col-md-6">
              <label htmlFor="Password">Password</label>
              <input type="password" className='form-control' id="Password"/>
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
