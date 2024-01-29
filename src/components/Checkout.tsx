import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import InputGroup from "./InputGroup";
import FormButton from "./FormButton";
import { AiFillCheckCircle } from "react-icons/ai";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import successLottieJson from "../assets/success-lottie.json";
import { AuthContext } from "../AuthContext";
import { AuthContextType, CreateOrderApiResponseType, ToastContextType } from "../types";
import { ToastContext } from "./toast/ToastContext";
import { fetchFromServer } from "../helper";


declare global {
  interface Window {
    Instamojo: any;
  }
}

const Checkout = () => {
  useEffect(()=> {
    // Load Instamojo script
    const script = document.createElement('script');
    script.src = 'https://js.instamojo.com/v1/checkout.js';
    script.onload = () => {
      window.Instamojo.configure({
        handlers: {
          onSuccess: onSuccessHandler,
          onFailure: onErrorHandler,
        },
      });
    };
    document.head.appendChild(script);
  }, [])

  const pricingFeatures: string[] = [
    "Top 27 Indian Stocks Included",
    "Top 10 Indian Indices Included",
    "Top 12 Crypto Currency Included",
    "Top 20 Currency Pairs Included",
    "Support through Whatsapp",
  ];

  const {nonce} = useContext(AuthContext) as AuthContextType
  const { addToast } = useContext(ToastContext) as ToastContextType
  const [loading, setLoading] = useState<boolean>(false)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const [isActiveModal, setIsActiveModal] = useState<boolean>(false)
  const order_id = useRef<string>("")


  const tenDigitOnly = (target: HTMLInputElement) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(target.value)) {
      target.value = target.value.slice(0, 10);
    }
  };



  const onSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement)
    const data: Record<string, string> = {}
    formData.forEach((val,key) => {
      data[key] = val as string
    })

    try{
      const res = await fetchFromServer<CreateOrderApiResponseType>('/create-order', 'POST', data)
      if(res && res.data){
        order_id.current = res.data.order_id
        window.Instamojo.open(res.data.longurl);
      }
    }catch(error){
      addToast("error", (error as Error).message)
    }finally {
      setLoading(false)
    }
  }

  const onSuccessHandler = async ({paymentId}: {paymentId: any}) => {
    window.Instamojo.close();
    try{
      if(await fetchFromServer('/payment', 'POST', {payment_id: paymentId, order_id: order_id.current})){
        setIsActiveModal(true)
        lottieRef.current?.play()
      }
    }catch(error){
      addToast("error", (error as Error).message)
    }
  }

  const onErrorHandler = () => {
    window.Instamojo.close();
    addToast("error", "Payment failed")
  }


  return (
    <>
      {/* modal */}
      <div className={`fixed top-0 left-0 w-screen min-h-screen bg-white/20 z-50 items-center justify-center p-2 ${isActiveModal ? 'flex' : 'hidden'}`}>
        <div className="relative bg-white w-full max-w-[600px] h-auto min-h-[300px] shadow-lg rounded-md mx-auto flex flex-col items-center justify-center p-5 md:p-10">
          <Lottie
            lottieRef={lottieRef}
            animationData={successLottieJson}
            className="w-3/5"
            loop={false}
            autoplay={false}
          />
          <h2 className="font-Inter text-3xl font-bold my-3">Thank You</h2>
          <p className="font-Poppins text-base my-3">
            The transaction has been completed successfully. We have sent you a
            mail on the given emaill address, kindly check for login details.{" "}
          </p>

          <button className="px-6 py-2 mb-3 bg-gray-800 rounded-3xl text-white inline-flex gap-3 items-center hover:bg-gray-700 transition-colors duration-300" onClick={() => setIsActiveModal(false)}>
            Close
          </button>
        </div>
      </div>

      {/* checkout section */}
      <div
        className="mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 py-8 lg:py-16 block overflow-hidden"
        id="buy"
      >
        <SectionHeader
          title="Pricing"
          heading="A simple pricing that suites everyone"
          paragraph="Our advanced AI algorithms analyze market trends to provide accurate price predictions, empowering you to make informed decisions."
        />

        <div className="max-w-[500px] md:max-w-none mx-auto flex flex-col md:flex-row lg:items-center justify-between gap-10 xl:gap-20 mt-14">
          <div className="basis-1/2 border-2 border-black/70 rounded-lg p-7 md:p-10 bg-slate-50">
            <h3 className="text-3xl leading-snug text-gray-800 font-bold">
              Get access to all features at one place
            </h3>

            <ul className="list-inside space-y-2 my-4 text-base font-medium text-gray-800">
              {pricingFeatures.map((feature: string, index: number) => (
                <li className="flex items-center" key={index}>
                  <AiFillCheckCircle className="w-5 h-5 mr-2 text-green-500 dark:text-green-400 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-base mb-2">One Time Payment</p>
            <h2 className="text-5xl text-gray-800 font-semibold">₹ 999</h2>
          </div>

          <div className="basis-1/2">
            <form
              className="flex flex-col justify-center mt-4 xl:mt-0"
              onSubmit={onSubmit}
            >
              <InputGroup
                name="name"
                label="Full Name"
                placeholder="Joe Done"
              />
              <InputGroup
                type="email"
                name="email"
                label="Email Address"
                placeholder="joe@done.com"
              />
              <InputGroup
                type="number"
                name="phone"
                label="Phone Number (+91)"
                placeholder="1234567890"
                handler={(e) => tenDigitOnly(e.target as HTMLInputElement)}
              />
              <InputGroup
                type="hidden"
                name="nonce"
                value={nonce}
              />
              <FormButton loading={loading} arrow>
                Let&apos;s Start
              </FormButton>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
