import { PrismaClient } from "@prisma/client";
import GigaChat from "gigachat";
import { Chat, ChatCompletion, WithXHeaders } from "gigachat/interfaces";
import { Agent } from "node:https";
import { Result } from "../helpers/result";
import { delay } from "../helpers/delay";

const httpsAgent = new Agent({
  rejectUnauthorized: false,
});
interface IGigaChat {
  chat(
    payload: Chat | Record<string, any> | string
  ): Promise<ChatCompletion & WithXHeaders>;
}

class GigaChatFake implements IGigaChat {
  chat = async (
    payload: Chat | Record<string, any> | string
  ): Promise<ChatCompletion & WithXHeaders> => {
    await delay(5000);
    return {
      xHeaders: {},
      choices: [
        {
          message: {
            role: "system",
            content: "test",
          },
          index: 1,
        },
      ],
      object: "",
      created: 1,
      model: "",
      usage: {
        prompt_tokens: 10,
        /** Количество токенов, сгенерированных моделью */
        completion_tokens: 10,
        /** Количество кэшированных токенов */
        precached_prompt_tokens: 1,
        /** Общее количество токенов */
        total_tokens: 1,
      },
    };
  };
}
export class GigaChatHttpRepository {
  client: IGigaChat;
  constructor() {
    Boolean(process.env.GIGA_CHAT_FAKE_MODE === "true")
      ? (this.client = new GigaChatFake())
      : (this.client = new GigaChat({
          timeout: 600,
          model: "GigaChat",
          httpsAgent: httpsAgent,
          credentials: process.env.GIGA_CHAT_KEY,
        }));
  }
  db = new PrismaClient();

  sendMessage = async (
    message: string,
    userId?: number
  ): Promise<Result<void, String>> => {
    const resp = await this.client.chat({
      messages: [{ role: "user", content: message }],
    });

    return Result.ok(resp.choices.map((el) => el.message.content).join(""));
  };
}