import { Module } from '@nestjs/common';
import { SimplepostService } from './simplepost.service';
import { SimplepostResolver } from './simplepost.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimplePost } from './simplepost.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SimplePost])
  ],
  providers: [SimplepostService, SimplepostResolver]
})
export class SimplepostModule { }
