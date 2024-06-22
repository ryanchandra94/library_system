
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './components/login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Home from './components/home'
import AddBook from './components/AddBook'
import DeleteBook from './components/DeleteBook'
import ViewList from './components/ViewList'
import AddCategory from './components/AddCategory'
import EditBooks from './components/EditBooks'
import DetailBook from './components/DetailBook'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/dashboard' element={<Dashboard />}>
        <Route path='' element={<Home />} ></Route>
        <Route path='/dashboard/addBook' element={<AddBook />} ></Route>
        <Route path='/dashboard/deleteBook' element={<DeleteBook />} ></Route>
        <Route path='/dashboard/viewList' element={<ViewList />} ></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />} ></Route>
        <Route path='/dashboard/edit_book/:id' element={<EditBooks />} ></Route>
        <Route path='/dashboard/delete_book/:id' element={<DeleteBook />} ></Route>
        <Route path='/dashboard/detail_book/:id' element={<DetailBook />} ></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
