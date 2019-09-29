const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.AWS_SES_SMTP_ENDPOINT,
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.AWS_ACCESS_KEY, // generated ethereal user
    pass: process.env.AWS_SES_SECRET, // generated ethereal password
  },
});

const buildEmailTemplate = {
  newUser: ({ userEmail }) => ({
    subject: 'A new user has signed up to GradeMyPaper',
    html: `<b>${userEmail}</b> has signed up to GradeMyPaper.`,
  }),
  newRequest: ({ requestId }) => ({
    subject: 'A new submission was recieved through GradeMyPaper',
    html: `The request ID is ${requestId}.  Please ask the system admin for further details.`,
  }),
  newMessage: ({ email, message }) => ({
    subject: 'A new message was received through GradeMyPaper',
    html: `<b>${email}</b> has sent you a new message.<p>${message}</p>`,
  }),
};

const sendEmail = async (fields) => transporter.sendMail({
  from: `"GradeMyPaper" <${process.env.FROM_EMAIL}>`,
  to: process.env.ADMIN_EMAILS,
  ...fields,
});

module.exports = {
  sendEmail,
  buildEmailTemplate,
};
