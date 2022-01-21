import React, {FC} from 'react';
import CryptoIconsService from "../../services/crypto-icons";

export const CryptoIcon: FC<{ iconName: string }> = (props) => {
  const path = CryptoIconsService.AvailableIconsPaths[props.iconName.toLowerCase()] ?? CryptoIconsService.GenericIconPath;
  return <img src={path} alt="crypto icon"/>;
}
