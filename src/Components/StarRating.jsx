import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
  const [currentRating, setCurrentRating] = useState(0);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleRating = (value) => {
    setCurrentRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            className={`h-8 w-8 space-x-5 ${ratingValue <= currentRating ? "text-yellow-300" : "text-gray-400"
              } cursor-pointer`}
            onClick={() => handleRating(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;