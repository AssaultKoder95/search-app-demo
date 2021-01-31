const { rejects } = require('assert');
const { db } = require('../database');

module.exports.getLocationResults = async ({ searchTerm, skip = 0, limit = 50 }) => {
    const query = `SELECT name, latitude, longitude FROM geodata where name like '%${searchTerm}%' ORDER BY name LIMIT ${skip}, ${limit}`;
    const countQuery = `SELECT COUNT(*) as count FROM geodata where name like '%${searchTerm}%'`;

    return new Promise((resolve, reject) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            
            db.get(countQuery, (err, { count }) => {
                const result = {
                    data: rows,
                    skip,
                    limit,
                    count    
                }

                resolve(result);
            })
        });    
    })
}