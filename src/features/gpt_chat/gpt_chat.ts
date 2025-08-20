import { PrivateSocketSubscriber } from "../../core/controllers/private_socket_subscriber";
import { Result } from "../../core/helpers/result";
import { TypedEvent } from "../../core/helpers/typed_event";
interface GptResponse {}

export class GptChatPresentation extends TypedEvent<Result<void, GptResponse>> {}

export const gptChatPresentation = new GptChatPresentation();
