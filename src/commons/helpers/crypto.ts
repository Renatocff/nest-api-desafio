
import { hashSync } from "bcrypt";

export const hashPasswordTransformer = {
    to(senha: string): string {
        return hashSync(senha, 10);
    },
    from(hash: string): string {
        return hash;
    }
}