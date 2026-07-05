import { Box, Pagination } from '@mui/material';

function PaginationControl({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
      />
    </Box>
  );
}

export default PaginationControl;
