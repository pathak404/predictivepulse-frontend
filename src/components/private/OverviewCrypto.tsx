import { FC, useContext, useEffect, useState } from "react"
import { acronym, fetchFromServer } from "../../helper"
import PredictorChart from "./PredictorChart"
import { ApiResponse, HistoricalDataItem, PredictionDataItem, ToastContextType } from "../../types"
import { ToastContext } from "../toast/ToastContext"
import Loading from "../Loading"
import { BiSolidError } from "react-icons/bi"

// for crypto
const OverviewCrypto:FC<{ name: string, symbol: string, YFsymbol: string, image: string|null }> = ({ name, symbol, YFsymbol, image }) => {

    const [latestData, setLatestData] = useState<HistoricalDataItem[]|undefined>()
    const [lastDayData, setLastDayData] = useState<HistoricalDataItem|undefined>()
    const [isLastDayData, setIsLastDayData] = useState<boolean>(true)
    const [prediction, setPrediction] = useState<PredictionDataItem|undefined>()
    const { addToast } = useContext(ToastContext) as ToastContextType
    const [loading, setLoading] = useState<boolean>(true)


    const isPreviousDayData = () => {
      let today = new Date();
      let yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if(lastDayData){
        let lastDayDataDate = new Date(lastDayData.Date);
        let isPreviousDay = today.getFullYear() === lastDayDataDate.getFullYear() &&
                            today.getMonth() === lastDayDataDate.getMonth() &&
                            today.getDate() - 1 === lastDayDataDate.getDate();
        setIsLastDayData(isPreviousDay);
      }
    }

    useEffect(()=>{
      isPreviousDayData();
    }, [lastDayData])


    useEffect(() => {
      getLatestData();
    }, [])
  
    const getLatestData = async () => {
      try {
        const [latestData, prediction] = await Promise.all([
          fetchFromServer<ApiResponse>(
            "/asset/data/" + YFsymbol,
            true,
          ),
          fetchFromServer<ApiResponse>(
            "/asset/prediction/" + YFsymbol,
            true,
          ),
        ]);
        
        const responseData = latestData?.data;
        if (Array.isArray(responseData)) {
          setLatestData(responseData as HistoricalDataItem[]);
          setLastDayData(responseData[responseData.length - 1]);
        }
        setPrediction(prediction?.data as PredictionDataItem);
      } catch (err: any) {
        addToast("error", err.message);
      } finally {
        setLoading(false);
      }
    }

    
    return (
        !loading && prediction && latestData && lastDayData ?
        <div className="overflow-hidden">
            <div className="pt-2 md:pt-5 mb-10">
                <div className="inline-flex gap-3 items-center">
                    {image ? <img src={image} alt="asset image" className="rounded-full border-2 border-gray-200 w-16 h-16 md:h-[80px] md:w-[80px] p-0.5"/> : <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">{acronym(name)}</p>}
                    <h6 className="text-xl md:text-4xl font-Inter font-semibold">{name} ({symbol})</h6>
                </div>
                <p className="text-base font-Poppins font-medium mt-2">👉 The prediction is based on five years of data. </p>
                <p className="text-base font-Poppins font-medium mt-2">💸 The price mentioned below is in USD. </p>
            </div>
            <h1 className="text-3xl font-Poppins font-medium mb-7">Prediction</h1>
            <div className="block md:flex max-w-[700px] mb-7 md:gap-5">
            { !isLastDayData ? 
                <div className="basis-1/2 space-y-2 mb-7 p-3 md:mb-0 bg-red-500 rounded-md">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <BiSolidError className="text-white w-8 h-8" />
                    <p className="text-sm font-Poppins font-medium mt-2 text-white text-center"> Previous day data is not currently available. This could be due to a holiday or it not being provided by the data provider.</p>
                  </div>
                </div> :
                <div className="basis-1/2 space-y-2 mb-7 md:mb-0">
                    <h1 className="text-xl font-Poppins font-medium mb-2">Last ({new Date(lastDayData.Date).getDate()} {new Date(lastDayData.Date).toLocaleString('default', { month: 'long' })}) Summary</h1>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Open: {lastDayData.Open.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">High: {lastDayData.High.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Low: {lastDayData.Low.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Close (Last Price): {lastDayData.Close.toFixed(3)}</h2>
                </div> }
                <div className="basis-1/2 space-y-2">
                    <h1 className="text-xl font-Poppins font-medium mb-2">Today's Prediction</h1>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Open: {prediction.Open.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">High: {prediction.High.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Low: {prediction.Low.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Close (Predicted Price): {prediction.Close.toFixed(3)}</h2>
                </div>
            </div>
            <PredictorChart prediction={prediction} latestData={latestData} />
        </div> :
        <Loading />
    )
}

export default OverviewCrypto