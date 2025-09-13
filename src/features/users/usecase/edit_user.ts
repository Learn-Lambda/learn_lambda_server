import { ClassConstructor } from "class-transformer";
import { CallbackStrategyUpdateModel } from "../../../core/controllers/http_controller";
import { UserEditModel } from "../model/user_model";

export class EditUser extends CallbackStrategyUpdateModel<UserEditModel> {
  validationModel: ClassConstructor<UserEditModel> = UserEditModel;
  dbCollectionName: string = "user";
}