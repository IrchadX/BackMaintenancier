<<<<<<< HEAD
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
=======
import {
  //Body,
  //Body,
  Controller,
  // Post,
  Get,
  //Patch,
  Param,
  //Delete,
  ParseIntPipe,
  //Post,
  //Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

>>>>>>> dina
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

<<<<<<< HEAD
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
=======
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
>>>>>>> dina
