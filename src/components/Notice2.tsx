import React, { useEffect, useState } from "react";
import ViewDetailModal2 from "./ViewDetailModal2";
import { BASE_URL } from "../config";
import Violation from "../utility/type";

interface props {
  violationData: Violation
}

const Notice2 = ({
  violationData
}: props) => {
  // const [licensePlateNumber, setLicensePlateNumber] = useState("");
  useEffect(() => {
    fetch(`${BASE_URL}/get-license`, {
      method: "GET"
    }).then((response) => response.json())
      .then((data) => {
        // setLicensePlateNumber(data);
      })
  }, [])
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="border border-[#FFAD92] relative p-2 my-1 flex flex-col items-center">
        <div className="flex text-base font-semibold mb-1 justify-between  self-start">
          <p className="mx-2 ">{violationData.parkingChargeNumber}</p>
          <p className="mx-2">${violationData.fee + violationData.delay_fee}</p>
        </div>
        <p className="text-base  self-start">FLL - Failure to Pay</p>
        <p className="text-base  self-start">Issue Date {violationData.issue_date}</p>
        <p className="text-base  self-start">Plate {violationData.plateNumber}</p>
        <div className=" self-start">
          <button
            className="text-base font-medium text-[#FA551D]"
            onClick={openModal}
          >
            View More Information
          </button>
        </div>
        <ViewDetailModal2 isOpen={isModalOpen} onClose={closeModal} violationData={violationData}/>
      </div>
    </>
  );
};

export default Notice2;
