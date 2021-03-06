import React, {
  FC,
  memo,
  useCallback,
  useState,
  MouseEvent,
  KeyboardEvent,
} from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { IBaseProps } from "@declarations/interfaces";
import { Classes } from "@declarations/types";

import "./Spoiler.scss";

interface ISpoilerProps extends IBaseProps {
  label: string;
}

export const mainCssClass = "spoiler";

const Spoiler: FC<ISpoilerProps> = (props: ISpoilerProps) => {
  const { className, children, label } = props;

  const [isOpen, setIsOpen] = useState<boolean>(true);

  const classes: Classes = classNames(mainCssClass, className);
  const contentClasses: Classes = classNames(`${mainCssClass}__content`, {
    [`${mainCssClass}__content--open`]: isOpen,
  });

  const toggleIsOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = useCallback((event: MouseEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    toggleIsOpen();
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.key === "Enter") {
      toggleIsOpen();
    }
  }, []);

  return (
    <>
      <div className={classes}>
        <div
          className={`${mainCssClass}__label`}
          onClick={handleClick}
          onKeyPress={handleKeyPress}
          role="button"
          tabIndex={0}
        >
          {label}
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
        </div>
        <div className={contentClasses} aria-hidden={!isOpen}>
          {children}
        </div>
      </div>
    </>
  );
};

export default memo(Spoiler);
