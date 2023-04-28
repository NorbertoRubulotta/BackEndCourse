import { createTransport } from 'nodemailer';
import { NODE_MAILER_CONFIG } from '../config/config.js';
import { logger } from '../persistence/loggers/logger.js';


class SendMails {
  constructor() {
    this.nodemailerClient = createTransport(NODE_MAILER_CONFIG);
  }
  async sendMessage(mailOptions) {
    try {
      return await this.nodemailerClient.sendMail(mailOptions);
    } catch (error) {
      logger.error(err);
      throw new Error({ Error: "Error sending email", Message: err.message });
    }
  }


  async createMessageToAdminNewPurchase(user, products) {

    const message = {
      from: 'Sender Name <admin@admin>',
      to: 'Sender Name <admin@admin>',
      subject: `New order from ${user.email}`,
      html: `<h1>NEW SALE</h1>
                <h3>SALE data:</h3>
              <ul>
                <li><strong>Email buyer:</strong> ${user.email}</li>
                <li><strong>ID buyer:</strong> ${user.id}</li>
                <li><strong>Total products:</strong> ${JSON.stringify(products, null, 2)}</li>
              </ul>
              `
    };
    return message;
  }
  async createMessageToUserNewPurchase(user, products) {
    const message = {
      from: 'Sender Name <admin@admin>',
      to: `Sender Name <${user.email}>`,
      subject: 'Purchase processed ✔',
      html: `
              <p>We have received your purchase, we will contact you shortly.</p>
                <h5>Purchase details:</h5>
              <ul>
                <li><strong>Email buyer:</strong> ${user.email}</li>
                <li><strong>Total products:</strong> ${JSON.stringify(products, null, 2)}</li>
              </ul>
              <p><strong>Thanks for your purchase</strong></p>
              `
    };
    return message;
  }
}
export const mailSender = new SendMails();