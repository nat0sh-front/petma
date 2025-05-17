import React from "react";
import CustomStar from "../CustomStar/CustomStar";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const stars = [
    ...Array(fullStars).fill("full"),
    ...(hasHalf ? ["half"] : []),
    ...Array(emptyStars).fill("empty")
  ];

  return (
    <div style={{ display: "flex" }}>
      {stars.map((type, index) => (
        <CustomStar key={index} type={type} />
      ))}
    </div>
  );
};

export default StarRating;
