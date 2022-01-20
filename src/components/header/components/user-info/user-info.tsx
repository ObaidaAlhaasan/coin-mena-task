import React, {FC} from 'react';
import {useStore} from "../../../../store/store";

const UserInfo: FC = () => {
  const {currentUser} = useStore();

  return <div>
    Welcome <strong className="has-text-primary">{currentUser?.username}</strong>
  </div>
}

export default UserInfo;
