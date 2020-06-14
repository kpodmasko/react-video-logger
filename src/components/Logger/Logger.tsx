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
  // expects only 1 child to calc logger width and height
  children: ReactChild | ReactElement | null;
  currentTime: Time;
}

type CanvasSizes = {
  width: Size;
  height: Size;
};

export const mainCssClass = "logger";

// TODO: add tests
// TODO: think about active logs replacing to App
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
    const loggerChildInstance =
      loggerSourceWrapperRef.current?.firstElementChild;

    if (!loggerChildInstance) {
      return;
    }

    const resizeListener = erd();
    resizeListener.listenTo(loggerChildInstance, handleResize);

    return () => {
      if (resizeListener) {
        resizeListener.uninstall();
      }
    };
  }, [children, handleResize]);

  useEffect(() => {
    const canvas = loggerOverlayRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    logs?.forEach(({ zone, begin, end }) => {
      // if active log
      if (begin <= currentTime && currentTime <= end) {
        // draw rectangle
        const { top, left, width, height } = zone;

        context.beginPath();
        context.rect(left, top, width, height);
        context.lineWidth = 15;
        context.strokeStyle = "green";
        context.stroke();
      }
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
