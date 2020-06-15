import React, { FC, memo, useCallback, useMemo, useState } from "react";
import orderBy from "lodash/orderBy";
import classNames from "classnames";
import { Column, Table } from "react-virtualized";

import { IBaseProps } from "@declarations/interfaces";
import { Classes, LogId, LogInfo, LogsTableKey } from "@declarations/types";
import { SortDirection } from "@declarations/enums";

import "./LogsTable.scss";

interface ILogsTableProps extends IBaseProps {
  logs: Array<LogInfo>;
  activeLogsIds: Array<LogId>;
  onRowClick?: (rowData: LogInfo) => void;
}

export const mainCssClass = "logs-table";

const LogsTable: FC<ILogsTableProps> = (props: ILogsTableProps) => {
  const { logs, className, onRowClick, activeLogsIds } = props;

  const [sortKey, setSortKey] = useState<LogsTableKey>("formattedBegin");
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.ASC
  );

  const classes: Classes = classNames(mainCssClass, className);

  const sortedLogs = useMemo((): Array<LogInfo> => {
    return orderBy(logs, [sortKey], [sortDirection.toLowerCase()]);
  }, [logs, sortDirection, sortKey]);

  const rowGetter = useCallback(
    ({ index }: { index: number }): LogInfo => sortedLogs[index],
    [sortedLogs]
  );

  const rowClassNameSetter = useCallback(
    ({ index }: { index: number }): Classes => {
      const log: LogInfo | undefined = sortedLogs[index]; // for header index is -1
      const { id } = log || {};

      return classNames(`${mainCssClass}__row`, {
        [`${mainCssClass}__row--active`]: id && activeLogsIds.includes(id),
      });
    },
    [sortedLogs, activeLogsIds]
  );

  const handleRowClick = useCallback(
    (eventCallback: { rowData: LogInfo; event: Event }): void => {
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
    (eventCallback: { dataKey: LogsTableKey; event: Event }): void => {
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
      rowCount={logs?.length || 0}
      rowGetter={rowGetter}
      rowClassName={rowClassNameSetter}
      className={classes}
      width={600}
      height={800}
      onRowClick={handleRowClick}
      onHeaderClick={handleHeaderClick}
      sortBy={sortKey}
      sortDirection={sortDirection}
    >
      <Column label="Id" dataKey="id" width={200} />
      <Column label="Begin time" dataKey="formattedBegin" width={200} />
      <Column label="End time" dataKey="formattedEnd" width={200} />
    </Table>
  );
};
export default memo(LogsTable);
