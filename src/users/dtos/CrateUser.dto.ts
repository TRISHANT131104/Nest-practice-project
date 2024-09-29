import { IsEmail, IsNotEmpty } from 'class-validator';

// Data transfer object
export class createUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  age: number;
}
