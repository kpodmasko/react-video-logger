import React, {
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  ReactChild,
  useState,
} from "react";
import erd from "element-resize-detector";
import classNames from "classnames";

import { Classes, LogInfo, Size, Time } from "@declarations/types";
import { IBaseProps } from "@declarations/interfaces";

import "./Logger.scss";

interface ILoggerProps extends IBaseProps {
  logs: Array<LogInfo>;
  children: ReactChild | ReactElement | null; // expects only 1 child to calc logger width and height
  currentTime: Time;
}

type CanvasSizes = {
  width: Size;
  height: Size;
};

export const mainCssClass = "logger";

// TODO: add tests
const Logger: FC<ILoggerProps> = (props: ILoggerProps) => {
  const { className, logs, children, currentTime } = props;

  const [sizes, setSizes] = useState<CanvasSizes>({ width: 0, height: 0 });

  const loggerSourceWrapperRef = useRef<HTMLDivElement>(null);
  const loggerOverlayRef = useRef<HTMLCanvasElement>(null);

  const classes: Classes = classNames(mainCssClass, className);

  const handleResize = useCallback((element: HTMLElement) => {
    const { offsetWidth: width, offsetHeight: height } = element;
    setSizes({
      width,
      height,
    });
  }, []);

  useEffect(() => {
    const loggerChildInstance: Element =
      loggerSourceWrapperRef.current?.firstElementChild;

    if (!loggerChildInstance) {
      return;
    }

    const resizeListener = erd();
    resizeListener.listenTo(loggerChildInstance, handleResize);

    return () => {
      resizeListener.uninstall(loggerChildInstance);
    };
  }, [handleResize]);

  useEffect(() => {
    const canvas: HTMLCanvasElement = loggerOverlayRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    logs?.forEach(({ zone }) => {
      const { top, left, width, height } = zone;

      context.beginPath();
      context.rect(left, top, width, height);
      context.lineWidth = 15;
      context.strokeStyle = "green";
      context.stroke();
    });
  }, [logs, currentTime]);

  return (
    <div className={classes}>
      <div
        className={`${mainCssClass}__source-wrapper`}
        ref={loggerSourceWrapperRef}
      >
        {children}
      </div>
      <canvas
        className={`${mainCssClass}__overlay`}
        {...sizes}
        ref={loggerOverlayRef}
      />
    </div>
  );
};

export default memo(Logger);
