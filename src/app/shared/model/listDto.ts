/**
 * List object for pagination
 */
export interface ListDto<T> {
  data: T[];
  nbValues: number;
}
