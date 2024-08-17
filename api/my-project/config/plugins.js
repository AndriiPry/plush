module.exports = ({ env }) => ({
    
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'vtajpatel735@gmail.com',
          defaultReplyTo: 'vtajpatel735@gmail.com',
        },
      },
    },
  });