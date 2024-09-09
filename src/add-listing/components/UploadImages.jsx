import { Button } from "@/components/ui/button";
import { storage } from "./../../../configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { CarImages } from "../../../configs/schema";
// import { db } from "configs";
import { db } from "../../../configs";
// import { index, eq } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

function UploadImages({ triggleUploadImages, setLoader, carInfo, mode }) {
  const [selectedFileList, setSelectedFileList] = useState([]);
  const [EditCarImageList, setEditCarImageList] = useState([]);
  // console.log(mode);

  useEffect(() => {
    if (mode == "edit") {
      // setEditCarImageList(car);
      setEditCarImageList([]);
      carInfo?.images.forEach((image) => {
        setEditCarImageList((prev) => [...prev, image?.imageUrl]);
        // console.log(image);
      });
    }
  }, [carInfo]);
  //
  useEffect(() => {
    if (triggleUploadImages) {
      UploadImagesToServer();
    }
  }, [triggleUploadImages]);
  const onFileSelected = (event) => {
    const files = event.target.files;
    // console.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      //   console.log(file);
      //   const objectUrl = Url.createObjectUrl(file);
      setSelectedFileList((prev) => [...prev, file]);
    }
  };
  const onImageRemove = (image, index) => {
    const result = selectedFileList.filter((item) => item != image);
    setSelectedFileList(result);
  };
  //   console.log(selectedFileList); //test
  const onImageRemoveFromDB = async (image, index) => {
    // console.log(carInfo?.images[index]);
    const result = await db
      .delete(CarImages)
      .where(eq(CarImages.id, carInfo?.images[index]?.id))
      .returning({ id: CarImages.id });
    const imageList = EditCarImageList.filter((item) => item != image);
    setEditCarImageList(imageList);
  };
  const UploadImagesToServer = async () => {
    setLoader(true);
    await selectedFileList.forEach(async (file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "car-marketplace/" + fileName);
      const metaData = {
        contentType: "image/jpeg",
      };
      await uploadBytes(storageRef, file, metaData)
        .then((snapShot) => {
          console.log("Uploaded Files");
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (downloadUrl) => {
            console.log(downloadUrl);
            await db.insert(CarImages).values({
              imageUrl: downloadUrl,
              carListingId: triggleUploadImages,
            });
          });
        });
      setLoader(false);
    });
  };
  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {mode == "edit" &&
          EditCarImageList.map((image, index) => (
            <div key={index}>
              <IoIosCloseCircle
                className="absolute m-3 text-lg text-white"
                onClick={() => onImageRemoveFromDB(image, index)}
              />
              <img
                src={image}
                className="w-full h-[130px] object-cover rounded-xl"
                alt=""
                srcset=""
              />
            </div>
          ))}
        {selectedFileList.map((image, index) => (
          <div key={index}>
            <IoIosCloseCircle
              className="absolute m-3 text-lg text-white"
              onClick={() => onImageRemove(image, index)}
            />
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[130px] object-cover rounded-xl"
              alt=""
              srcset=""
            />
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-100 p-10 cursor-pointer hover:shadow-md">
            <h2 className="text-lg text-center">+</h2>
          </div>
        </label>
        <input
          type="file"
          multiple="true"
          id="upload-images"
          className="opacity-0"
          //   name=""
          onChange={onFileSelected}
        />
      </div>
      {/* <Button onClick={UploadFBImages}>Upload Images</Button> */}
    </div>
  );
}

export default UploadImages;
