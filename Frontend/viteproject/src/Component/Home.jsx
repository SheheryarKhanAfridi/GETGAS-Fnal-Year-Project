import React , { useRef } from 'react'
import '../Home.css'
import { Link } from 'react-router-dom';
import { AiOutlinePlayCircle } from "react-icons/ai";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import NAV from './NAV';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export default function Home({isLoggedIn}) {
  const { ref, inView } = useInView();
  const startCounting = useRef(false);

  if (inView && !startCounting.current) {
    startCounting.current = true;
  }
  return (
    <div>
      <div className='stickynav-edit'>
      <NAV isLoggedIn={isLoggedIn} />
</div>
      
<section>
        <div className="hero">
          <div className="container" data-aos="fade-right">
            <div className="row">
              <div className="col-md-6 ">
                <div className="Hboxtext">
                  <h1>Welcome to GetGas</h1>

                  <p>
                  Your trusted platform for hassle-free gas refills - order with ease and convenience.
                  </p>
                  <div className="Hbuttons">
                    <Link to='/Order'>

                    <button className="hb1" >Place Order</button>
                    </Link>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="Hboximg">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="maincards" data-aos="fade" data-aos-delay="300">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link to="/Order" className='cardlinkset'  >
                <div className="cardbox" >
                  <AiOutlinePlayCircle className="cardicon" />
                  Place Order
                </div>
                </Link>
              </div>
              <div className="col-md-3">
                <Link to="/Contact" className='cardlinkset'>
                <div className="cardbox">
                  {/* <IoDiamondOutline className="cardicon" /> */}
                  <i className="fa-solid fa-envelope cardicon " ></i>
                  Contact Us
                </div>
                </Link>
              </div>
              
              <div className="col-md-3">
                <Link to="/Account" className='cardlinkset'>
                <div className="cardbox">
                <i class="fa-solid fa-user cardicon"></i>
                  Account
                </div>
                </Link>
              </div>
              <div className="col-md-3">
              <Link to="/About" className='cardlinkset'>
                <div className="cardbox ">
                  {/* <FaRegPlusSquare className="cardicon" /> */}
                  <i class="fa-solid fa-users cardicon" ></i>
                
                  About Us
                  
                </div>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    <section>
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img src="https://cdn.dribbble.com/users/1206528/screenshots/5483634/for_dribbble_1.gif" className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3"> Ensure the utmost satisfaction of our valued clients</h1>
          <p className="lead">With a dedication to excellence and a commitment to customer service. Join our community of satisfied clients today and experience the difference with GetGas.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            {/* <button type="button" className="btn btn-primary btn-lg px-4 me-md-2" fdprocessedid="s2kh4c">Primary</button> */}
            <Link to='/Order'>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Place Order for Gas refill</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </section>
      {/* <section>
        <div id="About" className="Aboutus">
          <div className="container ">
            <div className="row ">
              <div className="col-md-6" data-aos="fade-up">
                <div className="Aboutbox1">
                  <h2>Happy Clients</h2>
                  <img src="https://img.freepik.com/premium-photo/engaging-networking-friendly-conversations_1026451-103.jpg?ga=GA1.1.1262783890.1700261175&semt=ais_ai_generated" alt="" data-aos="fade-right" />
                  <p>
                    Ut fugiat ut sunt quia veniam. Voluptate perferendis
                    perspiciatis quod nisi et. Placeat debitis quia recusandae
                    odit et consequatur voluptatem. Dignissimos pariatur
                    consectetur fugiat voluptas ea.
                  </p>
                  <p>
                    Temporibus nihil enim deserunt sed ea. Provident sit
                    expedita aut cupiditate nihil vitae quo officia vel.
                    Blanditiis eligendi possimus et in cum. Quidem eos ut sint
                    rem veniam qui. Ut ut repellendus nobis tempore doloribus
                    debitis explicabo similique sit. Accusantium sed ut omnis
                    beatae neque deleniti repellendus.
                  </p>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-down">
                <div className="Aboutbox2" ata-aos="fade-right">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <p>
                    <IoCheckmarkDoneCircle className="abouticons" />
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    <IoCheckmarkDoneCircle className="abouticons" />
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </p>
                  <p>
                    <IoCheckmarkDoneCircle className="abouticons" />
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate trideta
                    storacalaperda mastiro dolore eu fugiat nulla pariatur.
                  </p>

                  <p>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident
                  </p>

                  <img
                    className="imgabout"
                    // src="https://t4.ftcdn.net/jpg/03/00/15/97/360_F_300159721_fOLyltXf2FAxcMrH8pCI70gdWpqxLhhq.jpg"
                    src='https://img.freepik.com/free-photo/truck-with-trailer-road_1340-32492.jpg?ga=GA1.1.1262783890.1700261175&semt=ais_ai_generated'
                    alt=""
                    data-aos="fade-left"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

     

      <section>
        <div className="cleints"  >
          <div className="container">
            {/* <div className="row">
              <div className="col-md-6 clientcoun-t" data-aos="fade-right">
                <img  className="clintsimg" src="https://img.freepik.com/premium-vector/feedback-concept-tiny-people-leave-feedback-put-assessment-online-service-customer-survey_501813-1606.jpg" alt="" />
              </div>
              <div className="col-md-6"data-aos="fade-left">
                <div className="clintnum">
                  <h1><CountUp start={0} end={402} duration={2.5} separator="," /></h1>
                  
                  <p> <strong  >Happy Clients: </strong>consequuntur quae diredo para mesta</p>
                </div>
                <div className="clintnum">
                  <h1><CountUp start={0} end={521} duration={2.5} separator="," /></h1>
                  <p> <strong  >Order Served: </strong>consequuntur quae diredo para mesta</p>
                </div>
                <div className="clintnum">
                  <h1><CountUp start={0} end={193} duration={2.5} separator="," /></h1>
                  <p> <strong  >Vendors: </strong>quae diredo para mesta</p>
                </div>
               
              </div>
            </div> */}
             <div className="row" ref={ref}>
      <div className="col-md-6 clientcoun-t" data-aos="fade-right">
        <img className="clintsimg" src="https://img.freepik.com/premium-vector/feedback-concept-tiny-people-leave-feedback-put-assessment-online-service-customer-survey_501813-1606.jpg" alt="" />
      </div>
      <div className="col-md-6" data-aos="fade-left">
        <div className="clintnum">
          <h1>
            <CountUp start={startCounting.current ? 0 : null} end={402} duration={2.5} separator="," />
          </h1>
          <p><strong>Happy Clients: </strong>consequuntur quae diredo para mesta</p>
        </div>
        <div className="clintnum">
          <h1>
            <CountUp start={startCounting.current ? 0 : null} end={521} duration={2.5} separator="," />
          </h1>
          <p><strong>Order Served: </strong>consequuntur quae diredo para mesta</p>
        </div>
        <div className="clintnum">
          <h1>
            <CountUp start={startCounting.current ? 0 : null} end={193} duration={2.5} separator="," />
          </h1>
          <p><strong>Vendors: </strong>quae diredo para mesta</p>
        </div>
      </div>
    </div>
          </div>
        </div>
      </section>

      <section>
        <div className="call-to-action"data-aos="fade-up">
          <div className="container">
            <div className="callbox">
              <div className="circle">
              <h2>Contact us for any Queries</h2>
              <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident, sunt in culpa  qui officia deserunt mollit anim id est laborum.</p>
              <Link to="/Contact" >
              <button>Contact us</button>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
    </div>
    

  )
}
