const sqlite3 = require('better-sqlite3');
const DB_NAME = './sn.db';

class SN_DB {

    constructor(name){
        this.db = new sqlite3(DB_NAME);
        }
    

    deleteTable(){
        const sql = 'DROP TABLE sn';
        this.db.exec(sql);
    }

    createTable(tableName){
        const sql = `CREATE TABLE IF NOT EXISTS ${tableName}
                (id INTEGER PRIMARY KEY, code, product, fabric1, fabric2, fabric3, doc, remarks)`;
        this.db.exec(sql);
    }

    readSN(_id){
        const sql = '';
        this.db.run(sql, (err) => {
            if (err) return console.error(err.msg + ' Read SN');
        });
    }

    get readAll(){
        const sql = 'SELECT * FROM sn';
        let arr = this.db.prepare(sql).all();
        return arr;
    }

    addSN(item){
        const arr = item.split('/;', 7);
        const sql = `INSERT INTO sn(code, product, fabric1, fabric2, fabric3, doc, remarks)
                VALUES(?,?,?,?,?,?,?)`;
        if (arr.length == 7 ) this.db.prepare(sql).run(arr);
    }

}

module.exports = new SN_DB(DB_NAME);