import { ClassConstructor } from "class-transformer";
import { FeatureHttpController } from "../../core/controllers/feature_http_controller";
import {
  SubRouter,
  AccessLevel,
  CallbackStrategyWithValidationModel,
  ResponseBase,
} from "../../core/controllers/http_controller";
import { PrivateSocketSubscriber } from "../../core/controllers/private_socket_subscriber";
import { Result } from "../../core/helpers/result";
import { TypedEvent } from "../../core/helpers/typed_event";
import { IsNumber, IsString } from "class-validator";
interface GptResponse {
  message: string;
  messageType: string;
}

export class GptChatPresentation extends TypedEvent<
  Result<void, GptResponse>
> {}

export class GetGtpChatModel {
  @IsNumber()
  taskId: number;
}
  
export const gptChatPresentation = new GptChatPresentation();

export class GtpFeature extends FeatureHttpController {
  constructor() {
    super();
    this.subRoutes = [
    //   new SubRouter(
    //     "/get/gpt/chat/in/task",
    //     new GetGptChatInTask(),
    //     AccessLevel.public,
    //     "POST"
    //   ),
    //   new SubRouter(
    //     "/send/message/gtp/chat/in/task",
    //     new SendMessageGtpChatInTask(),
    //     AccessLevel.public,
    //     "POST"
    //   ),
    ];
  }
}
