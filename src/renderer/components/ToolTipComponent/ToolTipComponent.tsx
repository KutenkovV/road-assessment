import React, { ReactElement, useState } from 'react';
import classes from './ToolTipComponent.scss';

type PropsType = {
  children: ReactElement;
  text: string;
};

const ToolTipComponent: React.FC<PropsType> = ({ children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const onMouseEnterHandler = () => {
    setShowToolTip(true);
  };

  const onMouseLeaveHandler = () => {
    setShowToolTip(false);
  };

  return (
    <div className={classes.container} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      {children}
      {showToolTip && <div className={classes.tooltip}>{text}</div>}
    </div>
  );
};

export default ToolTipComponent;