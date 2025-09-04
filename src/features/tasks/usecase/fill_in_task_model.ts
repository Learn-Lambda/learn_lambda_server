import { ClassConstructor } from "class-transformer";
import { IsString } from "class-validator";
import { CallbackStrategyWithValidationModel, ResponseBase } from "../../../core/controllers/http_controller";
import { CreateTaskModelUseCase } from "./create_task_model_usecase";

export class CodeModel {
  @IsString()
  code: string;
}
export class FillInTaskModel extends CallbackStrategyWithValidationModel<CodeModel> {
  validationModel: ClassConstructor<CodeModel> = CodeModel;
  call = (model: CodeModel): ResponseBase =>
    new CreateTaskModelUseCase().call(model.code);
}
