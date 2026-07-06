import { useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  IconButton,
  Chip,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from 'dayjs';

function TodoItem({ todo, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = todo.status === 'completed';
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(todo._id);
    setConfirmOpen(false);
  };

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
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
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
                sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}
              >
                {todo.description}
              </Typography>
            )}
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: { sm: 'space-between' },
                flexWrap: 'wrap',
                gap: { xs: 1.5, sm: 1 },
                mr: { xs: 0, sm: 2 },
              }}
            >
              <Chip
                label={isCompleted ? 'Hoàn thành' : 'Chưa hoàn thành'}
                size="small"
                sx={{
                  flexShrink: 0,
                  bgcolor: isCompleted ? 'completed.light' : 'pending.light',
                  color: isCompleted ? 'completed.contrastText' : 'pending.contrastText',
                }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                Tạo lúc: {dayjs(todo.createdAt).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" onClick={() => onEdit(todo)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={() => setConfirmOpen(true)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa công việc "{todo.title}" không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default TodoItem;
