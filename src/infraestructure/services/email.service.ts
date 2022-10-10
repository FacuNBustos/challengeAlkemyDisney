import sgMail from '@sendgrid/mail';
import configuration from '../../../config';

export default new class EmailService {
    private readonly apikey = configuration.getSendgridKey();
    private readonly fromEmail = configuration.getSendgridEmail();

    async send(email: string): Promise<void> {
        const msg = {
            to: email,
            from: this.fromEmail,
            subject: 'Registro en alkemy disney',
            text: 'Esto es un texto de muestra de la aplicacion alkemy disney.'
        };
        sgMail.setApiKey(this.apikey);
        sgMail.send(msg)
        .catch((error:any) => {
            console.log(error);
        })
    }
}