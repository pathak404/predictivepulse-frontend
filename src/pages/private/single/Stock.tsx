import { useParams } from 'react-router-dom'
import Chart from '../../../components/private/Chart'
import { assetsData } from '../../../assetsData'
import Predictor from '../../../components/private/Predictor'

const Stock = () => {
  const { symbol } = useParams<{ symbol: string}>();
  const assetData = assetsData.stocks.filter((value) => value.symbol === symbol)[0]

  return (
    symbol && assetData.TVsymbol && <>
        <Chart TVsymbol={assetData.TVsymbol}/>
        <Predictor id={assetData.id} name={null}/>
      </>
  )
}

export default Stock