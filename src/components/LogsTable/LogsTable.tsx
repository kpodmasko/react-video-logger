import React, { FC, memo, useCallback } from "react";
import classNames from "classnames";
import { Column, Table } from "react-virtualized";

import { IBaseProps } from "@declarations/interfaces";
import { Classes, LogInfo, LogsTableKey } from "@declarations/types";

import "./LogsTable.scss";

interface ILogsTableProps extends IBaseProps {
  logs: Array<LogInfo>;
  onRowClick?: (rowData: LogInfo) => void;
  onHeaderClick?: (dataKey: LogsTableKey) => void;
}

export const mainCssClass = "logs-table";

// TODO: add tests
// TODO: think about beauty

const LogsTable: FC<ILogsTableProps> = (props: ILogsTableProps) => {
  const { logs, className, onRowClick, onHeaderClick } = props;

  const classes: Classes = classNames(mainCssClass, className);

  const rowGetter = useCallback(({ index }): LogInfo => logs[index], [logs]);

  const handleRowClick = useCallback(
    (eventCallback): void => {
      const rowData: LogInfo = eventCallback.rowData;

      if (onRowClick) {
        onRowClick(rowData);
      }
    },
    [onRowClick]
  );

  const handleHeaderClick = useCallback(
    (eventCallback): void => {
      const dataKey: LogsTableKey = eventCallback.dataKey;

      if (onHeaderClick) {
        onHeaderClick(dataKey);
      }
    },
    [onHeaderClick]
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
