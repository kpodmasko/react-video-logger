import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import Spoiler from "@components/Spoiler";
import VideoPlayer from "@components/VideoPlayer";
import VideoConfigurationForm from "@components/VideoConfigurationForm";
import Logger from "@components/Logger";
import LogsTable from "@components/LogsTable";
import Error from "@components/Error";
import Loader from "@components/Loader";
import {
  LogId,
  LogInfo,
  Time,
  VideoConfiguration,
  VideoPlayerInfo,
} from "@declarations/types";
import { getLogs } from "@actions/LogsActions";
import { error as errorActions } from "@actions/ErrorActions";
import { videoConfiguration as videoConfigurationActions } from "@actions/VideoConfigurationActions";
import selectAppState from "@utils/selectors";
import { checkIsWide } from "@utils/helpers";

import "./App.scss";

const mainCssClass = "app";

// TODO: fix: there is an error (At least one item is required)
// TODO: check for typescript after redux
const App: FC = () => {
  const [videoCurrentTime, setVideoCurrentTime] = useState<Time>(0); // is not in redux for optimization reasons
  const [isWide, setIsWide] = useState<boolean>(true);

  const newDirectCurrentTime = useRef<Time>(null);

  const dispatch = useDispatch();

  const { logs, error, loader, videoConfiguration } = useSelector(
    selectAppState
  );

  // is not in redux for optimization reasons
  const activeLogs: Array<LogInfo> = useMemo((): Array<LogInfo> => {
    return logs.filter(
      ({ begin, end }) => begin <= videoCurrentTime && videoCurrentTime <= end
    );
  }, [videoCurrentTime, logs]);

  // is not in redux for optimization reasons
  const activeLogsIds: Array<LogId> = useMemo((): Array<LogId> => {
    return activeLogs.map((log) => log.id);
  }, [activeLogs]);

  const { logsUrl, videoUrl, updateInterval } = videoConfiguration;

  const handleVideoConfigurationSubmit = useCallback(
    (videoConfiguration: VideoConfiguration): void => {
      const { videoUrl, logsUrl, updateInterval } = videoConfiguration;

      dispatch(
        videoConfigurationActions.setProps({
          videoUrl,
          logsUrl,
          updateInterval,
        })
      );
    },
    [dispatch]
  );

  const handleVideoPlayerTimeUpdate = useCallback(
    (videoPlayerInfo: VideoPlayerInfo): void => {
      const { time } = videoPlayerInfo;

      setVideoCurrentTime(time);
    },
    []
  );

  const handleLogTableRowClick = useCallback((rowData: LogInfo): void => {
    const { begin } = rowData;

    // when row click is clicked need to change the video time ONCE. Only ONCE as if implement
    // fully controlled state for current time, video will be lagging because of amount of rerenders
    newDirectCurrentTime.current = begin;
    setVideoCurrentTime(begin);
  }, []);

  const handleErrorClose = useCallback((): void => {
    dispatch(errorActions.removeError());
  }, [dispatch]);

  const handleResize = useCallback((): void => {
    setIsWide(checkIsWide());
  }, []);

  useEffect((): void => {
    newDirectCurrentTime.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectCurrentTime.current]); // after render (after current time change) disable direct change

  useEffect((): void => {
    dispatch(getLogs.request(logsUrl));
  }, [dispatch, logsUrl]);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return isWide ? (
    <>
      <Spoiler
        label="Video configuration"
        className={`${mainCssClass}__video-configuration-spoiler`}
      >
        <VideoConfigurationForm
          onSubmit={handleVideoConfigurationSubmit}
          videoConfiguration={videoConfiguration}
        />
      </Spoiler>
      {error && <Error onClose={handleErrorClose}>{error}</Error>}
      {loader && <Loader />}
      <div className={`${mainCssClass}__video-logger-container`}>
        <Logger logs={activeLogs} currentTime={videoCurrentTime}>
          <VideoPlayer
            videoUrl={videoUrl}
            onTimeUpdate={handleVideoPlayerTimeUpdate}
            updateInterval={updateInterval}
            directCurrentTime={newDirectCurrentTime.current}
          />
        </Logger>
      </div>
      {logs?.length ? (
        <div className={`${mainCssClass}__logs-table-container`}>
          <LogsTable
            className={`${mainCssClass}__logs-table`}
            logs={logs}
            activeLogsIds={activeLogsIds}
            onRowClick={handleLogTableRowClick}
          />
        </div>
      ) : null}
      <footer className={`${mainCssClass}__footer`}>
        <span>Konstantin Podmasko</span>
      </footer>
    </>
  ) : (
    <p className={`${mainCssClass}__wide-error`}>
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className={`${mainCssClass}__wide-error-icon`}
      />
      Sorry, but we can not run this application because you don`t have enough
      screen width.
    </p>
  );
};

export default App;
