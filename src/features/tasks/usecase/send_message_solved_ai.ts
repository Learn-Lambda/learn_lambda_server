import { IsNumber, IsString } from "class-validator";
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
  @IsString()
  message: string;
}

export class SendMessageSolvedAi extends CallbackStrategyWithValidationModel<TaskSolvedWithAi> {
  gigaChatHttpRepository = new GigaChatHttpRepository();

  validationModel: ClassConstructor<TaskSolvedWithAi> = TaskSolvedWithAi;
  call = async (model: TaskSolvedWithAi): ResponseBase =>
    Result.isNotNull(
      await this.client.solvedWithAi.findFirst({
        where: {
          taskId: model.taskId,
          userId: {
            equals: model.userId,
          },
        },
      })
    ).map(async (solvedWithAi) => {
      const messageGpt = (
        await this.gigaChatHttpRepository.sendMessage(
          model.message,
          model.userId
        )
      ).getOrDefault("");

      //@ts-ignore
      const solvedMessage: { message: string; messageType: string }[] =
        JSON.parse(solvedWithAi.solvedMessage as string);
      solvedMessage.push({
        message: model.message,
        messageType: "user",
      });
      solvedMessage.push({
        message: messageGpt as string,
        messageType: "gpt",
      });

      solvedWithAi.solvedMessage = JSON.stringify(solvedMessage);

      await this.client.solvedWithAi.update({
        where: { id: solvedWithAi.id },
        data: solvedWithAi,
      });

      return {
        message: messageGpt,
        messageType: "gpt",
      };
    });
}
