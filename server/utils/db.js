import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"librarydb"
})

con.connect(function(err){
    if(err){
        console.log("connect error")
    }else{
        console.log("connected")
    }
})

export default con