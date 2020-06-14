import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import orderBy from "lodash/orderBy";

import Spoiler from "@components/Spoiler";
import VideoPlayer from "@components/VideoPlayer";
import VideoConfigurationForm from "@components/VideoConfigurationForm";
import Logger from "@components/Logger";
import LogsTable from "@components/LogsTable";
import { formatTime, msToSeconds } from "@utils/time";
import {
  LogInfo,
  LogsTableKey,
  LogsURL,
  Time,
  VideoConfiguration,
  VideoPlayerInfo,
  VideoURL,
} from "@declarations/types";
import { SortDirection } from "@declarations/enums";

import "./App.scss";

// TODO: replace to REDUX as it is mock
const logs = JSON.parse(
  '[{"id":1,"timestamp":320303,"duration":907,"zone":{"left":535,"top":97,"width":120,"height":58}},{"id":2,"timestamp":99746,"duration":813,"zone":{"left":231,"top":64,"width":50,"height":43}},{"id":3,"timestamp":412932,"duration":344,"zone":{"left":975,"top":499,"width":98,"height":75}},{"id":4,"timestamp":376678,"duration":751,"zone":{"left":784,"top":108,"width":92,"height":73}},{"id":5,"timestamp":446363,"duration":591,"zone":{"left":124,"top":469,"width":143,"height":66}},{"id":6,"timestamp":304380,"duration":1038,"zone":{"left":68,"top":579,"width":134,"height":101}},{"id":7,"timestamp":201197,"duration":1034,"zone":{"left":658,"top":301,"width":132,"height":39}},{"id":8,"timestamp":29903,"duration":323,"zone":{"left":1002,"top":119,"width":95,"height":62}},{"id":9,"timestamp":205018,"duration":980,"zone":{"left":728,"top":495,"width":68,"height":87}},{"id":10,"timestamp":399626,"duration":1174,"zone":{"left":717,"top":437,"width":79,"height":78}},{"id":11,"timestamp":469798,"duration":618,"zone":{"left":752,"top":225,"width":87,"height":53}},{"id":12,"timestamp":132747,"duration":362,"zone":{"left":641,"top":407,"width":62,"height":94}},{"id":13,"timestamp":181042,"duration":783,"zone":{"left":955,"top":443,"width":132,"height":96}},{"id":14,"timestamp":317919,"duration":518,"zone":{"left":528,"top":376,"width":105,"height":91}},{"id":15,"timestamp":401389,"duration":662,"zone":{"left":857,"top":314,"width":55,"height":69}},{"id":16,"timestamp":305874,"duration":575,"zone":{"left":897,"top":244,"width":61,"height":70}},{"id":17,"timestamp":292851,"duration":882,"zone":{"left":64,"top":452,"width":128,"height":66}},{"id":18,"timestamp":461750,"duration":550,"zone":{"left":78,"top":195,"width":145,"height":98}},{"id":19,"timestamp":68074,"duration":676,"zone":{"left":420,"top":30,"width":120,"height":82}},{"id":20,"timestamp":441754,"duration":313,"zone":{"left":300,"top":370,"width":118,"height":35}},{"id":21,"timestamp":441592,"duration":650,"zone":{"left":596,"top":63,"width":76,"height":72}},{"id":22,"timestamp":268503,"duration":922,"zone":{"left":939,"top":493,"width":128,"height":99}},{"id":23,"timestamp":140537,"duration":891,"zone":{"left":778,"top":534,"width":60,"height":44}},{"id":24,"timestamp":348968,"duration":229,"zone":{"left":787,"top":357,"width":85,"height":40}},{"id":25,"timestamp":216023,"duration":403,"zone":{"left":1097,"top":442,"width":119,"height":73}},{"id":26,"timestamp":194043,"duration":938,"zone":{"left":619,"top":561,"width":146,"height":104}},{"id":27,"timestamp":258891,"duration":1040,"zone":{"left":543,"top":113,"width":121,"height":39}},{"id":28,"timestamp":298654,"duration":879,"zone":{"left":50,"top":48,"width":59,"height":89}},{"id":29,"timestamp":139269,"duration":1134,"zone":{"left":720,"top":269,"width":145,"height":89}},{"id":30,"timestamp":262365,"duration":393,"zone":{"left":718,"top":193,"width":52,"height":80}},{"id":31,"timestamp":273875,"duration":243,"zone":{"left":410,"top":615,"width":71,"height":103}},{"id":43,"timestamp":138669,"duration":965,"zone":{"left":497,"top":561,"width":86,"height":56}},{"id":44,"timestamp":397291,"duration":436,"zone":{"left":757,"top":41,"width":123,"height":97}},{"id":59,"timestamp":201262,"duration":378,"zone":{"left":898,"top":513,"width":128,"height":75}},{"id":35,"timestamp":197808,"duration":1184,"zone":{"left":407,"top":348,"width":84,"height":53}},{"id":36,"timestamp":402048,"duration":684,"zone":{"left":615,"top":444,"width":112,"height":36}},{"id":37,"timestamp":239018,"duration":273,"zone":{"left":753,"top":306,"width":145,"height":98}},{"id":38,"timestamp":68811,"duration":453,"zone":{"left":393,"top":476,"width":103,"height":41}},{"id":39,"timestamp":301856,"duration":488,"zone":{"left":977,"top":522,"width":142,"height":78}},{"id":40,"timestamp":49820,"duration":1032,"zone":{"left":351,"top":254,"width":128,"height":70}},{"id":41,"timestamp":444314,"duration":1164,"zone":{"left":11,"top":168,"width":89,"height":41}},{"id":42,"timestamp":282043,"duration":328,"zone":{"left":1024,"top":220,"width":81,"height":59}}]'
).map((log) => {
  const { timestamp, duration } = log;

  const begin = msToSeconds(timestamp);
  const end = msToSeconds(timestamp + duration);
  const formattedBegin = formatTime(timestamp);
  const formattedEnd = formatTime(timestamp + duration);

  return { ...log, begin, end, formattedBegin, formattedEnd };
});

const mainCssClass = "app";

const App: FC = () => {
  // TODO: think maybe replace to useReducer/redux
  const [videoUrl, setVideoUrl] = useState<VideoURL>(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [logsUrl, setLogsUrl] = useState<LogsURL>("default logs url");
  const [videoCurrentTime, setVideoCurrentTime] = useState<Time>(0);
  const [updateInterval, setUpdateInterval] = useState<Time>(10);
  const [sortKey, setSortKey] = useState<LogsTableKey>("formattedBegin");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const newDirectCurrentTime = useRef<Time>(null);

  const videoConfiguration = useMemo(
    (): VideoConfiguration => ({ videoUrl, logsUrl, updateInterval }),
    [videoUrl, logsUrl, updateInterval]
  );

  const sortedLogs = useMemo(() => {
    return orderBy(logs, [sortKey], [sortDirection]);
  }, [sortDirection, sortKey]);

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

      // TODO: fix: there is an error to console from this line (At least one item is required)
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

  const handleLogTableHeaderClick = useCallback(
    (dataKey: LogsTableKey): void => {
      if (dataKey === sortKey) {
        setSortDirection(
          sortDirection === SortDirection.ASC
            ? SortDirection.DESC
            : SortDirection.ASC
        );
      } else {
        setSortKey(dataKey);
      }
    },
    [sortKey, sortDirection]
  );

  useEffect(() => {
    newDirectCurrentTime.current = null;
    // after render (after current time change) disable direct change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDirectCurrentTime.current]);

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
      <div className={`${mainCssClass}__logs-table-container`}>
        <LogsTable
          logs={sortedLogs}
          onRowClick={handleLogTableRowClick}
          onHeaderClick={handleLogTableHeaderClick}
        />
      </div>
      <footer className={`${mainCssClass}__footer`}>
        <span>Konstantin Podmasko</span>
      </footer>
    </>
  );
};

export default App;
