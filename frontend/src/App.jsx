import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Stack, Avatar, Snackbar, Alert } from '@mui/material';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';
import PaginationControl from './components/PaginationControl';
import { getTodos, createTodo, updateTodo, updateTodoStatus, deleteTodo } from './services/todoApi';

const PAGE_SIZE = 5;

function App() {
  const [todos, setTodos] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0, limit: PAGE_SIZE });
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState('');

  const fetchTodos = useCallback(async () => {
    const params = { page: currentPage, limit: PAGE_SIZE, sortBy: 'createdAt', sortOrder };
    if (statusFilter !== 'all') params.status = statusFilter;
    if (searchText) params.search = searchText;
    return getTodos(params);
  }, [statusFilter, searchText, currentPage, sortOrder]);

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchTextChange = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    let ignore = false;

    fetchTodos()
      .then((res) => {
        if (!ignore) {
          setTodos(res.data.data);
          setPagination(res.data.pagination);
        }
      })
      .catch(() => {
        if (!ignore) setError('Không thể tải danh sách công việc');
      });

    return () => {
      ignore = true;
    };
  }, [fetchTodos]);

  const refreshTodos = () => {
    fetchTodos()
      .then((res) => {
        setTodos(res.data.data);
        setPagination(res.data.pagination);
      })
      .catch(() => setError('Không thể tải danh sách công việc'));
  };

  const handleCreate = async (data) => {
    try {
      await createTodo(data);
      refreshTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể thêm công việc');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await updateTodo(id, data);
      setEditingTodo(null);
      refreshTodos();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật công việc');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      await updateTodoStatus(id, newStatus);
      refreshTodos();
    } catch {
      setError('Không thể đổi trạng thái');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      refreshTodos();
    } catch {
      setError('Không thể xóa công việc');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 4, sm: 6 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: 'center', textAlign: { xs: 'center', sm: 'left' }, mb: 5 }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 48,
            height: 48,
            boxShadow: '0 6px 16px rgba(91, 95, 239, 0.35)',
          }}
        >
          <ChecklistRtlIcon fontSize="medium" />
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Quản lý công việc
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Theo dõi và sắp xếp công việc của bạn mỗi ngày
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mb: 4 }}>
        <TodoForm
          key={editingTodo?._id || 'new'}
          onSubmit={editingTodo ? (data) => handleUpdate(editingTodo._id, data) : handleCreate}
          initialData={editingTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={handleStatusFilterChange}
          searchText={searchText}
          onSearchChange={handleSearchTextChange}
          sortOrder={sortOrder}
          onToggleSortOrder={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
        />
      </Box>

      <TodoList
        todos={todos}
        onEdit={setEditingTodo}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <PaginationControl
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
      />

      <Snackbar open={!!error} autoHideDuration={4000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;