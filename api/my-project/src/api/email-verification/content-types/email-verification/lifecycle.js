module.exports =
{
    async afterCreate(e){
        const { result } = e;

        try{
            await strapi.plugin['email'].services.email.send({
                to : 'vtajpatel735@gmail.com',
                from : 'vtajpatel735@gmail.com',
                subject : 'your OTP',
                text : `test${result.name}`,
            })
        }
        catch(err)
        {
            console.log(err);
        }

    }
} 