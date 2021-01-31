const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:')

async function initializeDB() {
    const data = await getCsvData();

    db.serialize(function () {
        db.exec('CREATE TABLE  geodata('
            + 'geonameid VARCHAR(255),'
            +'name VARCHAR(255),'
            +'asciiname VARCHAR(255),'
            +'alternatenames VARCHAR(255),'
            +'latitude VARCHAR(255),'
            +'longitude VARCHAR(255),'
            +'feature_class VARCHAR(255),'
            +'feature_code VARCHAR(255),'
            +'country_code VARCHAR(255),'
            +'cc2 VARCHAR(255),'
            +'admin1_code VARCHAR(255),'
            +'admin2_code VARCHAR(255),'
            +'admin3_code VARCHAR(255),'
            +'admin4_code VARCHAR(255),'
            + 'population VARCHAR(255),'
            +'elevation VARCHAR(255),'
            +'dem VARCHAR(255),'
            +'timezone VARCHAR(255),'
            +'modification_date DATETIME'
            + ');');
    
          var stmt = db.prepare("INSERT INTO geodata VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
          for (var i = 0; i < data.length; i++) {
              stmt.run(data[i].geonameid, data[i].name, data[i].asciiname, data[i].alternatenames, data[i].latitude, data[i].longitude, data[i].feature_class, data[i].feature_code, data[i].country_code, data[i].cc2, data[i].admin1_code, data[i].admin2_code, data[i].admin3_code, data[i].admin4_code, data[i].population, data[i].elevation, data[i].dem, data[i].timezone, data[i].modification_date );
          }
          stmt.finalize();
    
          db.each("SELECT count(*) as count FROM geodata", function (err, { count }) {
            console.log(`Inserted ${count} rows in database`)
        });
    })
}


function getCsvData() {
    let fileLocation = './data/GB.tsv';

    return new Promise(function (resolve, reject) {
        require('fs').readFile(fileLocation, "utf8", function (err, data) {
            if (err) {
                reject(err);
            } else {
                let lines = data.split('\n'),
                    columns = [],
                    item = {},
                    geodataLocations = [];

                for (let i = 1; i < lines.length - 1; i++) {
                    let line = lines[i], columns = line.split('\t');

                    const geonameid = columns[0];
                    const name = columns[1];
                    const asciiname = columns[2];
                    const alternatenames = columns[3];
                    const latitude = columns[4];
                    const longitude = columns[5];
                    const feature_class = columns[6];
                    const feature_code = columns[7];
                    const country_code = columns[8];
                    const cc2 = columns[9];
                    const admin1_code = columns[10];
                    const admin2_code = columns[11];
                    const admin3_code = columns[12];
                    const admin4_code = columns[13];
                    const population = columns[14];
                    const elevation = columns[15];
                    const dem = columns[16];
                    const timezone = columns[17];
                    const modification_date = columns[18];

                    geodataLocations.push({
                        geonameid,
                        name,
                        asciiname,
                        alternatenames,
                        latitude,
                        longitude,
                        feature_class,
                        feature_code,
                        country_code,
                        cc2,
                        admin1_code,
                        admin2_code,
                        admin3_code,
                        admin4_code,
                        population,
                        elevation,
                        dem,
                        timezone,
                        modification_date,
                    });

                }
                resolve(geodataLocations);

            }
        });
    });
}

module.exports = { db, initializeDB };