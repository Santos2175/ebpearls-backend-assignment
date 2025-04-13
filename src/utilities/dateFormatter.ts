import dayjs from 'dayjs';

// utility function to format dates
export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
