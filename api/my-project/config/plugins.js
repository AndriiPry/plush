module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'strapi-provider-email-smtp',
        providerOptions: {
          host: env('SMTP_HOST', process.env.SMTP_HOST), //smtp.gmail.com
          port: env.int('SMTP_PORT', process.env.SMTP_PORT),// 465
          auth: {
            user: env('SMTP_USER', process.env.SMTP_USER), // shaileshdarji1321@gmail.com //noreply@plush.fun
            pass: env('SMTP_PASS', process.env.SMTP_PASS), // tqji wgbp gtwm yats //  vraq-ofjf-rvmf-qjil
          },
          // Optional settings
          secure: true,
        },
        settings: {
          defaultFrom: env('DEFAULT_FROM', process.env.SMTP_USER),
          defaultReplyTo: env('DEFAULT_REPLY_TO', process.env.SMTP_USER),
        },
      },
    },
  });
  