import React, { useState } from "react";
import BasicButtons from "./Button";
import ViewDetailModal from "./ViewDetailModal";
import Violation from "../utility/type";
import { useAppDispatch } from "../redux/hooks";
import { setSelectedViolation } from "../redux/slice/violationSelectedTopayReducer";


interface props {
  active: boolean;
  setActive: (_: boolean) => void;
  violationData: Violation
}

const Notice = ({
  active,
  setActive,
  violationData
}: props) => {
  const dispatch = useAppDispatch()
  const [buttonText, setButtonText] = useState("Pay");
  // const licensePlateNumber = useAppSelector(
  //   (state) => state.pay.licensePlateNumber
  // );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const payNow = () => {
    dispatch(setSelectedViolation(violationData));
    setActive(!active);
    setButtonText((prevText) => {
      return prevText === "Pay" ? "Unselect" : "Pay";
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center border border-[#FFAD92] relative p-2 my-1">
        <div className="absolute right-[12px] top-[12px]">
          <div className="w-316px justify-center" onClick={payNow}>
            <BasicButtons
              text={buttonText}
              width="auto"
              paddingX="40px"
              paddingY="8px"
              bgColor="#FA551D"
              hoverColor="#FFAD92"
              fontSize="16px"
              active = {true}
            />
          </div>
        </div>
        <div className="flex flex-col self-start pl-2">
          <div className="flex self-start text-base font-semibold mb-1">
            <p className="mx-2">{violationData.parkingChargeNumber}</p>
            <p className="mx-2">${violationData.fee + violationData.delay_fee}</p>
          </div>
          <p className="text-base ">FLL - Failure to Pay</p>
          <p className="text-base ">Issue Date {violationData.issue_date}</p>
          <p className="text-base ">Plate {violationData.plateNumber}</p>
          <div>
            <button
              className="text-base font-medium text-[#FA551D]"
              onClick={openModal}
            >
              View More Information
            </button>
          </div>
        </div>
        <ViewDetailModal isOpen={isModalOpen} onClose={closeModal} violationData={violationData}/>
      </div>
    </>
  );
};

export default Notice;
