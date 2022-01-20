import React, {FC} from 'react';
import {useStore} from "../../../../store/store";

const UserInfo: FC = () => {
  const {currentUser} = useStore();

  return <div>
    <img src={currentUser?.profilePic} className="user-profile-pic" alt="user icon"/>

    <strong className="has-text-primary">{currentUser?.username}</strong>
  </div>
}

export default UserInfo;
