import success from "../components/assets/Success.gif";
import { useEffect, useState } from 'react';
import Step3 from "./Step3";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import axios from "axios";



function Completion(props) {
  const [messageBody, setMessageBody] = useState('');
  const { stripePromise } = props;
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [parkName, setParkName] = useState('')
  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [amount, setAmount] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [receiptEmail, setReceiptEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleHome = () => {
    navigate('/')
  }


  useEffect(() => {
    const localStorageVar = localStorage.getItem('violationData');
    const parsedVar = JSON.parse(localStorageVar)
    setLicensePlateNumber(parsedVar.plateNumber);
    setParkName(parsedVar.lot)


    axios.get(`${BASE_URL}/payments_log`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(res => {
        const data = res.data.data
        console.log("data===>", data);
        setAmount(data.amount / 100);

        const timestamp = data.created * 1000;
        const date = new Date(timestamp); // Convert timestamp to Date object
        // const formattedDate = date.toI(); // Get the date in a readable format
        const options = { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleString('en-US', options); // Get date and time in EDT format
        setCreateDate(formattedDate)

        setReceiptEmail(data.receipt_email)
        setStatus(data.status)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }, [])

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
    });
  }, [stripePromise]);



  return (
    <>
      <div className=" w-screen h-auto bg-[#EFF3FF]">
        <div onClick={handleHome} className="absolute top-[10px] left-[40px]">
          <img
            src="https://i.ibb.co/HBQk2wd/logo.png"
            alt="logo"
            className="h-[80px] w-auto "
          ></img>
        </div>
        <div className="flex overflow-hidden bg-[#FFF5F3] h-[100px] justify-center items-center text-[#091C62] border-b-2 border-[#FA551D]">
          <a
            className="active text-center py-8 px-6 text-2xl hover:bg-[#FA551D] hover:text-white hover:duration-300"
            href="/home"
          >
            Home
          </a>
          <a
            className="active text-center py-8 px-6 text-2xl hover:bg-[#FA551D] hover:text-white hover:duration-300"
            href="/about"
          >
            About
          </a>
          <a
            className="active text-center py-8 px-6 text-2xl hover:bg-[#FA551D] hover:text-white hover:duration-300"
            href="/contact"
          >
            Contact
          </a>
        </div>

        <div className="flex justify-center py-20">
          <div className="flex flex-col h-auto w-[720px] max-w-[720px] bg-white rounded-[10px]">
            <div className="bg-[#FA551D] w-full py-3 px-5 text-white text-2xl rounded-t-[10px] font-medium">
              Step2: Payment Details
            </div>
            <div className="border-x border-[#FA551D] w-full h-auto">
              <Step3 active={active} setActive={setActive} />
            </div>
            <div className="p-4 border-x border-[#FA551D] mb-0">

              <div className="flex flex-col border bg-[#ffbfa1] bg-opacity-50 w-full rounded-[10px] h-auto">
                <div className="flex">
                  <div className="flex justify-center ml-8 items-center relative">
                    <img className="w-[150px] border h-auto" src={success} alt='resultImg'></img>
                  </div>
                  <div className="flex flex-col items-center  justify-center mb-4">
                    <p className="text-[#091C62] text-opacity-80 text-4xl font-bold my-4">Payment {status}!</p>

                    <p className="text-black text-base font-semibold">Your Parking Charge Notice has been paid successfully</p>
                    {<p className="text-red-500">{messageBody}</p>}
                  </div>
                </div>

                <div className="flex justify-center border rounded-[10px] border-[#091C62] bg-[white] mb-4 mx-10">
                  <div className="flex flex-col p-2">
                    <div className="flex float-left">
                      <p className='text-xl text-[brown] font-bold mt-4'>Lot : </p>
                      <p className='text-xl text-[#091C62] font-bold mt-4 ml-2'> {parkName}</p>
                    </div>
                    <div className="flex float-left">
                      <p className='text-xl text-[brown] font-bold mt-4'>Plate Number : </p>
                      <p className='text-xl text-[#091C62] font-bold mt-4 ml-2'> {licensePlateNumber}</p>
                    </div>
                    <div className="flex float-left">
                      <p className='text-xl text-[brown] font-bold mt-4'>Amount : </p>
                      <p className='text-xl text-[#091C62] font-bold mt-4 ml-2'> ${amount}</p>
                    </div>
                    <div className="flex float-left">
                      <p className='text-xl text-[brown] font-bold mt-4'>Receipt Email : </p>
                      <p className='text-xl text-[#091C62] font-bold mt-4 ml-2'> {receiptEmail}</p>
                    </div>
                    <div className="flex">
                      <p className='text-xl text-[brown] font-bold my-4'>Payment Date (EDT) : </p>
                      <p className='text-xl text-[#091C62] font-bold mt-4 ml-2'> {createDate}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div>

            </div>
            <div className="flex bg-[#FA551D] w-full h-auto rounded-b-[10px] items-center">
              <div className="  py-3 pl-5 text-white text-lg  font-medium">
                Copyright 2024
              </div>
              <a
                href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/privacy.pdf"
                className="text-base text-white hover:text-[blue] px-4"
              >
                Privacy Policy
              </a>
              <a
                href="https://pkg-shared-files.s3.amazonaws.com/brands/etico/docs/terms.pdf"
                className="text-base text-white hover:text-[blue]"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Completion;
