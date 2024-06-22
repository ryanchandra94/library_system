import express from "express"
import con from '../utils/db.js'
import jwt from 'jsonwebtoken'
import multer from "multer"
import path from 'path'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: '1d' });
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        }else{
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" })
        }
    });

});



// start image upload

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

//end image upload

router.post('/add_book', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO books 
    (title, author, category, summary, image) 
    VALUES (?)`;
    const values = [
        req.body.title,
        req.body.author,
        req.body.category,
        req.body.summary,
        req.file.filename
    ]
    con.query(sql, [values], (err, result)=>{ 
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
        
    })
})

router.get('/books', (req, res) => {
    const sql= "SELECT * FROM books";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql= "SELECT * FROM books WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})


router.put('/edit_books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE books 
        SET title = ?, author = ?, category = ?, summary = ? 
        WHERE id = ?`
    const values = [
        req.body.title, 
        req.body.author, 
        req.body.category, 
        req.body.summary
    ]
    con.query(sql, [...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: [values]})
    })
})

router.delete('/delete_book/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from books where id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/book_count', (req, res) => {
    const sql = "select count(id) as books from books";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


export { router as adminRouter }