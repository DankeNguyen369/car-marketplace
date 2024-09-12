import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import carDetails from "./../Shared/carDetails.json";
import features from "./../Shared/features.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CarImages, CarListing } from "./../../configs/schema";
import { db } from "./../../configs";
import IconField from "./components/IconField";
import UploadImages from "./components/UploadImages";
import { BiLoaderAlt } from "react-icons/bi";
import { Toaster } from "./../components/ui/sonner";
import { toast } from "sonner";

import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// import moment from "moments";s
import { timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import Service from "@/Shared/Service";
function AddListing() {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const [triggerUploadImages, setTriggerUploadImages] = useState();
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const navigate = useNavigate();
  const { user } = useUser();

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if (mode == "edit") {
      GetListingDetail();
    }
  }, []);

  const GetListingDetail = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, recordId));
    const resp = Service.FormatResult(result);

    setCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeaturesData(resp[0].features);
  };

  /**
   * Used to save User input
   * @param {*} name
   * @param {*} value
   */
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(formData);
  };

  /**
   * Used to save Features
   * @param {*} name
   * @param {*} value
   */
  const handleFeatureChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log(featuresData);
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    // console.log(formData);
    toast("Please Wait...");

    if (mode == "edit") {
      const result = await db
        .update(CarListing)
        .set({
          ...formData,
          features: featuresData,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          // postedOn: moment().format("DD/MM/yyyy"),
          postedOn: Intl.DateTimeFormat("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
            .format(Date.now())
            .toString(),
        })
        .where(eq(CarListing.id, recordId))
        .returning({ id: CarListing.id });
      // setTriggerUploadImages(result[0]?.id);
      setLoader(false);
      z;
      navigate("/profile");
    } else {
      try {
        const result = await db
          .insert(CarListing)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            userImageUrl: user?.imageUrl,
            // postedOn: moment().format("DD/MM/yyyy"),
            postedOn: Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
              .format(Date.now())
              .toString(),
          })
          .returning({ id: CarListing.id });
        if (result) {
          console.log("Data Saved");
          setTriggerUploadImages(result[0]?.id);
          setLoader(false);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form action="" className="p-10 border rounded-xl mt-10">
          {/* Car details */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label
                    className="text-sm flex gap-2 items-center mb-1"
                    htmlFor=""
                  >
                    <IconField icon={item?.icon} />
                    {item?.label}{" "}
                    {item?.required ? (
                      <span className="text-red-500">*</span>
                    ) : null}
                  </label>

                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* Features list */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Checkbox
                    onCheckedChange={(value) =>
                      handleFeatureChange(item.name, value)
                    }
                    checked={featuresData?.[item.name]}
                  />
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* Car Images */}
          <Separator className="my-6" />
          <UploadImages
            triggleUploadImages={triggerUploadImages}
            carInfo={carInfo}
            mode={mode}
            setLoader={(v) => {
              setLoader(v);
              navigate("/profile");
            }}
          />
          {/* <Separator className="my-6" /> */}
          <div className="mt-10 flex justify-end">
            <Button
              type="button"
              disabled={loader}
              onClick={(e) => onSubmit(e)}
            >
              {!loader ? (
                "Submit"
              ) : (
                <BiLoaderAlt className="animate-spin text-lg" />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
