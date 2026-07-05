import { Box, Typography } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import TodoItem from './TodoItem';

function TodoList({ todos, onEdit, onDelete, onToggleStatus }) {
  if (todos.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          color: 'text.secondary',
        }}
      >
        <InboxOutlinedIcon sx={{ fontSize: 56, mb: 1.5, opacity: 0.5 }} />
        <Typography variant="body1">Chưa có công việc nào</Typography>
        <Typography variant="body2">Thêm công việc mới để bắt đầu</Typography>
      </Box>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TodoList;
