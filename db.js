snBase = require('./sn_db_controller');

async function read(){
    const arr = await snBase.readAll;
    
    if (arr) return arr;
}

read().then((res) => {
    console.log(res);
    return res
})


