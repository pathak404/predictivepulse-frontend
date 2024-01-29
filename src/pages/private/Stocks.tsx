import React from 'react'
import { assetsData } from '../../assetsData'
import { acronym } from '../../helper'
import { Link } from 'react-router-dom'

const Stocks: React.FC = () => {
  return (
        <div className="flex flex-wrap gap-5 bg-slate-50 h-full m-auto">
            {assetsData.stocks.map((stock) => 
                (<Link to={"/stocks/"+ stock.symbol} key={stock.id}>
                    <div className="bg-white shadow-sm w-[325px] h-max p-4 rounded-md">
                        <div className="inline-flex gap-3">
                            {stock.image ? <img src={stock.image} alt="asset image" className="rounded-full border-2 border-slate-100 w-14 h-14 p-0.5"/> : <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">{acronym(stock.name)}</p>}
                            <div className="block">
                                <h6 className="text-base font-Inter font-semibold">{stock.name}</h6>
                                <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">{stock.symbol}</span>
                            </div>
                        </div>
                    </div>
                </Link>)
            )}
        </div>
  )
}

export default Stocks