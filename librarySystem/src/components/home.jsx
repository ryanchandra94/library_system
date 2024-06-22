import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Home = () => {

  const [bookTotal, setBookCount] = useState([])

  useEffect(() => {
    bookCount();
  }, [])

  const bookCount = () => {
    axios.get('http://localhost:3000/auth/book_count')
    .then(result => {
      if(result.data.Status){
        setBookCount(result.data.Result[0].books)
      }
    })
  }

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Welcome to our Library!</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total Books: {bookTotal}</h5>
            <h5></h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home