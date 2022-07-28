import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/auth.guard';
import { CreateSimplePostInput } from './dto/create-simplepost.input';
import { UpdateSimplePostInput } from './dto/update-simplepost.input';
import { SimplePost } from './simplepost.entity';
import { SimplepostService } from './simplepost.service';

@Resolver()
export class SimplepostResolver {
    constructor(
        private simplePostService: SimplepostService
    ) { }

    @Query(() => [SimplePost])
    @UseGuards(GqlAuthGuard)
    async simplePosts(): Promise<SimplePost[]> {
        const simplePosts = await this.simplePostService.findAllSimplePosts();
        return simplePosts;
    }

    @Query(() => SimplePost)
    @UseGuards(GqlAuthGuard)
    async simplePost(
        @Args('id') id: number
    ): Promise<SimplePost> {
        const simplePost = await this.simplePostService.findSimplePostById(id);
        return simplePost;
    }

    @Mutation(() => SimplePost)
    @UseGuards(GqlAuthGuard)
    async createSimplePost(
        @Args('data') data: CreateSimplePostInput
    ): Promise<SimplePost> {
        const simplepost = await this.simplePostService.createSimplePost(data);
        return simplepost;
    }

    @Mutation(() => SimplePost)
    @UseGuards(GqlAuthGuard)
    async updateSimplePost(
        @Args('id') id: number,
        @Args('data') data: UpdateSimplePostInput
    ): Promise<SimplePost> {
        const simplepostUpdated = await this.simplePostService.updateSimplePost(id, data);
        return simplepostUpdated;
    }

    @Mutation(() => Boolean)
    @UseGuards(GqlAuthGuard)
    async deleteSimplePostById(
        @Args('id') id: number
    ): Promise<Boolean> {
        return await this.simplePostService.removeSimplePostById(id);
    }
}
