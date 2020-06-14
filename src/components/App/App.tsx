import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Spoiler from "@components/Spoiler";
import VideoPlayer from "@components/VideoPlayer";
import VideoConfigurationForm from "@components/VideoConfigurationForm";
import Logger from "@components/Logger";
import LogsTable from "@components/LogsTable";
import Error from "@components/Error";
import Loader from "@components/Loader";
import {
  LogInfo,
  LogsURL,
  Time,
  VideoConfiguration,
  VideoPlayerInfo,
  VideoURL,
} from "@declarations/types";
import { getLogs } from "@actions/LogsActions";
import { error as errorActions } from "@actions/ErrorActions";
import selectAppState from "@utils/selectors";

import "./App.scss";

const mainCssClass = "app";

// TODO: fix: there is an error (At least one item is required)
const App: FC = () => {
  // TODO: think maybe replace to useReducer/redux
  const [videoUrl, setVideoUrl] = useState<VideoURL>(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [logsUrl, setLogsUrl] = useState<LogsURL>(
    "http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd"
  );
  const [updateInterval, setUpdateInterval] = useState<Time>(10);
  const [videoCurrentTime, setVideoCurrentTime] = useState<Time>(0);

  const newDirectCurrentTime = useRef<Time>(null);

  const dispatch = useDispatch();

  const videoConfiguration = useMemo(
    (): VideoConfiguration => ({ videoUrl, logsUrl, updateInterval }),
    [videoUrl, logsUrl, updateInterval]
  );

  const { logs, error, loader } = useSelector(selectAppState);

  const handleVideoConfigurationSubmit = useCallback(
    (videoConfiguration: VideoConfiguration): void => {
      const { videoUrl, logsUrl, updateInterval } = videoConfiguration;

      setVideoUrl(videoUrl);
      setLogsUrl(logsUrl);
      setUpdateInterval(updateInterval);
    },
    []
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

    // when row click is clicked need to change the video time ONCE as if implement
    // fully controlled state for current time video will be lagging because of amount of rerenders
    newDirectCurrentTime.current = begin;
    setVideoCurrentTime(begin);
  }, []);

  const handleErrorClose = useCallback((): void => {
    dispatch(errorActions.removeError());
  }, [dispatch]);

  useEffect((): void => {
    newDirectCurrentTime.current = null;
    // after render (after current time change) disable direct change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectCurrentTime.current]);

  useEffect((): void => {
    dispatch(getLogs.request(logsUrl));
  }, [dispatch, logsUrl]);

  return (
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
        <Logger logs={logs} currentTime={videoCurrentTime}>
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
          <LogsTable logs={logs} onRowClick={handleLogTableRowClick} />
        </div>
      ) : null}
      <footer className={`${mainCssClass}__footer`}>
        <span>Konstantin Podmasko</span>
      </footer>
    </>
  );
};

export default App;
