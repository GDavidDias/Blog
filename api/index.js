const server = require('./src/app.js');
const {conn} = require('./src/db.js');
const{
    PORT
} = process.env;

//conexion al servidor y escucha de puerto
conn.sync({force:true}).then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Listen at port ${PORT}`);
    });
});