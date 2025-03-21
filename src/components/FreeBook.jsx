import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import axios from "axios";
import Cards from "./Cards";
import { Card, Button } from "react-bootstrap"; // Import Bootstrap components

function Freebook() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("https://book-store-backend-fxe2.onrender.com/book");
        const data = res.data.filter((data) => data.category === "free");
        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Discover Free Books</h1>
        <p>
          Explore a curated selection of free books available exclusively on our
          platform. Whether you're a fan of gripping fiction, insightful
          non-fiction, or captivating biographies, our collection has something
          to offer every reader. Dive into these compelling stories and enrich
          your reading experience without any cost.
        </p>
      </div>

      <div>
        <Slider {...settings}>
          {book.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </Slider>
      </div>

      {/* Bootstrap Card Example */}
      <div className="mt-6">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body>
            <Card.Title>Featured Book</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Read Now</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Freebook;
