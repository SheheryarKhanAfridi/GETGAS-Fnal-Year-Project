import React from 'react'
import '../App.css'
import './Footer'
import NAV from "../Component/NAV";

export default function Error() {
  return (
    <div>
      <NAV/>
        <div id="notfound h-100 w-100">
            <div className="notfound">
                <div className='alert-warning text-center p-3 mt-3 mb-2'>
                <h1>Error 404 <span> <br />Page not found</span></h1>
                </div>
                <div className='alert-danger p-3 text-center'>May be you need to login first</div>
            </div>
        </div>
    </div>
  )
}
