import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const AddBook = () => {

  const [books, setBooks] = useState({
    title: '',
    author: '',
    category: '',
    summary: '',
    image: ''
  })

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('title', books.title);
    formData.append('author', books.author);
    formData.append('category', books.category);
    formData.append('summary', books.summary);
    formData.append('image', books.image);
    
    axios.post('http://localhost:3000/auth/add_book', formData)
    .then(result => {
      if(result.data.Status) {
        navigate('/dashboard')
    } else {
        alert(result.data.Error)
    }
    })
    .catch(err => console.log(err))
  }


  return (
    <div className='px-5 mt-3'>

      <div className='d-flex justify-content-center align-items-center h-75'>
        <div className='p-3 rounded w-50 border'>
          <div className='d-flex justify-content-center mb-5'>
            <h3>Add New Book</h3>
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
                onChange={(e) => setBooks({ ...books, title: e.target.value })}
              />
            </div>
            <div className="col-12">
              <label for="bookAuthor" className='form-label'>
                Author
              </label>
              <input type='text' className='form-control rounded-0' id='bookAuthor' placeholder='Enter Book Author' onChange={(e) => setBooks({ ...books, author: e.target.value })} />
            </div>
            <div className="col-12">
              <label for="bookAuthor" className='form-label'>
                Category
              </label>
              <input type='text' className='form-control rounded-0' id='bookAuthor' placeholder='Enter Category' onChange={(e) => setBooks({ ...books, category: e.target.value })} />
            </div>
            <div className="col-12">
              <label for="bookAuthor" className='form-label'>
                Summary
              </label>
              <textarea type='text' className='form-control rounded-0' id='bookAuthor' placeholder='Enter Book Summary' onChange={(e) => setBooks({ ...books, summary: e.target.value })} />
            </div>
            <div className="col-12 mb-3">
              <label className="form-label" for="inputGroupFile01">
                Select Image
              </label>
              <input
                type="file"
                className="form-control rounded-0"
                id="inputGroupFile01"
                name="image"
                onChange={(e) => setBooks({ ...books, image: e.target.files[0] })}
              />
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
  );
};

export default AddBook