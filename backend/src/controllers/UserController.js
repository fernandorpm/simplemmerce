const connection = require('../database/connection');
const generateUniqueID = require('../utils/generateUniqueID');
const encryptPassword = require('../utils/encryptPassword');

module.exports = {
    async create(req, res) {
        const { username, password, name, whatsapp } = req.body;
        const id = generateUniqueID();
        const status = 1;
        const authority = 0;
        const encrypted_password = encryptPassword(password);

        await connection('users').insert({
            id,
            username,
            password: encrypted_password,
            name,
            whatsapp,
            status,
            authority
        });

        return res.json({ id });
    },

    async index(req, res) {
        const users = await connection('users').select('*');
        return res.json({ users });
    },

    async update(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { new_password } = req.body;
        const new_encrypted_password = encryptPassword(new_password);
        await connection('users')
            .where('id', id)
            .andWhere('password', password)
            .update({ password: new_encrypted_password });

        return res.send('Password updated!');
    },

    async updateAuthority(req, res) {
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;
        const { user_username, user_authority } = req.body;

        const [auth_authority] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');

        if (auth_authority.authority === 2) {
            await connection('users')
                .where('username', user_username)
                .update({ authority: user_authority });
        }

        var authString = "";

        switch (user_authority) {
            case 0:
                authString = "n User";
                break;
            case 1:
                authString = " Manager";
                break;
            case 2:
                authString = "n Admin";
                break;
        }

        return res.send(`The user with the username: ${user_username} is now a${authString}`)
    },

    async delete(req, res) {
        const { id } = req.params;
        const auth_id = req.headers.auth1;
        const auth_password = req.headers.auth2;

        const [authority_level] = await connection('users')
            .where('id', auth_id)
            .andWhere('password', auth_password)
            .select('authority');

        if (authority_level.authority === 2) {
            await connection('users').where('id', id).delete();
        } else {
            return res.send("You don't have enough authority to delete an user.");
        }

        return res.status(204).send();
    }

}