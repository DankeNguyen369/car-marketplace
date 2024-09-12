import React from "react";

function ImageGallery({ carDetail }) {
  return (
    <div>
      <img
        src={carDetail?.images[0].imageUrl}
        alt=""
        srcset=""
        className="w-full h-[500px] object-cover rounded-xl"
      />
    </div>
  );
}

export default ImageGallery;
