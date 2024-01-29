import { Link } from "react-router-dom"
import { assetsData } from "../../assetsData"
import { acronym } from "../../helper"
import { FaChevronRight } from "react-icons/fa"

const Home = () => {

  const fiveStocks = assetsData.stocks.slice(0, 5)
  const fiveIndices = assetsData.indices.slice(0, 5)
  const fiveCryptoCurrencies = assetsData.crypto_currencies.slice(0, 5)
  const fiveCurrencyCrosses= assetsData.currency_crosses.slice(0, 5)
  return (
      <div className="w-full h-auto mt-10 mb-16">

        <div className="my-3">
          <h2 className="font-Inter text-2xl md:text-3xl font-bold">Stocks</h2>
        </div>
        <div className="my-4 flex flex-wrap gap-4 m-auto">
        {fiveStocks.map((stock) => 
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

          <Link to={"/stocks"} className="bg-white shadow-sm w-[325px] h-24 rounded-md inline-flex items-center justify-center gap-2 font-Inter text-base text-gray-700 font-semibold">
              View All <FaChevronRight />
          </Link>
        </div>


        <div className="mt-14 mb-3">
          <h2 className="font-Inter text-2xl md:text-3xl font-bold">Indices</h2>
        </div>
        <div className="my-4 flex flex-wrap gap-4 m-auto">
        {fiveIndices.map((index) => 
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

          <Link to={"/indices"} className="bg-white shadow-sm w-[325px] h-24 rounded-md inline-flex items-center justify-center gap-2 font-Inter text-base text-gray-700 font-semibold">
              View All <FaChevronRight />
          </Link>
        </div>



        <div className="mt-14 mb-3">
          <h2 className="font-Inter text-2xl md:text-3xl font-bold">Crypto Currencies</h2>
        </div>
        <div className="my-4 flex flex-wrap gap-4 m-auto">
        {fiveCryptoCurrencies.map((crypto) => 
                (<Link to={"/crypto-currencies/"+ crypto.symbol} key={crypto.id}>
                  <div className="bg-white shadow-sm w-[325px] h-max p-4 rounded-md">
                      <div className="inline-flex gap-3">
                          {crypto.image ? <img src={crypto.image} alt="asset image" className="rounded-full border-2 border-slate-100 w-14 h-14 p-0.5"/> : <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">{acronym(crypto.name)}</p>}
                          <div className="block">
                              <h6 className="text-base font-Inter font-semibold">{crypto.name}</h6>
                              <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">{crypto.symbol}</span>
                          </div>
                      </div>
                  </div>
              </Link>)
            )}

          <Link to={"/crypto-currencies"} className="bg-white shadow-sm w-[325px] h-24 rounded-md inline-flex items-center justify-center gap-2 font-Inter text-base text-gray-700 font-semibold">
              View All <FaChevronRight />
          </Link>
        </div>


        <div className="mt-14 mb-3">
          <h2 className="font-Inter text-2xl md:text-3xl font-bold">Currency Crosses</h2>
        </div>
        <div className="my-4 flex flex-wrap gap-4 m-auto">
        {fiveCurrencyCrosses.map((currency_cross) => 
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

          <Link to={"/currency-crosses"} className="bg-white shadow-sm w-[325px] h-24 rounded-md inline-flex items-center justify-center gap-2 font-Inter text-base text-gray-700 font-semibold">
              View All <FaChevronRight />
          </Link>
        </div>


      </div>
  )
}

export default Home