import { FeaturesType } from "../types"
import SectionHeader from "./SectionHeader"
import { FaChartLine, FaBolt } from "react-icons/fa6"
import { FaHistory } from "react-icons/fa"


const Features = () => {
  const features: FeaturesType[] = [
    {
        icon: <FaHistory className="w-full h-full" />,
        name: "Historical Data",
        paragraph: "Dive into the depths of market trends and patterns with our Historical Data feature. Analyze past performances, identify key indicators, and gain valuable insights to refine your investment strategy."
    },
    {
        icon: <FaBolt className="w-full h-full" />,
        name: "Real Time Predection",
        paragraph: "Experience the thrill of real-time decision-making with our Real-Time Prediction feature. Stay ahead of the curve as our advanced algorithms process live data, providing you with up-to-the-minute predictions."
    },
    {
        icon: <FaChartLine className="w-full h-full" />,
        name: "With Chart",
        paragraph: "Visualize market trends like never before with our Interactive Charts feature. Our user-friendly charts provide a comprehensive view of data, allowing you to spot trends, anomalies, and potential opportunities effortlessly."
    },
  ]
  return (
    <div className="mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 pt-8 pb-20 lg:pt-12 block overflow-hidden" id="features"
  >
    <SectionHeader title="Features" heading="Designed for traders like you"
      paragraph="Here are a few reasons why you should choose PredictivePulse"
    />

        <div className="mx-auto flex flex-wrap items-center justify-center gap-5 xl:gap-10 mt-14">
            {features.map((feature, index) => 
            <div className="basis-full sm:basis-1/4 bg-white shadow-xl rounded-md py-4" key={index} >
                <div className="flex flex-col items-start p-4 gap-2">
                    <div className="w-16 h-16 p-3 bg-indigo-600 text-white rounded-md">
                        {feature.icon}
                    </div>
                    <h4 className="font-Inter text-lg font-semibold">{feature.name}</h4>
                    <p className="font-Poppins text-sm">{feature.paragraph}</p>
                </div>
            </div>

            )}
        </div>
    </div>
  )
}

export default Features