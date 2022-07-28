import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSimplePostInput } from './dto/create-simplepost.input';
import { UpdateSimplePostInput } from './dto/update-simplepost.input';
import { SimplePost } from './simplepost.entity';

@Injectable()
export class SimplepostService {
    constructor(
        @InjectRepository(SimplePost)
        private simplePostRepository: Repository<SimplePost>
    ) { }

    async findAllSimplePosts(): Promise<SimplePost[]> {
        const simplePosts = await this.simplePostRepository.find();
        return simplePosts;
    }

    async findSimplePostById(id: number): Promise<SimplePost> {
        const simplepost = await this.simplePostRepository.findOne({ where: { id } });

        if (!simplepost) {
            return new SimplePost();
        }

        return simplepost;
    }

    async createSimplePost(data: CreateSimplePostInput): Promise<SimplePost> {
        const simplePost = await this.simplePostRepository.create(data);
        const simplePostSaved = await this.simplePostRepository.save(simplePost);

        if (!simplePostSaved) {
            throw new InternalServerErrorException("Problema para criar um a postagem.");

        }

        return simplePostSaved;
    }

    async updateSimplePost(id: number, data: UpdateSimplePostInput): Promise<SimplePost> {
        const simplepost = await this.findSimplePostById(id);

        await this.simplePostRepository.update(simplepost.id, { ...data });

        const simplepostUpdated = this.simplePostRepository.create({ ...simplepost, ...data });

        return simplepostUpdated;
    }

    async removeSimplePostById(id: number): Promise<Boolean> {
        const deleted = await this.simplePostRepository.delete(id);

        if (deleted) {
            return true
        }

        return false;
    }
}
