import React,{useState} from 'react'
import "../OrderHistory.css";
import NAV from "../Component/NAV";
export default function HistoryCard(props) {
  const [reviewbadhboard, setreviewbadhboard] = useState(false)
  const [Btn, setBtn] = useState('Give Review')
    const showdata=()=>{
        console.log('review')
        if(Btn=='Give Review' || reviewbadhboard===false){
            setBtn('Try Later')
            setreviewbadhboard(true)
        }
        else{
          setBtn('Give Review')
          setreviewbadhboard(false)

        }
    }
  return (
    <div>
         <div className="c2-1">
                <div className="list-group list-group-flush child34 ">
                    <h6 className="list-group-item">Order number: {props.num} </h6>
                    <h6 className="list-group-item">Order Id: {props.id} </h6>
                    <h6 className="list-group-item">Price:{props.price} (per KG) </h6>
                    <h6 className="list-group-item">Total Price:{props.bill} </h6>
                    {reviewbadhboard?
                    <div class="alert alert-danger review-alert" role="alert">
                    Currently this is feature is not available!
                  </div>:''}
                    <button className='review-btn'  onClick={showdata}>
                    <b className=''><h4 className="list-group-item "><b>{Btn}</b></h4></b>
                    </button>
                  </div>
         </div>
         
    </div>
  )
}
