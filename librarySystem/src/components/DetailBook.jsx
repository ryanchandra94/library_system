import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const DetailBook = () => {

    const {id} = useParams()
    
    const [detail, setDetail] = useState({
        title: '',
        author: '',
        category: '',
        summary: '',
        image:''
      });

      useEffect(() => {
        axios.get('http://localhost:3000/auth/books/'+id)
        .then(result => {
            setDetail({
                ...detail,
                title: result.data.Result[0].title,
                author: result.data.Result[0].author,
                category: result.data.Result[0].category,
                summary: result.data.Result[0].summary,
                image: result.data.Result[0].image
            })
        }).catch(err => console.log(err))
    }, [])

  return (
    <div>
        <h2 className='mt-5 text-center mb-3'>{detail.title}</h2>
        <img src={`http://localhost:3000/images/`+detail.image} className='image_container'/>
        <h5 className='mt-5 text-center mb-3'>{detail.author}</h5>
        <h5 className='mt-5 text-center mb-3'>{detail.category}</h5>
        <h5 className='mt-5 text-center bookDescription'>{detail.summary}</h5>
                
    </div>
    
    
  )
}

export default DetailBook