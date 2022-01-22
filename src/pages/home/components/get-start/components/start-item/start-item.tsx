import "./start-item.scss";

import React, { FC } from "react";
import { IStartItem } from "../../constants";

interface IStartItemProps {
  item: IStartItem;
}

const StartItem: FC<IStartItemProps> = ({ item }) => {
  return (
    <div className="item">
      <div className="subtitle has-text-primary text-capitalize">
        {item.title}
      </div>
      <div className="description  text-capitalize">{item.description}</div>
    </div>
  );
};

export default StartItem;
