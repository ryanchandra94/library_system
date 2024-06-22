import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const ViewList = () => {

  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  useEffect(()=> {
    axios.get('http://localhost:3000/auth/books')
    .then(result => {
        if(result.data.Status){
          setBooks(result.data.Result);
        }else{
          alert(result.data.Error)
        }
    }).catch(err => console.log(err))
  }, []);

  

  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>Book List</h3>
        </div>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Author</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map(e => (
                  <tr>
                    <td>{e.title}</td>
                    <td>
                      <img src={`http://localhost:3000/images/`+e.image} className='book_image' />
                    </td>
                    <td>{e.author}</td>
                    <td>{e.category}</td>
                    <td>
                      <Link to={`/dashboard/edit_book/`+e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                      <Link to={`/dashboard/delete_book/`+e.id} className='btn btn-warning btn-sm me-2'>Delete</Link>
                      <Link to={`/dashboard/detail_book/`+e.id} className='btn btn-secondary btn-sm'>See Detail</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ViewList