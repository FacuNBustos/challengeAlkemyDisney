import * as bcrypt from "bcrypt";

export default new class HashService {
    private readonly rounds: number = 10;

    getRounds(): number {
        return this.rounds;
    };

    private getSalt(): string {
        return bcrypt.genSaltSync(this.rounds);
    };

    HashGet(password: string) {
        return bcrypt.hashSync(password, this.getSalt());
    };

    HashCompare(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    };

}