import React from 'react'
import { assetsData } from '../../assetsData'
import { acronym } from '../../helper'
import { Link } from 'react-router-dom'

const Indices: React.FC = () => {
  return (
        <div className="flex flex-wrap gap-5 bg-slate-50 h-full m-auto">
            {assetsData.indices.map((index) => 
                (<Link to={"/indices/"+ index.symbol} key={index.id}>
                    <div className="bg-white shadow-sm w-[325px] h-max p-4 rounded-md">
                        <div className="inline-flex gap-3">
                            {index.image ? <img src={index.image} alt="asset image" className="rounded-full border-2 border-slate-100 w-14 h-14 p-0.5"/> : <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">{acronym(index.name)}</p>}
                            <div className="block">
                                <h6 className="text-base font-Inter font-semibold">{index.name}</h6>
                                <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">{index.symbol}</span>
                            </div>
                        </div>
                    </div>
                </Link>)
            )}
        </div>
  )
}

export default Indices