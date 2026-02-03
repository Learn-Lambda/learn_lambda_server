import "reflect-metadata";
import { App } from "./core/controllers/app";
import { extensions } from "./core/extensions/extensions";
import { httpRoutes } from "./core/controllers/routes";
import { PrivateSocketSubscriber } from "./core/controllers/private_socket_subscriber";
import { gptChatPresentation } from "./features/gpt_chat/gpt_chat";
import * as dotenv from "dotenv";
import { tasksSocketFeature } from "./features/tasks/tasks";
import { PrismaClient } from "@prisma/client";

dotenv.config();
extensions();

const socketSubscribers: PrivateSocketSubscriber<any>[] = [
  // new SocketSubscriber(gptChatPresentation, "gpt"),
  // new SocketSubscriber(tasksSocketFeature, "current/task/lenght"),
  new PrivateSocketSubscriber(tasksSocketFeature, "current/task/lenght"),
];

(async () => {
  // await new PrismaClient().admin.create({
  //   data: {
  //     login: "1",
  //     password: "1",
  //   },
  // });

  // new GigaChatHttpRepository().sendMessage('');
  new App(
    await Promise.all(httpRoutes.map(async (el) => await el.call())),
    socketSubscribers
  ).listen();
})();
