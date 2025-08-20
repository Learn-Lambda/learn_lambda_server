import { IsArray, IsInt, IsString, Max, Min } from "class-validator";
import { TaskBody } from "../usecase/create_task_model_usecase";
export abstract class EditModel {
  id: number;
}

export class TaskValidationModel extends TaskBody {
  @IsString()
  description: string;
  @IsString()
  name: string;
 
  @IsInt()
  @Min(1)
  @Max(3)
  complexity: number;
 
}
export class TaskEditModel extends TaskValidationModel implements EditModel {
  @IsInt()
  id: number;
}
