const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { order_id } = req.params;
        const { item_id } = req.body;

        const [user] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('id');

        if (!user) {
            return res.send("Your credentials couldn't be identified. Please try again after reconnecting");
        }

        const [item] = await connection('items')
            .where('id', item_id)
            .select('value');

        const [order_item] = await connection('order_items').insert({
            order_id,
            item_id,
            value: item.value
        });

        return res.json({ order_item });

    },

    async index(req, res) {
        const order_items = await connection('order_items').select('*');
        return res.json({ order_items });
    },

    async delete(req, res) {
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
            .where('user_id',auth_id)
            .select('id');

        const [order] = await connection('orders')
            .where('address_id', address.id)
            .select('id', 'address_id');

        console.log(address);
        console.log(order);

        if (address.id !== order.address_id) {
            return res.send("You don't have the rights to perform this action.");
        }

        await connection('order_items')
            .where('id', id)
            .andWhere('order_id', order.id)
            .delete();

        return res.status(204).send();
    }

}