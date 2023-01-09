
const Database = require('better-sqlite3');
const DB_NAME = './temperature.db';
const TABLE_NAME = 't_data';


class Temperature_DB{

  constructor() {
    this.db = new Database(DB_NAME);
    this.createTable();
  }

  deleteTable(){
    const sql = `DROP TABLE ${TABLE_NAME}`;
    this.db.exec(sql);
    this.createTable();
  }

  createTable(){
    const sql = `CREATE TABLE IF NOT EXISTs ${TABLE_NAME}(point INTEGER, datatime INTEGER, value INTEGER)`;
    this.db.exec(sql);
  }

  read(time1, time2, point){
    const sql = this.db.prepare(
      `SELECT datatime, value FROM t_data WHERE datatime > ${time1} and datatime < ${time2} and point = ${point}`
    ); 
    console.log(`time1: ${time1}  time2: ${time2}  point: ${point}`);
    const result = new Object();
    for (let row of sql.iterate()) {
      const key = row.datatime.toString();
      const value = row.value.toString();
      result[key] = value;
    }
    return result;
  }

  readCurrent(point){
    const row = this.db.prepare(`SELECT MAX(datatime) as time, point, value FROM t_data WHERE point = ${point}`).get();
    let currentTemperature;
    if (row) {
      currentTemperature = {"point": point, "time": row.time, "temperature": row.value};
    }
    return currentTemperature;
  }

  readAll(point){
    const sql = this.db.prepare(`SELECT point, datatime, value FROM t_data WHERE point = ${point}`);
    const result = new Object();
    for (let row of sql.iterate()) {
      const key = row.datatime.toString();
      const value = row.value.toString();
      result[key] = value;
    }
    return result;
  }

  add(point, datatime, value){
    const insert = this.db.prepare(`INSERT INTO t_data(point, datatime, value) VALUES (?, ?, ?)`);
    const resInsert = insert.run(point, datatime, value);
    return resInsert;
  }

}

module.exports = new Temperature_DB(DB_NAME);
