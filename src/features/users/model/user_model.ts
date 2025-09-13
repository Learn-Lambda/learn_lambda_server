import { IsNumber, IsString } from "class-validator";

export class UserModel {
  @IsString()
  email: string;
  @IsString()
  login: string;
  @IsString()
  password: string;
}

export class UserEditModel extends UserModel {
  @IsNumber()
  id: number;
}