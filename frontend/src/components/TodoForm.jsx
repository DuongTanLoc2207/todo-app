import { useState } from 'react';
import { Box, TextField, Button, Stack } from '@mui/material';

function TodoForm({ onSubmit, initialData, onCancelEdit }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Tiêu đề không được để trống');
      return;
    }

    setTitleError('');
    onSubmit({ title: title.trim(), description: description.trim() });

    if (!initialData) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Tiêu đề công việc"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (titleError) setTitleError('');
          }}
          error={!!titleError}
          helperText={titleError}
          fullWidth
          size="small"
          inputProps={{ maxLength: 200 }}
        />
        <TextField
          label="Mô tả (tùy chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          size="small"
          inputProps={{ maxLength: 1000 }}
          sx={{
            '& .MuiInputBase-root': {
              alignItems: 'center',
              py: 1.25,
            },
            '& .MuiInputBase-inputMultiline': {
              py: 0,
            },
          }}
        />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            {initialData ? 'Cập nhật' : 'Thêm công việc'}
          </Button>
          {initialData && (
            <Button variant="outlined" onClick={onCancelEdit}>
              Hủy
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default TodoForm;