import { FC, useContext, useEffect, useState } from "react"
import { fetchFromServer } from "../../helper"
import PredictorChart from "./PredictorChart"
import { ApiResponse, HistoricalDataItem, PredictionDataItem, ToastContextType } from "../../types"
import { ToastContext } from "../toast/ToastContext"
import Loading from "../Loading"

// for currency
const OverviewCurrency:FC<{name: string, base_name: string, base_image: string, second_name: string, second_image: string, YFsymbol: string }> = ({ name, base_name, base_image , second_name, second_image, YFsymbol}) => {

    const [latestData, setLatestData] = useState<HistoricalDataItem[]|undefined>()
    const [lastDayData, setLastDayData] = useState<HistoricalDataItem|undefined>()
    const [prediction, setPrediction] = useState<PredictionDataItem|undefined>()
    const { addToast } = useContext(ToastContext) as ToastContextType
    const [loading, setLoading] = useState<boolean>(true)

  
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
        <div className="overflow-hidden">
            <div className="pt-2 md:pt-5 mb-10">
                <div className="inline-flex gap-3">
                    <div className="flex -space-x-3 me-5">
                        <img src={base_image} alt={base_name} className="rounded-full border-2 border-slate-200 w-14 h-14"/>
                        <img src={second_image} alt={second_name} className="rounded-full border-2 border-slate-200 w-14 h-14"/>
                    </div>
                    <div className="block">
                        <h6 className="text-base font-Inter font-semibold">{base_name + "/" + second_name}</h6>
                        <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">{name}</span>
                    </div>
                </div>
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

export default OverviewCurrency