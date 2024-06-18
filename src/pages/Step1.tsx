import React, { useEffect, useState } from "react";
import Notice from "../components/Notice";
import { useAppSelector } from "../redux/hooks";
import Violation from "../utility/type";
interface props {
  active: boolean;
  setActive: (_: boolean) => void;
}

const Step1 = ({ active, setActive }: props) => {
  const [sameViolationList, setSameViolationList] = useState<Violation[] | undefined>([]);

  // const payAmount = useAppSelector((state) => state.pay.payAmount_redux);
  const currentViolation: Violation = useAppSelector(
    (state) => state.currentViolation
  );
  const violationList: Violation[] = useAppSelector(
    (state) => state.pay.violationList_redux
  );
  // const payAmount_string = String(payAmount);

  useEffect(() => {
    if (currentViolation.parkingChargeNumber !== "") {
      const filteredSameList: Violation[] | undefined = violationList.filter(
        (element: Violation) => element.plateNumber === currentViolation.plateNumber
      );
        setSameViolationList(filteredSameList);
    }
  }, [currentViolation, violationList]);

  return (
    <>
      <div className="py-4 px-4 ">
        <div className="text-[#ffffff] text-base font-medium px-4 py-2 bg-[#091C62] rounded-[10px]">
          Search / Step 1
        </div>
        <div className="text-xl px-4 font-lg font-medium tracking-tight mt-4 mb-2">
          Select Parking Charge Notice to Pay
        </div>
        <p className="text-base tracking-tight mx-1">
          The following Parking Charge Notice(s) were found for the information
          entered. Please verify the Parking Charge Notices you would like to
          pay and select options
        </p>
        <p className="mt-4 mx-1 mb-2 text-base">Parking Charge Notice(s)</p>
        <div className="px-1">
          {sameViolationList !== undefined && sameViolationList.map((element: Violation) => (
            <Notice
              key={element.parkingChargeNumber}
              active={active}
              setActive={setActive}
              violationData={element}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Step1;
