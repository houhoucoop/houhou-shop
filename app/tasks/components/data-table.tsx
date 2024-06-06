'use client';

import { useState, useMemo, useEffect, SetStateAction } from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
  PaginationState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetTasksQuery } from '@/app/api/graphql/__generated__/hooks';
import { Sort, Order } from '@/app/api/graphql/__generated__/types';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import { columns } from './columns';
import { PAGE_SIZES } from './constants';
import { mapEnum } from './utils';

export function DataTable() {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: Sort.CreatedAt, desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZES[0],
  });

  const filter = columnFilters.reduce((acc, filter) => {
    if (filter.id !== 'title') return acc;
    return { keyword: filter.value };
  }, {});

  const { data, loading, refetch, error } = useGetTasksQuery({
    variables: {
      limit: pagination.pageSize,
      offset: pagination.pageIndex * pagination.pageSize,
      sort: mapEnum(sorting[0]?.id, Sort),
      order: mapEnum(sorting[0]?.desc ? Order.Desc : Order.Asc, Order),
      filter,
    },
  });

  const defaultData = useMemo(() => [], []);
  const tasks = loading ? defaultData : data?.tasks?.items || defaultData;

  const table = useReactTable({
    data: tasks,
    columns,
    rowCount: data?.tasks?.totalCount || 0,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    manualPagination: true,
    autoResetPageIndex: false,
    manualSorting: true,
    onPaginationChange: setPagination,
    onSortingChange: (updater) => {
      setPagination((prevPagination) => ({ ...prevPagination, pageIndex: 0 }));
      setSorting(updater);
    },
    onColumnFiltersChange: (updater) => {
      setPagination((prevPagination) => ({ ...prevPagination, pageIndex: 0 }));
      setColumnFilters(updater);
    },
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const renderTableStatus = () => {
    if (loading) return 'Loading...';
    if (error?.networkError) return error.networkError.message;
    if (error?.graphQLErrors?.length) return 'Internal server error.';
    return 'No results.';
  };

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, {
                        ...cell.getContext(),
                        refetchGetTasks: refetch,
                      })}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {renderTableStatus()}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
