import React from "react";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import closeBtn from "./assets/Closebtn.svg";
import BasicButtons from "./Button";
import { PDFDocument } from "pdf-lib";
import { BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import Violation from "../utility/type";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  violationData: Violation
};

const ViewDetailModal: React.FC<ModalProps> = ({ isOpen, onClose, violationData }) => {
  const navigate = useNavigate()
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfDoc, setPDFDoc] = useState<PDFDocument | null>(null);
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };
  const handlePayPage = () => {
    navigate('/result/violationpay')
  }

  const fetchData = async () => {
    try {
      const response: AxiosResponse<Blob> = await axios.get(
        `${BASE_URL}/getpdffile`,
        {
          responseType: "blob", // Set the response type to blob
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // const url = "https://pdf-lib.js.org/assets/with_update_sections.pdf";
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );
      const pdfdoc = await PDFDocument.load(existingPdfBytes);
      setPDFDoc(pdfdoc);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData()
      .then(() => {
      })
      .catch((error) => console.error(error));
  }, []);

  // ---------------------Current Time------------
  const currentDateTime = new Date(Date.now());

  const options: Intl.DateTimeFormatOptions = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDateTime: string = currentDateTime.toLocaleString(
    "en-US",
    options
  );

  const data = {
    date: formattedDateTime,
    payment_type: "N/A",
    status: "Unpaid",
    item: "1",
    paying_id: violationData.parkingChargeNumber,
    charge_type: "FLL - Failure to Pay",
    amount_due: `$${violationData.fee + violationData.delay_fee}`,
    amount_paid: "$0.00",
  };

  const handlePrint = async () => {
    if (pdfDoc !== null) {
      const form = pdfDoc.getForm();
      const fieldData = [
        { name: "Date", value: data.date },
        { name: "Payment Type", value: data.payment_type },
        { name: "Status", value: data.status },
        { name: "Parking Item", value: data.item },
        { name: "Parking Charge Number", value: data.paying_id },
        { name: "Parking Charge Type", value: data.charge_type },
        { name: "Amount Due", value: data.amount_due },
        { name: "Amount Paid", value: data.amount_paid },
        { name: "Total Amount Paid", value: data.amount_paid },
        { name: "Total Amount Due", value: data.amount_due },
      ];

      fieldData.forEach(({ name, value }) => {
        const field = form.getTextField(name);
        field.setText(value);
        field.enableReadOnly();
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const blobURL = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobURL;

      downloadLink.download = "yourFileName.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="z-20 absolute top-[-440px] w-auto h-auto mt-[40px] flex items-center justify-center border border-[#091C62] rounded-[10px]">
      <div className="">
        <div className="flex flex-col relative flex-col h-auto w-[600px] max-w-[600px] bg-white rounded-[10px]">
          <div className="bg-[#FA551D] w-full py-3 px-5 text-white text-2xl rounded-t-[10px] font-medium">
            More Information
          </div>
          <button
            onClick={onClose}
            className="absolute right-[30px] top-3 w-[36px]"
          >
            <img className="close-btn" src={closeBtn} alt="close"></img>
          </button>
          <div className="p-4 flex flex-col">
            <div className="flex justify-between border rounded-t-[5px] text-base py-2 px-4">
              <div>Parking Charge Notice Number:</div>
              <div>{violationData.parkingChargeNumber}</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Created:</div>
              <div>{violationData.issue_date}</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Location:</div>
              <div>??</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>License Plate:</div>
              <div>{violationData.plateNumber}</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>VIN:</div>
              <div>??</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Parking Charge Notice:</div>
              <div>FLL-Failure to Pay</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Vehicle Color:</div>
              <div>??</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Vehicle Make:</div>
              <div>??</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Vehicle Model:</div>
              <div>??</div>
            </div>
            <div className="flex justify-between border-x border-b text-base py-2 px-4">
              <div>Officer:</div>
              <div>??</div>
            </div>
          </div>
          <div className="border-x w-full h-auto px-4">
            <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-[10px] tracking-tight">
              Notes
            </div>
            <div className="flex flex-col border border-[#grey] w-full h-auto px-4 py-2 rounded-b-[10px] tracking-tight">
              1. TO PAY OR APPEAL Go to the website below. Unpaid parking
              notices may result in your vehicle being booted or towed at your
              risk & expense at any Professinal Parking Management affiliated
              locations. Any dispute must be subnitted WITHIN 15days of the date
              of this notice.
            </div>
          </div>
          <div className="border-x w-full h-auto px-4 py-4">
            <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-[10px] tracking-tight">
              <div className="flex justify-between">
                <p>Total Parking Charge Notice</p>
                <p>${violationData.fee + violationData.delay_fee}</p>
              </div>
            </div>
            <div className="flex flex-col w-full h-auto tracking-tight">
              <div className="flex justify-between border-x border-b border-[#grey] px-4 py-2">
                <p>Total Parking Charge Notice</p>
                <p>${violationData.fee}</p>
              </div>
              <div className="flex justify-between border-x border-b border-[#grey] px-4 py-2 rounded-b-[10px]">
                <p>{new Date().toLocaleDateString()} Late Amount</p>
                <p>${violationData.delay_fee}</p>
              </div>
            </div>
          </div>
          <div className="border-x w-full h-auto px-4 pb-2">
            <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-[10px] tracking-tight">
              Notes
            </div>
            <div className="flex flex-col border border-[#grey] bg-[#FFF5F3] w-full h-auto px-4 py-2 rounded-b-[10px] tracking-tight">
              You cannot appeal any more. Past the appeal date.
            </div>
          </div>
          <div className="border-x w-full h-auto px-4 py-3">
            <div className="text-[#ffffff] text-lg font-medium px-4 py-2 bg-[#091C62] rounded-t-[10px] tracking-tight">
              Photos:
            </div>
            <div className="flex flex-wrap border justify-center border-[#grey] w-full h-auto px-4 py-4 rounded-b-[10px] tracking-tight">
              <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src={`${process.env.REACT_APP_CAMERA_IMAGE}${violationData.image1}`}
                  className="h-full w-full object-cover"
                  alt="camera"
                ></img>
              </div>
              <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src={`${process.env.REACT_APP_CAMERA_IMAGE}${violationData.image2}`}
                  className="h-full w-full object-cover"
                  alt="camera"
                ></img>
              </div>
              {/* <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src="/3.jpg"
                  className="h-full w-full object-cover"
                  alt="camera"
                ></img>
              </div>
              <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src="/4.jpg"
                  className="h-full w-full object-cover"
                  alt="camera"
                ></img>
              </div>
              <div className="w-[45%] aspect-h-1 aspect-w-1 p-2 border rounded-[10px] border-[#grey]">
                <img
                  src="/5.jpg"
                  className="h-full w-full object-cover"
                  alt="camera"
                ></img>
              </div> */}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="mb-4 mx-4" onClick={onClose}>
              <BasicButtons
                text="Close"
                width="100px"
                paddingX="20px"
                paddingY="8px"
                bgColor="#FA551D"
                hoverColor="#FFAD92"
                fontSize="16px"
                active = {true}
              />
            </div>
            <div className="mb-4 mx-4" onClick={handlePrint}>
              <BasicButtons
                text="Print"
                width="100px"
                paddingX="40px"
                paddingY="8px"
                bgColor="#FA551D"
                hoverColor="#FFAD92"
                fontSize="16px"
                active = {true}
              />
            </div>
            <div className="mb-4 mx-4" onClick={handlePayPage}>
              <BasicButtons
                text="Pay"
                width="100px"
                paddingX="40px"
                paddingY="8px"
                bgColor="#FA551D"
                hoverColor="#FFAD92"
                fontSize="16px"
                active = {true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailModal;
