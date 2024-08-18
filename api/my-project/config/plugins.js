module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'strapi-provider-email-nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.gmail.com'),
          port: env.int('SMTP_PORT', 465),
          auth: {
            user: env('SMTP_USER', 'shaileshdarji1321@gmail.com'),
            pass: env('SMTP_PASS', 'tqji wgbp gtwm yats'),
          },
          // Optional settings
          secure: true,
        },
        settings: {
          defaultFrom: env('DEFAULT_FROM', 'shaileshdarji1321@gmail.com'),
          defaultReplyTo: env('DEFAULT_REPLY_TO', 'shaileshdarji1321@gmail.com'),
        },
      },
    },
  });
  