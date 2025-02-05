import React from "react";
import { useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import AlternateMenuImg from ".././img/food-alternate-img.jpg";
import { restroImgUrl } from "../utils/constants";

const RestaurantCard = ({ restaurants , selectedFilter }) => {
  let filteredData = restaurants;
  if(selectedFilter =="timeAsc"){
    console.log(filteredData);
    filteredData =  restaurants.sort((a, b) =>  a.info.sla.deliveryTime - b.info.sla.deliveryTime);
    console.log(filteredData);
  }else if(selectedFilter =="timeDesc"){
    filteredData =  restaurants.sort((a, b) =>  b.info.sla.deliveryTime - a.info.sla.deliveryTime);
  }
  else if(selectedFilter =="priceAsc"){
    console.log(filteredData);
    filteredData =  restaurants.sort((a, b) => {
      const costA = parseInt(a.info.costForTwo.replace(/\D/g, ""));
      const costB = parseInt(b.info.costForTwo.replace(/\D/g, ""));
      return costA - costB;
  });
    console.log(filteredData);
  }else if(selectedFilter =="priceDesc"){
    filteredData =  restaurants.sort((a, b) => {
      const costA = parseInt(a.info.costForTwo.replace(/\D/g, ""));
      const costB = parseInt(b.info.costForTwo.replace(/\D/g, ""));
      return costB - costA;
  });
  }
  else if(selectedFilter =="ratingDesc"){
    console.log(filteredData);
    filteredData =  restaurants.sort((a, b) => b.info.avgRating - a.info.avgRating);
    console.log(filteredData);
  }else if(selectedFilter =="ratingAsc"){
    filteredData =  restaurants.sort((a, b) => a.info.avgRating - b.info.avgRating);
  }
  const navigate = useNavigate();

  const openRestaurantMenu = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <>
      {filteredData &&
        filteredData.map(({ info }) => {
          const {
            name,
            id,
            cuisines,
            avgRating,
            costForTwo,
            cloudinaryImageId,
            sla,
          } = info;

          return (
            <div
              key={id}
              className="hover:border-gray-300 hover:shadow flex flex-col md:gap-1 cursor-pointer rounded transition-all border-gray-200 md:border-white border p-4 md:p-5"
              onClick={() => openRestaurantMenu(id)}
            >
              <img
                src={
                  cloudinaryImageId
                    ? restroImgUrl + cloudinaryImageId
                    : AlternateMenuImg
                }
                alt="name"
                className="rounded"
              />

              <h2 className="text-xl font-bold mt-1">{name}</h2>

              <p className="text-gray-800 text-sm">
                {cuisines && cuisines.join(", ")}
              </p>

              <div className="flex justify-between text-sm mt-2">
                <div
                  className={`flex items-center gap-2 font-bold text-sm px-1 rounded w-fit 
                  ${
                    avgRating >= 4
                      ? "bg-slate-200 text-green-700"
                      : "bg-orange-200 text-orange-600"
                  }
                  `}
                >
                  <IoStar />
                  <p>{avgRating}</p>
                </div>
                <span className="uppercase">{sla?.slaString}</span>
                <span className="uppercase">{costForTwo && costForTwo}</span>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default RestaurantCard;
