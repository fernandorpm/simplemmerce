const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { name, description, tag_1, tag_2, tag_3 } = req.body;


        const [authority_level] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');

        if (authority_level.authority > 0) {
            await connection('categories').insert({
                name,
                description,
                tag_1,
                tag_2,
                tag_3
            });

        } else {
            return res.send("You don't have enough authority to create a category.");
        }

        res.json({ name, description });
    },

    async index(req, res) {
        const categories = await connection('categories').select('*');
        res.json(categories);
    },

    async delete(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { id } = req.params;

        const [authority_level] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');

        if (authority_level.authority > 0) {
            await connection('categories').where('id', id).delete();

        } else {
            return res.send("You don't have enough authority to delete a category.");
        }

        return res.status(204).send();
    }

}