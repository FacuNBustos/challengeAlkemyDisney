
export default new class Configuration {
    private readonly host:string = 'http://localhost:3000';
    private readonly port:number = 3000;
    private readonly sendgridKey: string = "";
    private readonly sendgridEmail: string = "";

    getHost(): string {
        return this.host
    };

    getPort(): number {
        return this.port;
    };

    getSendgridKey(): string {
        return this.sendgridKey;
    };

    getSendgridEmail(): string {
        return this.sendgridEmail;
    }
}