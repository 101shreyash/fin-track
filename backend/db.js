import {Pool} from "pg"


const pool = new Pool({

    user:process.env.DB_USER,
    database:process.env.DATABASE,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    password:process.env.DB_PASSWORD
    


})

export default pool;