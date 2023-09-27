const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function con(){
    let con;

    try{
        con = await oracledb.getConnection({
            user: "jorge",
            password: "duoc",
            connectString: "localhost/xe"
        });

        const data = await con.execute(
            /* `SELECT * FROM usuario`, */
            `SELECT * FROM departamento`,
        )
        console.log(data.rows);

    } catch(e){
        console.error(e)
    }
}

con()