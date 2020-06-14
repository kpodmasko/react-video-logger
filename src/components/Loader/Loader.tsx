import React, { FC, memo } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { IBaseProps } from "@declarations/interfaces";
import { Classes } from "@declarations/types";

import "./Loader.scss";

export const mainCssClass = "loader";

// TODO: add tests
const Loader: FC<IBaseProps> = (props: IBaseProps) => {
  const { className } = props;

  const classes: Classes = classNames(mainCssClass, className);

  return (
    <div className={classes}>
      <div className={`${mainCssClass}__body`}>
        <FontAwesomeIcon icon={faSpinner} />
      </div>
    </div>
  );
};

export default memo(Loader);
