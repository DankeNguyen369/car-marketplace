const FormatResult = (resp) => {
  let result = [];
  let finalResult = [];
  resp.forEach((item) => {
    const listingId = item.carListing?.id;
    if (!result[listingId]) {
      result[listingId] = {
        car: item.carListing,
        images: [],
      };
    }
    if (item.images) {
      result[listingId].carImages.push(item.carImages);
    }
  });
};
export default {
  FormatResult,
};
