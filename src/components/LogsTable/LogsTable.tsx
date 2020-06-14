import React, { FC, memo, useCallback, useMemo, useState } from "react";
import orderBy from "lodash/orderBy";
import classNames from "classnames";
import { Column, Table } from "react-virtualized";

import { IBaseProps } from "@declarations/interfaces";
import { Classes, LogInfo, LogsTableKey } from "@declarations/types";
import { SortDirection } from "@declarations/enums";

import "./LogsTable.scss";

interface ILogsTableProps extends IBaseProps {
  logs: Array<LogInfo>;
  onRowClick?: (rowData: LogInfo) => void;
}

export const mainCssClass = "logs-table";

// TODO: add tests
// TODO: think about beauty
// TODO: add sort icons
const LogsTable: FC<ILogsTableProps> = (props: ILogsTableProps) => {
  const { logs, className, onRowClick } = props;

  const [sortKey, setSortKey] = useState<LogsTableKey>("formattedBegin");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const classes: Classes = classNames(mainCssClass, className);

  const sortedLogs = useMemo(() => {
    return orderBy(logs, [sortKey], [sortDirection]);
  }, [logs, sortDirection, sortKey]);

  const rowGetter = useCallback(({ index }): LogInfo => sortedLogs[index], [
    sortedLogs,
  ]);

  const handleRowClick = useCallback(
    (eventCallback): void => {
      const rowData: LogInfo = eventCallback.rowData;
      const event: Event = eventCallback.event;

      event.preventDefault();
      event.stopPropagation();

      if (onRowClick) {
        onRowClick(rowData);
      }
    },
    [onRowClick]
  );

  const handleHeaderClick = useCallback(
    (eventCallback): void => {
      const dataKey: LogsTableKey = eventCallback.dataKey;
      const event: Event = eventCallback.event;

      event.preventDefault();
      event.stopPropagation();

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

  return (
    <Table
      headerHeight={40}
      rowHeight={30}
      rowCount={logs.length}
      rowGetter={rowGetter}
      className={classes}
      width={600}
      height={800}
      onRowClick={handleRowClick}
      onHeaderClick={handleHeaderClick}
    >
      <Column label="Id" dataKey="id" width={200} />
      <Column label="Begin time" dataKey="formattedBegin" width={200} />
      <Column label="End time" dataKey="formattedEnd" width={200} />
    </Table>
  );
};
export default memo(LogsTable);
