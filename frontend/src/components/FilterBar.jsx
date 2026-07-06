import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  InputAdornment,
  Stack,
  Button,
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
        sx={{ width: { xs: '100%', sm: 'auto' }, flexGrow: { sm: 1 }, minWidth: 0 }}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: { xs: '100%', sm: 'auto' }, flexShrink: { sm: 0 } }}
      >
        <FormControl
          size="small"
          sx={{ flexGrow: { xs: 1, sm: 0 }, minWidth: { xs: 0, sm: 170 } }}
        >
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
            <MenuItem value="pending">Chưa hoàn thành</MenuItem>
            <MenuItem value="completed">Hoàn thành</MenuItem>
          </Select>
        </FormControl>
        <Button
          onClick={onToggleSortOrder}
          startIcon={isDesc ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" />}
          sx={{
            flexShrink: 0,
            whiteSpace: 'nowrap',
            minWidth: '110px',
            justifyContent: 'center',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '10px',
            color: 'text.primary',
            px: 1.5,
          }}
          
        >
          {isDesc ? 'Mới nhất' : 'Cũ nhất'}
        </Button>
      </Stack>
    </Stack>
  );
}

export default FilterBar;
