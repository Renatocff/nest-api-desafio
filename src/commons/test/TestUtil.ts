import { SimplePost } from "../../simplepost/simplepost.entity";
import { User } from "../../user/user.entity";

export default class TestUtil {
    static giveMeAValidUSer(): User {
        const user = new User();

        user.id = 1;
        user.usuario = 'teste';
        user.senha = '123456';
        user.ativo = true;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        return user;
    }

    static giveMeAValidSimplePost(): SimplePost {
        const simplepost = new SimplePost();

        simplepost.id = 1;
        simplepost.guid = "16a721f1-dc2e-4ce7-9ef1-7f1e1bc62b06";
        simplepost.text = 'teste texto';
        simplepost.date = new Date();
        simplepost.createdAt = new Date();
        simplepost.updatedAt = new Date();

        return simplepost;
    }
}