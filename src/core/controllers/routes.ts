import { AuthorizationFeature } from "../../features/authorization/authorization";
import { GtpFeature } from "../../features/gpt_chat/gpt_chat";
import { RecognitionsFeature } from "../../features/recognitions/recognitions";
import { SolutionsFeature } from "../../features/solutions/solutions";
import { StatisticSolutionFeature } from "../../features/statistic_solution/statistic_solution";
import { StatisticTypesUsageFeature } from "../../features/statistic_types_usage/statistic_types_usage";
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
  new StatisticSolutionFeature(),
  new StatisticTypesUsageFeature(),
  // new GtpFeature(),
];
