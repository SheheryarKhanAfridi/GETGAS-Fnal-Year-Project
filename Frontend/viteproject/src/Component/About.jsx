import React , {useEffect,useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Footer";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "../App.css";
import '../About.css';
import NAV from '../Component/NAV';
import io from 'socket.io-client';
import mockup1 from '../Pictures/mockup1.png'
import mockup3 from '../Pictures/mockup3.png'

export default function About() {
  const [username, setUsername] = useState('');
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState('');

    const handleStarClick = (selectedStars) => {
        setStars(selectedStars);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/reviews', { username, stars, comment });
            alert('Review submitted successfully!');
            setUsername('');
            setStars(0);
            setComment('');
        } catch (error) {
            console.error('Failed to submit review:', error);
            alert('Failed to submit review. Please try again later.');
        }
    };
  return (
//     <div>
//        <button
//   className="btn btn-primary"
//   type="button"
//   data-bs-toggle="collapse"
//   data-bs-target="#whyChooseUsContent"
//   aria-expanded="false"
//   aria-controls="whyChooseUsContent"
// >
//   Why Choose Us
// </button>
// <div className="collapse" id="whyChooseUsContent">
//   <ul className="list-group">
//     <li className="list-group-item">
//       <strong>Quality Assurance:</strong> We source our gas from reputable suppliers, guaranteeing the highest quality and safety standards for your peace of mind.
//     </li>
//     <li className="list-group-item">
//       <strong>Reliable Deliveries:</strong> Our efficient delivery system ensures that your gas supply is never interrupted. We keep track of your usage and schedule deliveries just in time.
//     </li>
//     <li className="list-group-item">
//       <strong>Competitive Pricing:</strong> We believe that essential services should be affordable. That's why we offer competitive prices without compromising on quality.
//     </li>
//     <li className="list-group-item">
//       <strong>Exceptional Customer Service:</strong> Our dedicated support team is always ready to assist you. Whether you have questions, concerns, or need assistance, we're here to help.
//     </li>
//   </ul>
// </div>

     
//     </div>
<div>
  
<div className='stickynav-edit'>
      <NAV/>
      </div>
   
      {/* <Carousel className='mt-5'>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.tomoe.com.sg/image/cache/catalog/3-1920x600.jpg"
            alt="Slide 1"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.tomoe-batam.com/images/slides/slide-two.jpg"
            alt="Slide 2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.jtl-diecasting.com/uploads/202211433/ImgScroll/ba202201071432291788229.jpg"
            alt="Slide 3"
          />
        </Carousel.Item>
      </Carousel> */}

     

      <section>
        <div className="container">
          <div className="row specialchilds">
            <div className="col-md-4 specialchild1">
             <div className="special-child-child">
             <h1 className="our-mission">OUR MISSION</h1>
             </div>
            </div>
            <div className="col-md-4 specialchild2">
              <h3>For Users:</h3>
              <p>
                Our mission is to make your life easier and more convenient. We
                understand the hassles and uncertainties that come with managing
                your gas refills. Therefore, we aim to provide you with a
                seamless and efficient solution. With our platform, you can
                effortlessly place gas refilling orders from the comfort of your
                home. We'll ensure that your orders are delivered promptly and
                safely to your doorstep
              </p>
            </div>
            <div className="col-md-4 specialchild3">
              <h3> For Vendors:</h3>
              <p>
                Our mission extends to our valued vendors as well. We aim to
                empower and connect vendors, offering them a platform to reach a
                broader customer base. By joining our network, vendors can
                streamline their operations, receiving orders directly from
                users in need of gas refills. We provide a reliable and
                efficient means for vendors to expand their business and serve a
                wider audience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
   <div className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <p className="lead mb-3">Using a damaged gas cylinder poses significant risks to both property and life</p>
          <h1 className="display-7  lh-1">A damaged cylinder can lead to <b>Leaks</b>, <b>Fires</b>, or even <b>Explosions</b></h1>
          <p className="lead mt-3">Always prioritize safety and adhere to proper handling procedures when dealing with gas cylinders.</p>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg" src="https://c1.wallpaperflare.com/preview/806/185/147/gas-cylinders-gas-cylinder-blue-metal.jpg" alt="" width="720" />
        </div>
      </div>
    </div>
   </section>
      <div className="remember">
        <h3 >
          <b>Remember</b>, safety is paramount when dealing with damaged gas
          cylinders. Your quick and responsible actions can prevent accidents
          and ensure the well-being of everyone around.
        </h3>
      </div>

      <div className="cardsback">
        <button
          className="btn  cardsButton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#whyChooseUsContent"
          aria-expanded="false"
          aria-controls="whyChooseUsContent"
        >
          <b>Why Choose Us</b>
        </button>
        <div className="container">
          <div className="collapse p-5" id="whyChooseUsContent">
            <ul className="list-group">
              <div className="swipershaow">
                <Swiper
                  modules={[Navigation, Pagination, A11y]}
                  spaceBetween={50}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  breakpoints={{
                    400: {
                      slidesPerView: 1, // Display one card per slide on screens with a width of 400px or less (mobile screens).
                    },
                    550: {
                      slidesPerView: 2, // Display two cards per slide on screens with a width of 932px or less (medium-sized screens).
                    },
                    1200: {
                      slidesPerView: 3, // Display three cards per slide on screens with a width of 1200px or less (larger screens).
                    },
                  }}
                  navigation={{
                    // Add navigation configuration
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/premium-photo/petrochemical-industry-sky-sunset_168569-127.jpg?size=626&ext=jpg&uid=R120267723&ga=GA1.1.1223514889.1685116320&semt=ais"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <button href="#" className="btn btn-primary">
                          Go somewhere
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/premium-photo/industrial-furnace-heat-exchanger-cracking-hydrocarbons-factory-sky-sunset-close-up-equipment-petrochemical-plant_168569-9.jpg?size=626&ext=jpg&uid=R120267723&ga=GA1.1.1223514889.1685116320&semt=ais"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <button href="#" className="btn btn-primary">
                          Go somewhere
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-photo/pollution-industry-exterior-daylight_23-2149057673.jpg?size=626&ext=jpg&uid=R120267723&ga=GA1.1.1223514889.1685116320&semt=ais"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <button href="#" className="btn btn-primary">
                          Go somewhere
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/premium-photo/petrochemical-industry-sky-sunset_168569-127.jpg?size=626&ext=jpg&uid=R120267723&ga=GA1.1.1223514889.1685116320&semt=ais"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <button href="#" className="btn btn-primary">
                          Go somewhere
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide>
                    <div className="card">
                      <img
                        src="https://img.freepik.com/free-photo/environmental-pollution-factory-exterior_23-2149057713.jpg?size=626&ext=jpg&uid=R120267723&ga=GA1.1.1223514889.1685116320&semt=ais"
                        className="card-img-top"
                        alt="..."
                      />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Some quick example text to build on the card title and
                          make up the bulk of the card's content.
                        </p>
                        <button href="#" className="btn btn-primary">
                          Go somewhere
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </Swiper>
              </div>
            </ul>
          </div>
        </div>
      </div>
      
      <section>
        <div className="end-1 row">
            <div className="end-2 col-md-5">
              <img src={mockup1} alt="" className="mockup-1"/>
            </div>
            <div className="end-2 col-md-5">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi vel, earum laudantium odit tempora ut omnis non, tempore dicta dolorum ad recusandae, praesentium eius impedit assumenda natus aut ipsa. Quae.</div>
            <div className="end-2 col-md-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, accusantium nostrum eligendi dolor aliquam a labore autem eveniet, laboriosam repudiandae quibusdam! Suscipit neque consequatur doloremque nobis odio cumque in sint?</div>
            <div className="end-2 col-md-5">
            <img src={mockup3} alt="" className="mockup-1"/>

            </div>

        </div>
      </section>
      
      
    
    </div>
  );
}
