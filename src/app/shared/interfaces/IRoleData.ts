import { Role } from '../../roles/all-roles/roles.model';

export interface IRoleData {
  data: Role[];
  pageNumber: Number;
  totalCount: Number;
  pagesCount: Number;
}
