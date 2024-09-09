import Service from "@/Shared/Service";
import { db } from "./../../configs";
import { CarImages, CarListing } from "./../../configs/schema";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";

function SearchByOptions() {
  const [searchParam] = useSearchParams();
  const [carList, setCarList] = useState([]);
  const condition = searchParam.get("cars");
  const make = searchParam.get("make");
  const price = searchParam.get("price");
  //   console.log(condition, make, price);

  useEffect(() => {
    GetCarList();
  }, []);
  const GetCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(condition != undefined && eq(CarListing.condition, condition))
      .where(make != undefined && eq(CarListing.make, make));
    //   .where(price != undefined && eq(CarListing.price, price));
    const resp = Service.FormatResult(result);
    // console.log(resp);
    setCarList(resp);
    console.log(carList);
  };

  return <div>SearchByOptions</div>;
}

export default SearchByOptions;
