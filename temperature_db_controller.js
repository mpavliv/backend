
const Database = require('better-sqlite3');
const DB_NAME = './temperature.db';
const TABLE_NAME = 't_data';


class Temperature_DB{

  constructor() {
    this.db = new Database(DB_NAME);
  }

  deleteTable(){
    const sql = `DROP TABLE ${TABLE_NAME}`;
    this.db.exec(sql);
  }

  createTable(){
    const sql = `CREATE TABLE IF NOT EXISTs ${TABLE_NAME}(point INTEGER, datatime INTEGER, value REAL)`;
    this.db.exec(sql);
  }

  read(time1, time2, point){
    const sql = db.prepare(
      `SELECT datatime, value FROM t_data WHERE datatime > ${time1} and datatime < ${time2} and point = ${point}`
    ); 
    const result = new Object();
    for (let row of sql.iterate()) {
      const key = row.datatime.toString();
      const value = row.value.toString();
      result[key] = value;
    }
    return result;
  }

  readCurrent(point){
    const row = db.prepare(`SELECT MAX(datatime), value FROM t_data WHERE point = ${point}`).get();
    let currentTemperature;
    if (row) {
      currentTemperature = {"point": 1, "temperature": row.value};
    }
    return currentTemperature;
  }

  readAll(point){
    const sql = db.prepare(`SELECT datatime, value FROM t_data WHERE point = ${point}`);
    const result = new Object();
    for (let row of sql.iterate()) {
      const key = row.datatime.toString();
      const value = row.value.toString();
      result[key] = value;
    }
    return result;
  }

  add(req){
    const rBody = req.body;
    let resInsert;
    if ("point" in rBody && "datatime" in rBody && "value" in rBody) {
      const insert = db.prepare(`INSERT INTO t_data(point, datatime, value) VALUES (?, ?, ?)`);
      const {point, datatime, value} = rBody;
      resInsert = insert.run(point, datatime, value);
    }
    return resInsert;
  }

}

module.exports = new Temperature_DB(DB_NAME);
