import { FC, useContext, useEffect, useState } from "react"
import { acronym, fetchFromServer } from "../../helper"
import PredictorChart from "./PredictorChart"
import { ApiResponse, HistoricalDataItem, PredictionDataItem, ToastContextType } from "../../types"
import { ToastContext } from "../toast/ToastContext"
import Loading from "../Loading"

// for stock and indices
const Overview:FC<{full_name?: string, name: string, symbol: string, YFsymbol: string, image: string|null, }> = ({full_name, name, symbol, YFsymbol, image,}) => {

    const [latestData, setLatestData] = useState<HistoricalDataItem[]|undefined>()
    const [lastDayData, setLastDayData] = useState<HistoricalDataItem|undefined>()
    const [prediction, setPrediction] = useState<PredictionDataItem|undefined>()
    const { addToast } = useContext(ToastContext) as ToastContextType
    const [loading, setLoading] = useState<boolean>(true)

    const sourceTypeMapper = {
        ".BO": "BSE",
        ".NS": "NSE"
    }

    const sourceType: string = YFsymbol.includes(".BO") ? sourceTypeMapper[".BO"] : sourceTypeMapper[".NS"]
  
    useEffect(() => {
      getLatestData();
    }, [])
  
    const getLatestData = async () => {
      try {
        const [latestData, prediction] = await Promise.all([
          fetchFromServer<ApiResponse>(
            "/latest-data/" + YFsymbol
          ),
          fetchFromServer<ApiResponse>(
            "/predictAI/" + YFsymbol
          ),
        ]);
        
        const responseData = latestData?.data?.data;
        if (Array.isArray(responseData)) {
          setLatestData(responseData as HistoricalDataItem[]);
          setLastDayData(responseData[responseData.length - 1]);
        }
        setPrediction(prediction?.data?.data as PredictionDataItem);
      } catch (err: any) {
        addToast("error", err.message);
      } finally {
        setLoading(false);
      }
    }

    
    return (
        !loading && prediction && latestData && lastDayData ?
        <div>
            <div className="pt-2 md:pt-5 mb-10">
                <div className="inline-flex gap-3 items-center">
                    {image ? <img src={image} alt="asset image" className="rounded-full border-2 border-gray-200 w-16 h-16 md:h-[80px] md:w-[80px] p-0.5"/> : <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">{acronym(name)}</p>}
                    <h6 className="text-xl md:text-4xl font-Inter font-semibold">{full_name || name} ({symbol})</h6>
                </div>
                <p className="text-base font-Poppins font-medium mt-2">👉 The prediction is based on five years of data taken from {sourceType}. </p>
                <p className="text-base font-Poppins font-medium mt-2">💸 The price mentioned below is in INR (Indian currency ₹). </p>
            </div>
            <h1 className="text-3xl font-Poppins font-medium mb-7">Prediction</h1>
            <div className="block md:flex max-w-[700px] mb-7">
                <div className="basis-1/2 space-y-2 mb-7 md:mb-0">
                    <h1 className="text-xl font-Poppins font-medium mb-2">Last ({new Date(lastDayData.Date).getDate()} {new Date(lastDayData.Date).toLocaleString('default', { month: 'long' })}) Summary</h1>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Open: {lastDayData.Open.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">High: {lastDayData.High.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Low: {lastDayData.Low.toFixed(3)}</h2>
                    <h2 className="text-slate-700 text-base font-Poppins font-medium">Close (Last Price): {lastDayData.Close.toFixed(3)}</h2>
                </div>
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

export default Overview