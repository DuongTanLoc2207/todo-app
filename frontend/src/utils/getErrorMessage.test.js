import { describe, it, expect } from 'vitest';
import { getErrorMessage } from './getErrorMessage';

describe('getErrorMessage', () => {
  it('trả về message từ err.response.data.message khi tồn tại', () => {
    const err = { response: { data: { message: 'Lỗi từ server' } } };
    expect(getErrorMessage(err, 'fallback')).toBe('Lỗi từ server');
  });

  it('trả về fallback khi err.response tồn tại nhưng không có message', () => {
    const err = { response: { data: {} } };
    expect(getErrorMessage(err, 'fallback')).toBe('fallback');
  });

  it('trả về fallback khi err.response không tồn tại (network error)', () => {
    const err = {};
    expect(getErrorMessage(err, 'fallback')).toBe('fallback');
  });

  it('trả về fallback khi err là null hoặc undefined, không throw lỗi', () => {
    expect(getErrorMessage(null, 'fallback')).toBe('fallback');
    expect(getErrorMessage(undefined, 'fallback')).toBe('fallback');
  });
});
