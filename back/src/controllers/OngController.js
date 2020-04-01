const crypto = reuire('crypto');
const connection = require('../database/connection');

module.exports = {
   async index (req, res)  {
      const ongs = await connection('ongs').select('*');

      return res.json(ongs);
   },

   async create(req,res) {
      const { name, email, whatsapp, city, uf } = req.body;
      
      const id = crypto.randomBytes(4).toString('HEX');

      await connection('ongs').insert({
         id,
         name,
         email,
         whatsapp,
         city,
         uf,
      });

      return res.json({ id });
   },

   async delete(req, res) {
      const { id } = req.params;

      const ongs = await connection('ongs')
         .where('id', id)
         .select('id')
         .first();

      if (ongs.id !== id) {
         return res.status(401).json({ Error: "You're not authorized" });
      }

      await connection('ongs').where('id', id).delete();

      return res.status(204).send();
   }
};