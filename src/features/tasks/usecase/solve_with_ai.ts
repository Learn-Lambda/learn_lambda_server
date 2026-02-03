import { IsNumber } from "class-validator";
import {
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../../core/controllers/http_controller";
import { ClassConstructor } from "class-transformer";
import { Result } from "../../../core/helpers/result";
import { GigaChatHttpRepository } from "../../../core/repository/giga_chat_repository";
export class TaskSolvedWithAi {
  @IsNumber()
  taskId: number;
  @IsNumber()
  userId: number;
}
export class SolveWithAi extends CallbackStrategyWithValidationModel<TaskSolvedWithAi> {
  gigaChatHttpRepository = new GigaChatHttpRepository();
  validationModel: ClassConstructor<TaskSolvedWithAi> = TaskSolvedWithAi;
  call = async (model: TaskSolvedWithAi): ResponseBase => {
    return Result.isNotNull(
      await this.client.solvedWithAi.findFirst({
        where: {
          taskId: model.taskId,
          userId: {
            equals: model.userId,
          },
        },
      })
    ).fold(
      async (solvedWithAi) => {
        solvedWithAi.date = new Date();
        await this.client.solvedWithAi.update({
          where: {
            id: solvedWithAi.id,
          },
          data: solvedWithAi,
        });

        // @ts-ignore
        return Result.ok(JSON.parse(solvedWithAi.solvedMessage));
      },
      async (_) =>
        Result.isNotNull(
          await this.client.task.findFirst({
            where: {
              id: model.taskId,
            },
          })
        ).map(async (task) => {
          const userMessage =
            `\`\`\`Typescript  \n\n${task.code}\n\`\`\`` +
            "\n " +
            "Помоги мне решить задачу на языке TypeScript?";
          // console.log(200);

          const message = [
            {
              message: userMessage,
              messageType: "user",
            },
            {
              message: (
                await this.gigaChatHttpRepository.sendMessage(
                  userMessage,
                  undefined
                )
              ).getOrDefault(""),
              messageType: "gpt",
            },
          ];
          // console.log(200);
          await this.client.solvedWithAi.create({
            data: {
              solvedMessage: JSON.stringify(message),
              taskId: task.id,
              userId: model.userId,
              date: new Date(),
            },
          });
          return Result.ok(message as any);
        })
    );
  };
}
