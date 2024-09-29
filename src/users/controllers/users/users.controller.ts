import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { request, Request, Response, response } from 'express';
import { createUserDto } from 'src/users/dtos/CrateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers() {
    return this.userService.fetchUsers();
  }

  //   @Get()
  //   getUsers(@Query('sortBy') sortBy: string) {
  //     console.log(sortBy);
  //     return { username: 'Anson', email: 'anson@gmail.com' };
  //   }

  //   @Get()
  //   getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
  //     console.log(sortDesc);
  //     return { username: 'Anson', email: 'anson@gmail.com' };
  //   }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Anson',
        email: 'anson@gmail.com',
        posts: [
          {
            id: 1,
            title: 'Post 1',
          },
          {
            id: 2,
            title: 'Post 2',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUserPostsComments() {
    return [
      {
        id: 1,
        title: 'Post 1',
        comments: [],
      },
    ];
  }

  //   @Post('create')
  //   createUser(@Req() request: Request, @Res() response: Response){
  //     console.log(request.body);
  //     response.send('Created');
  //   }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body() userData: createUserDto) {
    console.log(userData);
    return this.userService.createUser(userData);
    return {};
  }

  //   @Get(':id')
  //   getUserById(@Req() request: Request, @Res() response: Response) {
  //     console.log(request.body);
  //     response.send('Created');
  //   }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Get(':id/:postId')
  getUserByPostId(@Param('id') id: string, @Param('postId') postId: string) {
    console.log(id, postId);
    return { id, postId };
  }
}

// npm i class-validator class-transformer
