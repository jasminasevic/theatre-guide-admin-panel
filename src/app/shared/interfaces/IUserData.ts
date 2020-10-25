import { User } from '../../users/all-users/users.model';

export interface IUserData {
  data: User[],
  pageNumber: number,
  totalCount: number,
  pagesCount: number
}
