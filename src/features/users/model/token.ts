import { IsString } from "class-validator";

export class Token {
  @IsString()
  token: string;
}