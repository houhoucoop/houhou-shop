'use client';

import { useState } from 'react';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row, Table } from '@tanstack/react-table';
import { v4 as uuidv4 } from 'uuid';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { labels } from '../data/data';
import {
  useUpdateTaskMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} from '@/app/api/graphql/__generated__/hooks';
import { Task } from '@/app/api/graphql/__generated__/types';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  table: Table<TData>;
  refetchGetTasks: (param: any) => void;
}

export function DataTableRowActions<TData>({
  row,
  table,
  refetchGetTasks,
}: DataTableRowActionsProps<TData>) {
  const { id, name, title, status, label, priority } =
    (row.original as Task) || {};

  const [labelValue, setLabelValue] = useState(label);
  const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
    onCompleted: () => {
      refetchGetTasks({ offset: 0 });
      table.setPageIndex(0);
    },
  });
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation({
    onCompleted: refetchGetTasks,
  });

  const handleLabelUpdate = (nextLabel: string) => {
    setLabelValue(nextLabel);
    updateTaskMutation({ variables: { id, label: nextLabel } });
  };

  const handleCopyClick = () => {
    createTaskMutation({
      variables: { id: uuidv4(), name, title, status, label, priority },
    });
  };

  const handleDeleteClick = () => {
    deleteTaskMutation({ variables: { id } });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleCopyClick}>
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup
              value={label}
              onValueChange={handleLabelUpdate}
            >
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteClick}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
