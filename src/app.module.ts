import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { SimplepostModule } from './simplepost/simplepost.module';
import { SimplePost } from './simplepost/simplepost.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-54-172-17-119.compute-1.amazonaws.com',
      port: 5432,
      username: 'srrfvbhquuxvyn',
      password: '29de0a6e9177a396ac5fc9e28762c0b5e497b8edd60775f737c693a864926958',
      database: 'ddfo8dr0sh9dsi',
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      entities: [SimplePost],
      synchronize: false,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    SimplepostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
