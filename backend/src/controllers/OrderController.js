const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');

        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const [address] = await connection('addresses')
            .where('user_id', auth_id)
            .select('id');
        
        if (!address) {
            return res.send("There's no address to receive the order!");
        }

        const [id] = await connection('orders').insert({
            address_id: address.id,
            status: 0
        });

        return res.json({ id });
    },

    async index(req, res) {
        const orders = await connection('orders').select('*');
        return res.json(orders);
    },

    async details(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { id } = req.params;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id', 'authority');

        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const [address] = await connection('addresses')
            .where('user_id', auth_id)
            .select('id', 'user_id');

        if (user.id !== address.user_id && user.authority === 0) {
            return res.send("You don't have the rights to perform this action.");
        }
        const [order] = await connection('orders').where('id', id).select('*');
        const order_items = await connection('order_items').where('order_id', order.id).select('*');

        return res.json({order, order_items});
    },

    async update(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { status } = req.body;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id', 'authority');

        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const [address] = await connection('addresses')
            .where('user_id', auth_id)
            .select('id', 'user_id');

        if (user.id !== address.user_id && user.authority === 0) {
            return res.send("You don't have the rights to perform this action.");
        }

        const [order] = await connection('orders')
            .where('address_id', address.id)
            .select('id');

        await connection('orders').where('id', order.id)
            .update({ status }).update('updated_at', connection.fn.now());

        return res.json({ status });
    }

}