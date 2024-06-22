import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const DeleteBook = () => {

  const {id} = useParams()
    
    const [detail, setDetail] = useState({
        title: '',
        author: '',
        category: '',
        summary: ''
      });

      useEffect(() => {
        axios.get('http://localhost:3000/auth/books/'+id)
        .then(result => {
            setDetail({
                ...detail,
                title: result.data.Result[0].title,
                author: result.data.Result[0].author,
                category: result.data.Result[0].category,
                summary: result.data.Result[0].summary
            })
        }).catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleDelete = (e) => {
      e.preventDefault()
      axios.delete('http://localhost:3000/auth/delete_book/'+id)
      .then(result => {
          if(result.data.Status) {
              navigate('/dashboard/viewList')
          } else {
              alert(result.data.Error)
          }
      }).catch(err => console.log(err))
    } 

    

  return (
    <div className='px-5 mt-3'>

      <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-50 border'>
          <div className='d-flex justify-content-center mb-5'>
            <h3>Delete This Book?</h3>
          </div>
          <form className="row g-1" onSubmit={handleDelete}>
            <div className="col-12">
              <label for="bookTitle" className="form-label">
                Title
              </label>
              <h4>{detail.title}</h4>
            </div>
            <div className="col-12">
              <label for="bookAuthor" className='form-label'>
                Author
              </label>
              <h4>{detail.author}</h4>
            </div>
            <div className="col-12">
              <label for="bookCategory" className='form-label'>
                Category
              </label>
              <h4>{detail.category}</h4>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-3'></div>
    </div>
  )
}

export default DeleteBook