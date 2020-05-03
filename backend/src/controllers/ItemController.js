const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { category_id, name, description, value, 
            image_1, image_2, image_3, image_4 } = req.body;

        const [authority] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');
        
        if (authority.authority < 1) {
            return res.send("You don't have enough authority to create a category!");
        }
        
        const [new_item] = await connection('items')
            .where('name', name)
            .select('name');
        
        if (new_item) {
            return res.send('This item is already registered!');
        }

        await connection('items').insert({
            category_id,
            name,
            description,
            value,
            image_1,
            image_2,
            image_3,
            image_4
        });

        return res.json({ name });
    },

    async index(req, res) {
        const items = await connection('items').select('*');
        return res.json(items);
    },

    async index_category(req, res) {
        const { category_id } = req.params;
        const items = await connection('items')
            .where('category_id', category_id)
            .select('*');

        return res.json(items);
    },

    async details(req, res) {
        const { id } = req.params;
        const item = await connection('items')
            .where('id', id)
            .select('*');

        return res.json(item);
    },

    async update(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { category_id, name, description, value, 
            image_1, image_2, image_3, image_4 } = req.body;
        const { id } = req.params;

        const [authority] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');
        
        if (authority.authority < 1) {
            return res.send("You don't have enough authority to create a category!");
        }
        
        const [new_item] = await connection('items')
            .where('name', name)
            .select('name');
        
        if (new_item) {
            return res.send('This item is already registered!');
        }

        await connection('items')
            .where('id', id)
            .update({
                category_id,
                name,
                description,
                value,
                image_1,
                image_2,
                image_3,
                image_4
        });

        return res.json({ name });
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('items').where('id', id).delete();

        return res.status(204).send();
    }

}