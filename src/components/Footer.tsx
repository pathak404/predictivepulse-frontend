import { Link } from "react-router-dom"

const Footer = () => {
  return (
      <footer className="bg-white rounded-lg my-2 md:my-4">
          <div className="w-full mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 py-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">© 2023 <Link to="/" className="hover:underline">PredictivePulse</Link>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 leading-relaxed">
              {/* <li>
                  <Link to="/about" className="mr-4 hover:underline md:mr-6">About</Link>
              </li> */}
              <li>
                  <Link to="/refund-policy" className="mr-4 hover:underline md:mr-6">Refund Policy</Link>
              </li>
              <li>
                  <Link to="/privacy-policy" className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
              </li>
              <li>
                  <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
              </li>
          </ul>
          </div>
          <p className='mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 text-xs p-2'>* Investing in financial markets involves significant risks, including the potential loss of principal. Past performance is not indicative of future results. Please carefully consider your investment objectives and risk tolerance before participating in share market, crypto, or currency pairs predictions. We do not guarantee the accuracy, completeness, or reliability of any content on this website. Prices, charts, and market data are provided for informational purposes only and may not reflect real-time market conditions.</p>
      </footer>
  )
}

export default Footer