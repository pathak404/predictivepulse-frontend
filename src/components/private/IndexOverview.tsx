import { acronym } from "../../helper";
import { IndiceType } from "../../types";
const IndexOverview: React.FC<{ index: IndiceType }> = ({ index }) => {
  return (
    <div className="p-4 max-w-[590px] w-full h-28 flex items-center content-center gap-4 rounded-md bg-white text-black">
      <div className="inline-flex gap-3">
        {index.image ? (
          <img
            src={index.image}
            alt="asset image"
            className="rounded-full border-2 border-slate-100 w-14 h-14 p-0.5"
          />
        ) : (
          <p className="rounded-full bg-slate-100 p-4 text-xl font-bold font-Poppins">
            {acronym(index.name)}
          </p>
        )}
        <div className="block">
          <h6 className="text-base font-Inter font-semibold">{index.name}</h6>
          <span className="bg-slate-50 text-xs font-Poppins font-bold px-2 py-1 rounded-md">
            {index.symbol}
          </span>
        </div>
      </div>
    </div>
  )
}

export default IndexOverview;
