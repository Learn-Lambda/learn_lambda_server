import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import { SubRouter, AccessLevel } from "../../core/controllers/http_controller";
import { CheckToken } from "./usecase/check_token";
import { CreateUser } from "./usecase/create_user";
import { DeleteUser } from "./usecase/delete_user";
import { EditUser } from "./usecase/edit_user";
import { GetAllUsers } from "./usecase/get_all_users";
import { GetTokenVscode } from "./usecase/get_token_vscode";
import { GetUserProfileAtJWT } from "./usecase/get_user_profile_at_jwt";

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
        "POST"
      ),
      new SubRouter(
        "/get/user/profile/at/jwt",
        new GetUserProfileAtJWT(),
        AccessLevel.user
      ),
      new SubRouter("/check/token", new CheckToken(), AccessLevel.public),
    ];
  }
}
