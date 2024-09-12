import { Button } from "@/components/ui/button";
import Service from "@/Shared/Service";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { useNavigate, useNavigation } from "react-router-dom";

function OwnersDetails({ carDetail }) {
  const { user } = useUser();
  const navigation = useNavigate();
  const OnMessageOwnerButtonClick = async () => {
    const userId = user.primaryEmailAddress.emailAddress.split("@")[0];
    const ownerUserId = carDetail?.createdBy.split("@")[0];
    // create current User Id
    try {
      await Service.CreateSendBirdUser(
        userId,
        user?.fullName,
        user?.imageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {}
    // Owner User Id
    try {
      await Service.CreateSendBirdUser(
        ownerUserId,
        carDetail?.userName,
        carDetail?.userImageUrl
        // user?.imageUrl
      ).then((resp) => {
        console.log(resp);
      });
    } catch (e) {}
    //  Create Channel
    try {
      await Service.CreateSendBirdChannel(
        [userId, ownerUserId],
        carDetail?.listingTitle
      ).then((resp) => {
        console.log(resp);
        console.log("channel created:", carDetail?.listingTitle);
        navigation("/profile");
      });
    } catch (e) {}
  };
  return (
    <div className="p-10 rounded-xl border shadow-md mt-7">
      {carDetail ? (
        <div>
          <h2 className="font-medium text-2xl mb-3">Owner Detail</h2>
          <div className="flex items-center gap-2">
            <img
              src={carDetail?.userImageUrl}
              className="w[70px] h-[70px] rounded-full"
            />
            <div>
              <h2 className="mt-2 font-bold text-xl">{carDetail?.userName}</h2>
              <h2 mt-2 text-gray-500>
                {carDetail?.createdBy}
              </h2>
            </div>
          </div>
          <Button className="w-full mt-6" onClick={OnMessageOwnerButtonClick}>
            Message Owner for Details
          </Button>
        </div>
      ) : (
        <div className="w-full mt-7 rounded-xl h-[250px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default OwnersDetails;
