import React from 'react'
import { assetsData } from '../../assetsData'
import { Link } from 'react-router-dom'

const CurrencyCrosses: React.FC = () => {
  return (
        <div className="flex flex-wrap gap-5 bg-slate-50 h-full m-auto">
            {assetsData.currency_crosses.map((currency_cross) => 
                (<Link to={"/currency-crosses/"+ currency_cross.symbol} key={currency_cross.id}>
                    <div className="bg-white shadow-sm w-[325px] h-max p-4 rounded-md">
                        <div className="inline-flex gap-3">
                            <div className="flex -space-x-3 me-5">
                                <img src={currency_cross.base_image} alt={currency_cross.base_name} className="rounded-full border-2 border-slate-200 w-14 h-14"/>
                                <img src={currency_cross.second_image} alt={currency_cross.second_name} className="rounded-full border-2 border-slate-200 w-14 h-14"/>
                            </div>
                            <div className="block">
                                <h6 className="text-base font-Inter font-semibold">{currency_cross.base_name + "/" + currency_cross.second_name}</h6>
                                <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">{currency_cross.name}</span>
                            </div>
                        </div>
                    </div>
                </Link>)
            )}
        </div>
  )
}

export default CurrencyCrosses