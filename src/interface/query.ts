// interface for task query
export interface ITaskQuery {
  page?: string;
  limit?: string;
  sort?: 'asc' | 'desc';
  status?: string;
}
