export default interface FeatureRequest {
  requestId?: number;
  requesterName?: string;
  requesterMail?: string;
  requestDate?: Date;
  sdUnit?: string;
  department?: string;
  requestHeadline?: string;
  roleId?: number;
  iwant?: string;
  to?: string;
  description?: string;
  customerName?: string;
  deadline?: Date;
  installation?: Date;
  filePath?: string;
  otherRole?: string;
}

export interface IDRoleNavigation {
  idRole?: number;
  roleType?: string;
}
