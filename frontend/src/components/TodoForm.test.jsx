import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('không gọi onSubmit và hiện lỗi khi title rỗng hoặc chỉ có khoảng trắng', () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Thêm công việc' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Tiêu đề không được để trống')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Tiêu đề công việc'), { target: { value: '   ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Thêm công việc' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Tiêu đề không được để trống')).toBeInTheDocument();
  });

  it('gọi onSubmit với đúng title/description khi title hợp lệ', () => {
    const onSubmit = vi.fn();
    render(<TodoForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Tiêu đề công việc'), { target: { value: 'Học Vitest' } });
    fireEvent.change(screen.getByLabelText('Mô tả (tùy chọn)'), { target: { value: 'Viết test cho form' } });
    fireEvent.click(screen.getByRole('button', { name: 'Thêm công việc' }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Học Vitest', description: 'Viết test cho form' });
  });

  it('hiện đúng giá trị ban đầu khi có initialData (chế độ sửa)', () => {
    const initialData = { title: 'Todo cũ', description: 'Mô tả cũ' };
    render(<TodoForm onSubmit={vi.fn()} initialData={initialData} onCancelEdit={vi.fn()} />);

    expect(screen.getByLabelText('Tiêu đề công việc')).toHaveValue('Todo cũ');
    expect(screen.getByLabelText('Mô tả (tùy chọn)')).toHaveValue('Mô tả cũ');
  });

  it('gọi onCancelEdit khi bấm nút "Hủy"', () => {
    const onCancelEdit = vi.fn();
    const initialData = { title: 'Todo cũ', description: 'Mô tả cũ' };
    render(<TodoForm onSubmit={vi.fn()} initialData={initialData} onCancelEdit={onCancelEdit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Hủy' }));
    expect(onCancelEdit).toHaveBeenCalledTimes(1);
  });
});
