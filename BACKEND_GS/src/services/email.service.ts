import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // ✅ CONFIGURACIÓN REAL DE GMAIL
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.gmail.com
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: "blancowinder167@gmail.com", // blancowinder167@gmail.com
        pass: "uebm yenj eqha rpaj", // hzumdxmfvbaiskhn
      },
    });
  }

  async enviarEmail(opciones: EmailOptions): Promise<void> {
    try {
      console.log('📧 ENVIANDO EMAIL REAL...');
      console.log(`📧 PARA: ${opciones.to}`);
      
      // Mostrar código en consola también
      const codigoMatch = opciones.html.match(/\d{6}/);
      const codigo = codigoMatch ? codigoMatch[0] : 'NO_ENCONTRADO';
      console.log(`🔐 CÓDIGO: ${codigo}`);

      // ✅ ENVÍO REAL ACTIVADO
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || '"Tu App" <blancowinder167@gmail.com>',
        to: opciones.to,
        subject: opciones.subject,
        html: opciones.html,
      });

      console.log('✅ EMAIL ENVIADO EXITOSAMENTE');
      
    } catch (error) {
      console.error('❌ Error enviando email:', error);
      throw new Error('No se pudo enviar el email de verificación');
    }
  }

  generarTemplateVerificacion(codigo: string, nombreUsuario: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          .container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
          .code { font-size: 32px; font-weight: bold; text-align: center; color: #2563eb; margin: 20px 0; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Verifica tu correo electrónico</h2>
          <p>Hola ${nombreUsuario},</p>
          <p>Usa el siguiente código para verificar tu correo electrónico:</p>
          <div class="code">${codigo}</div>
          <p>Este código expirará en 15 minutos.</p>
          <div class="footer">
            <p>Si no solicitaste este código, puedes ignorar este mensaje.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}