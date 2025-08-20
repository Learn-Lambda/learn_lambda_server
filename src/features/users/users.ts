import { Prisma } from "@prisma/client";
import { ClassConstructor } from "class-transformer";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  SubRouter,
  AccessLevel,
  CallbackStrategyCreateDbModel,
  CallBackStrategyDeleteModelByQueryId,
  CallBackStrategyPagination,
  CallbackStrategyUpdateModel,
  CallbackStrategyWithEmpty,
  ResponseBase,
} from "../../core/controllers/http_controller";
import { IsNumber, IsString } from "class-validator";
import { Result } from "../../core/helpers/result";
import jwt from "jsonwebtoken";

export class UserModel {
  @IsString()
  email: string;
  @IsString()
  login: string;
  @IsString()
  password: string;
}
export class UserEditModel extends UserModel {
  @IsNumber()
  id: number;
}

export class GetAllUsers extends CallBackStrategyPagination<Prisma.TaskWhereInput> {
  dbCollectionName: string = "user";
}

export class EditUser extends CallbackStrategyUpdateModel<UserEditModel> {
  validationModel: ClassConstructor<UserEditModel> = UserEditModel;
  dbCollectionName: string = "user";
}

export class CreateUser extends CallbackStrategyCreateDbModel<UserModel> {
  dbCollectionName: string = "user";
  validationModel: ClassConstructor<UserModel> = UserModel;
}
export class DeleteUser extends CallBackStrategyDeleteModelByQueryId {
  deleteCallback = undefined;
  dbCollectionName: string = "user";
}
export class GetTokenVscode extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    (await this.getUserId()).map((databaseModel) =>
      Result.ok({
        token: jwt.sign(
          { userId: databaseModel.id.toString(), env: "vscode" },
          process.env.USER_JWT_SECRET
        ),
      })
    );
}
export class GetUserProfileAtJWT extends CallbackStrategyWithEmpty {
  call = async (): ResponseBase =>
    (await this.getUserId()).map((databaseModel) => {
      delete databaseModel["password"];
      return Result.ok(databaseModel);
    });
}
export class UsersFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
      new SubRouter("/users", new GetAllUsers(), AccessLevel.public, "GET"),
      new SubRouter("/users", new CreateUser(), AccessLevel.admin, "POST"),
      new SubRouter("/users", new EditUser(), AccessLevel.admin, "PUT"),
      new SubRouter("/users", new DeleteUser(), AccessLevel.admin, "DELETE"),

      new SubRouter(
        "/get/token/vscode",
        new GetTokenVscode(),
        AccessLevel.user,
        "POST",
      ),
      new SubRouter(
        "/get/user/profile/at/jwt",
        new GetUserProfileAtJWT(),
        AccessLevel.user
      ),
    ];
  }
}
