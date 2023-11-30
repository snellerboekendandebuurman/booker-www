import { EStepStatus } from "./EStepStatus";

export interface IMembershipStep {
  id: number;
  name: string;
  status: EStepStatus;
}
