import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitForElementToBeRemoved, within } from '@testing-library/react';
import TodoItem from './TodoItem';

const baseTodo = {
  _id: 'todo-1',
  title: 'Dọn dẹp bàn làm việc',
  description: '',
  createdAt: '2026-01-01T00:00:00.000Z',
};

const openDeleteDialog = () => {
  fireEvent.click(screen.getByTestId('DeleteIcon').closest('button'));
};

describe('TodoItem', () => {
  it('hiện label "Chưa hoàn thành" khi status là pending', () => {
    render(
      <TodoItem
        todo={{ ...baseTodo, status: 'pending' }}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />
    );
    expect(screen.getByText('Chưa hoàn thành')).toBeInTheDocument();
  });

  it('hiện label "Hoàn thành" khi status là completed', () => {
    render(
      <TodoItem
        todo={{ ...baseTodo, status: 'completed' }}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />
    );
    expect(screen.getByText('Hoàn thành')).toBeInTheDocument();
  });

  it('mở dialog xác nhận có tên todo khi bấm nút xóa', () => {
    render(
      <TodoItem
        todo={{ ...baseTodo, status: 'pending' }}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />
    );

    openDeleteDialog();

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText('Xác nhận xóa')).toBeInTheDocument();
    expect(within(dialog).getByText(new RegExp(baseTodo.title))).toBeInTheDocument();
  });

  it('đóng dialog và không gọi onDelete khi bấm "Hủy" trong dialog', async () => {
    const onDelete = vi.fn();
    render(
      <TodoItem
        todo={{ ...baseTodo, status: 'pending' }}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onToggleStatus={vi.fn()}
      />
    );

    openDeleteDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }));

    expect(onDelete).not.toHaveBeenCalled();
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });

  it('gọi onDelete với đúng id và đóng dialog khi bấm "Xóa" trong dialog', async () => {
    const onDelete = vi.fn();
    render(
      <TodoItem
        todo={{ ...baseTodo, status: 'pending' }}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onToggleStatus={vi.fn()}
      />
    );

    openDeleteDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Xóa' }));

    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(baseTodo._id);
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });
});
