import { useContext, useEffect, useState } from "react"
import { HiArrowDown, HiArrowUp } from "react-icons/hi"
import { IoWarningOutline } from "react-icons/io5"
import { PredictionMapperType, TabType, ToastContextType } from "../../types"
import { ToastContext } from "../toast/ToastContext"


const Predictor: React.FC<{id: number, name: string|null}> = ({ id, name }) => {
  const { addToast } = useContext(ToastContext) as ToastContextType

  const [activeTab, setActiveTab] = useState<number>(1)
  const [predection, setPredection] = useState<"buy"|"sell"|"strong_buy"|"strong_sell"|"not_available"|null>(null)

  useEffect(() => {
    getPredectionData("1m", id)
  }, [])



  const getPredectionData = (timeframe: string, id: number, useAlternateAPI: boolean = false) => {
    const mainURL = import.meta.env.VITE_PREDECTION_URL1 + id + "/" + timeframe
    const alternateURL = import.meta.env.VITE_PREDECTION_URL2 + id + "/" + timeframe

    const mainRequest = new Request(mainURL, {
      method: 'GET',
      cache: 'no-cache',
      referrerPolicy: "no-referrer",
    })

    const alternateRequest = new Request(alternateURL, {
      method: 'GET',
      cache: 'no-cache',
      mode: 'same-origin',
      credentials: 'same-origin'
    })

    const request = useAlternateAPI ? alternateRequest : mainRequest

    fetch(request).then((res) => {
      if(!res.ok){
        getPredectionData(timeframe, id, !useAlternateAPI)
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json()
    })
    .then((res) => {
      let predectionText: "buy"|"sell"|"strong_buy"|"strong_sell"|"not_available" = "not_available"
      if(res.summary.length < 2 || res.summary === "neutral"){
        let totalBuy = res.indicators.summary.buy + res.movingAverages.summary.buy
        let totalSell = res.indicators.summary.sell + res.movingAverages.summary.sell
        predectionText = totalBuy > totalSell ? "buy" : totalBuy === 0 && totalSell === 0 ? "not_available" : "sell"
      }else{
        predectionText = res.summary
      }
      setPredection(predectionText)
    })
    .catch((error) => addToast('error', error))
  }




  const tabs: TabType[] = [
    {
      number: 1,
      name: "1Min",
      timeframe: "1m"
    },
    {
      number: 2,
      name: "5Min",
      timeframe: "5m"
    },
    {
      number: 3,
      name: "15Min",
      timeframe: "15m"
    },
    {
      number: 4,
      name: "30Min",
      timeframe: "30m"
    },
    {
      number: 5,
      name: "1Hr",
      timeframe: "1h"
    },
    {
      number: 6,
      name: "5Hr",
      timeframe: "5h"
    },
    {
      number: 7,
      name: "1D",
      timeframe: "1d"
    },
    {
      number: 8,
      name: "1W",
      timeframe: "1w"
    },
    {
      number: 9,
      name: "1Mo",
      timeframe: "1mo"
    },
  ]


  const predectionMapper: PredictionMapperType = {
    buy:{
      name: "Buy / Long",
      icon: <HiArrowUp className="animate-bounce w-14 h-14" />,
      classes: 'bg-lime-400 text-white'
    },
    strong_buy:{
      name: "Buy / Long",
      icon: <HiArrowUp className="animate-bounce w-14 h-14" />,
      classes: 'bg-lime-600 text-white'
    },
    sell:{
      name: "Sell / Short",
      icon: <HiArrowDown className="animate-bounce w-14 h-14" />,
      classes: 'bg-rose-400 text-white'
    },
    strong_sell:{
      name: "Sell / Short",
      icon: <HiArrowDown className="animate-bounce w-14 h-14" />,
      classes: 'bg-rose-600 text-white'
    },
    not_available: {
      name: "Predection not available for this asset.",
      icon: <IoWarningOutline className="w-14 h-14 text-rose-600" />,
      classes: 'bg-white text-black'
    }
  }

  const changeTab = (tab: TabType, id: number): void => {
    setActiveTab(tab.number)
    setPredection(null)
    getPredectionData(tab.timeframe, id)
  }

  return (
    <div className="w-full h-auto flex flex-col gap-7 my-5 bg-white py-10 px-4 rounded-md">
      <h2 className="font-Inter text-3xl font-bold">Price Predection {name ? 'for '+name : ''}</h2>
      <div className="flex flex-wrap items-center gap-4">
        {tabs.map((tab) =>
        <div className={`p-2 font-Poppins rounded-md min-w-[50px] text-center text-sm cursor-pointer ${activeTab === tab.number ? 'bg-black/80 text-white' : 'bg-slate-200'}`} key={tab.number} onClick={() => changeTab(tab, id)}>
          {tab.name}
        </div>)}
      </div>

      {predection ? <div className={`p-4 max-w-[590px] w-full h-28 inline-flex items-center content-center gap-4 rounded-md ${(predectionMapper[predection]).classes}`}>
          {(predectionMapper[predection]).icon}
          <p className="font-Poppins text-2xl font-bold">{(predectionMapper[predection]).name}</p>
      </div> :
      <div className="bg-white max-w-[590px] w-full">
        <div className="p-4 w-full h-28 inline-flex items-center content-center gap-4 rounded-md animate-pulse">
          <div className="w-14 h-14 bg-slate-200 rounded-sm"></div>
          <div className="m-3 w-full h-8 bg-slate-200 rounded-sm"></div>
        </div> 
      </div>}
    </div>
  )
}

export default Predictor