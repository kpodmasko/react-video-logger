import React, { KeyboardEvent, MouseEvent, useCallback, FC, memo } from "react";
import classNames from "classnames";

import { IBaseProps } from "@declarations/interfaces";
import { Classes } from "@declarations/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Error.scss";

export const mainCssClass = "error";

interface IErrorProps extends IBaseProps {
  onClose?: () => void;
}

const Error: FC<IErrorProps> = (props: IErrorProps) => {
  const { className, children, onClose } = props;

  const classes: Classes = classNames(mainCssClass, className);

  const handleCloseClick = useCallback(
    (event: MouseEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (onClose) {
        onClose();
      }
    },
    [onClose]
  );

  const handleCloseKeyPress = useCallback(
    (event: KeyboardEvent): void => {
      event.preventDefault();
      event.stopPropagation();

      if (event.key !== "Enter" || !onClose) {
        return;
      }

      onClose();
    },
    [onClose]
  );

  return (
    <div className={classes}>
      <div className={`${mainCssClass}__body`}>
        <div className={`${mainCssClass}__close-wrapper`}>
          <button
            className={`${mainCssClass}__close`}
            onClick={handleCloseClick}
            onKeyPress={handleCloseKeyPress}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className={`${mainCssClass}__error-text`}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Error);
