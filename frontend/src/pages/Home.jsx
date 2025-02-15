import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "../styles/pages/home.module.css";
import Header from "../components/Header";
import axios from "axios";

const CoursesList = () => {
  // const [courses, setCourses] = useState([]);
  const [dummyCourses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/instructor/allcourses")
      .then((res) => {
        console.log("COURSES: ", res);

        res.data.forEach((course) => {
          const title = course.title;
          const instructor = course.instructor_name;
          const price = course.price || 0;
          const image = course.course_image_url;
          const level = course.level;
          const tags = [course.category];
          // const id = course._id;
          const index = course.index;
          

          setCourses((prev) => [
            ...prev,
            {
              title,
              instructor,
              price,
              image,
              level,
              tags,
              rating: 4.7,
              reviews: 184005,
              original_price: 2000,
              index
            },
          ]);
        });
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const makeUrlFriendly = (course) => {
    return "course/" + course.trimEnd().replace(/\s+/g, '-');
  }

  useEffect(() => {

          console.log(dummyCourses);
  }, [dummyCourses])

  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <h2 className={styles.heading}>What to learn next</h2>

        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          navigation
        >
          {dummyCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <a href={"/course/" + course.index}>
                <div className={styles.card}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{course.title}</h3>
                  <p className={styles.instructor}>{course.instructor}</p>
                  <div className={styles.rating}>
                    ⭐ {course.rating} ({course.reviews.toLocaleString()})
                  </div>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{course.price}</span>
                    <span className={styles.originalPrice}>
                      ₹{course.original_price}
                    </span>
                  </div>
                  <div className={styles.tags}>
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`${styles.badge} ${
                          tag === "Premium" ? styles.premium : styles.bestseller
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <h2 className={styles.heading}>Recommended to you based on ratings</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          navigation
        >
          {dummyCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <a href="dog">
                <div className={styles.card}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{course.title}</h3>
                  <p className={styles.instructor}>{course.instructor}</p>
                  <div className={styles.rating}>
                    ⭐ {course.rating} ({course.reviews.toLocaleString()})
                  </div>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{course.price}</span>
                    <span className={styles.originalPrice}>
                      ₹{course.original_price}
                    </span>
                  </div>
                  <div className={styles.tags}>
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`${styles.badge} ${
                          tag === "Premium" ? styles.premium : styles.bestseller
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        <h2 className={styles.heading}>Learners are viewing</h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={15}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
          navigation
        >
          {dummyCourses.map((course, index) => (
            <SwiperSlide key={index}>
              <a href="dog">
                <div className={styles.card}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={styles.image}
                  />
                  <h3 className={styles.title}>{course.title}</h3>
                  <p className={styles.instructor}>{course.instructor}</p>
                  <div className={styles.rating}>
                    ⭐ {course.rating} ({course.reviews.toLocaleString()})
                  </div>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{course.price}</span>
                    <span className={styles.originalPrice}>
                      ₹{course.original_price}
                    </span>
                  </div>
                  <div className={styles.tags}>
                    {course.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`${styles.badge} ${
                          tag === "Premium" ? styles.premium : styles.bestseller
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default CoursesList;
