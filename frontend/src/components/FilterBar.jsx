import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function FilterBar({
  statusFilter,
  onStatusChange,
  searchText,
  onSearchChange,
  sortOrder,
  onToggleSortOrder,
}) {
  const isDesc = sortOrder === 'desc';

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
      <TextField
        label="Tìm kiếm công việc"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        size="small"
        sx={{ width: { xs: '100%', sm: '65%' } }}
      />
      <FormControl size="small" sx={{ width: { xs: '100%', sm: '35%' } }}>
        <InputLabel id="status-filter-label">Trạng thái</InputLabel>
        <Select
          labelId="status-filter-label"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          input={
            <OutlinedInput
              label="Trạng thái"
              startAdornment={
                <InputAdornment position="start">
                  <FilterListIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              }
            />
          }
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="pending">Chưa xong</MenuItem>
          <MenuItem value="completed">Hoàn thành</MenuItem>
        </Select>
      </FormControl>
      <Tooltip title={isDesc ? 'Mới nhất trước' : 'Cũ nhất trước'}>
        <IconButton
          onClick={onToggleSortOrder}
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '10px',
            color: 'text.primary',
          }}
        >
          {isDesc ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default FilterBar;
