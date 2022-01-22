import React, {FC} from 'react';
import Col from "../../../../../../components/col/col";
import {IChooseReason} from "../../constants";

interface IReasonProps {
  reason: IChooseReason
}

const Reason: FC<IReasonProps> = ({reason}) => {
  return (
    <Col md={4} className="choose-reason text-center text-md-start">
      <img src={reason.iconPath} alt="icon" className="svg-icon choose-reason__img"/>
      <p className="has-text-primary choose-reason__title">{reason.firstParg}</p>
      <p className="has-text-primary choose-reason__subtitle">{reason.secondParg}</p>
      <p className="choose-reason__description">{reason.description}</p>
    </Col>
  );
};

export default Reason;
