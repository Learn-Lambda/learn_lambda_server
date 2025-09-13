import { IsNumber } from "class-validator";

export class UserStatisticModel {
  @IsNumber()
  userId: number;
}
