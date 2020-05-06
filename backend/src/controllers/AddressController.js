const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { zipcode, street, number, district, city, state } = req.body;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');
        
        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const [address] = await connection('addresses')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');

        if (address) {
            return res.send("There's already an address registered to your account. Try updating it!");
        }

        await connection('addresses').insert({
            user_id: auth_id,
            zipcode,
            street,
            number,
            district,
            city,
            state
        });

        return res.json({ street, number, district, city, state });

    },

    async index(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');
        
        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const addresses = await connection('addresses').where('user_id', auth_id).select('*');

        return res.json(addresses);
    },

    async details(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { id } = req.params;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');
        
        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const addresses = await connection('addresses')
            .where('id', id)
            .andWhere('user_id', auth_id)
            .select('*');
        return res.json(addresses);
    },

    async update(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { id } = req.params;
        const { zipcode, street, number, district, city, state } = req.body;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');
        
        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        await connection('addresses')
            .where('id', id)
            .update({
                id,
                zipcode,
                street,
                number,
                district,
                city,
                state
        });

        return res.json({ street, number, district, city, state });
    },

    async delete(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { id } = req.params;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');
        
        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        await connection('addresses').where('id', id).delete();

        return res.status(204).send();
    }


}