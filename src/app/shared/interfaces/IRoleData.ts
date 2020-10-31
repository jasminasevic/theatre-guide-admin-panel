import { Role } from '../../roles/all-roles/roles.model';

export interface IRoleData {
  data: Role[];
  pageNumber: number;
  totalCount: number;
  pagesCount: number;
}
