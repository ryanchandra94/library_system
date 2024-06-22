import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const EditBooks = () => {

    const {id} = useParams()
    
    const [detail, setDetail] = useState({
        title: '',
        author: '',
        category: '',
        summary: ''
      });

      const navigate = useNavigate()

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

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_books/'+id, detail)
        .then(result => {
            if(result.data.Status){
                navigate("/dashboard/viewList")
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className='px-5 mt-3'>

      <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-50 border'>
          <div className='d-flex justify-content-center mb-5'>
            <h3>Edit Book Detail</h3>
          </div>
          <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
              <label for="bookTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                id="bookTitle"
                placeholder="Enter Book Title"
                autoComplete='off'
                defaultValue={detail.title}
                onChange={(e) => setDetail({ ...detail, title: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label for="bookAuthor" className='form-label'>
                Author
              </label>
              <input type='text' className='form-control rounded-0' id='bookAuthor' defaultValue={detail.author}
              placeholder='Enter Book Author' onChange={(e) => setDetail({ ...detail, author: e.target.value })} />
            </div>
            <div className="col-12">
              <label for="bookCategory" className='form-label'>
                Category
              </label>
              <input type='text' className='form-control rounded-0' id='bookCategory' defaultValue={detail.category}
              placeholder='Enter Category' onChange={(e) => setDetail({ ...detail, category: e.target.value })} />
            </div>
            <div className="col-12 mb-3">
              <label for="bookSummary" className='form-label'>
                Summary
              </label>
              <textarea type='text' className='form-control rounded-0' id='bookSummary' defaultValue={detail.summary}
              placeholder='Enter Book Summary' onChange={(e) => setDetail({ ...detail, summary: e.target.value })} />
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

export default EditBooks