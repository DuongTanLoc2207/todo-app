import { Card, CardContent, Checkbox, Typography, IconButton, Chip, Stack, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function TodoItem({ todo, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = todo.status === 'completed';

  return (
    <Card
      sx={{
        mb: 2,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(31, 33, 51, 0.1)',
        },
      }}
    >
      <CardContent sx={{ py: 2, px: 2.5, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.5}>
          <Checkbox
            checked={isCompleted}
            onChange={() => onToggleStatus(todo._id, todo.status)}
            sx={{
              color: 'pending.main',
              '&.Mui-checked': { color: 'completed.main' },
            }}
          />
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              sx={{
                textDecoration: isCompleted ? 'line-through' : 'none',
                color: isCompleted ? 'text.secondary' : 'text.primary',
              }}
            >
              {todo.title}
            </Typography>
            {todo.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {todo.description}
              </Typography>
            )}
            <Chip
              label={isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}
              size="small"
              sx={{
                mt: 1,
                bgcolor: isCompleted ? 'completed.light' : 'pending.light',
                color: isCompleted ? 'completed.contrastText' : 'pending.contrastText',
              }}
            />
          </Box>
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" onClick={() => onEdit(todo)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(todo._id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TodoItem;
