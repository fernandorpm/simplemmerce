const connection = require('../database/connection');

module.exports = {
    async create (req, res) {
        const { username, password } = req.body;

        const user = await connection('users')
            .where('username', username)
            .andWhere('password', password)
            .andWhere('status', true)
            .select('unique_id', 'password')
            .first();

        if (!user) {
            return res.status(400).json({ error: 'Usuário ou senha incorretos!' })
        }

        return res.json(user);
    }
}