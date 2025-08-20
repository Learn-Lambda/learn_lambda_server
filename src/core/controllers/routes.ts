import { AuthorizationFeature } from "../../features/authorization/authorization";
import { RecognitionsFeature } from "../../features/recognitions/recognitions";
import { SolutionsFeature } from "../../features/solutions/solutions";
import { TasksFeature } from "../../features/tasks/tasks";
import { UsersFeature } from "../../features/users/users";
import { VmFeature } from "../../features/vm/vm";

export const httpRoutes = [
  new VmFeature(),
  new AuthorizationFeature(),
  new TasksFeature(),
  new RecognitionsFeature(),
  new UsersFeature(),
  new SolutionsFeature(),
];
