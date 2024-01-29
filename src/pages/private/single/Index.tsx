import { useParams } from 'react-router-dom'
import Chart from '../../../components/private/Chart'
import { assetsData } from '../../../assetsData'
import Predictor from '../../../components/private/Predictor'
import NoChart from '../../../components/private/NoChart'

const Index = () => {
  const { symbol } = useParams<{ symbol: string}>();
  const assetData = assetsData.indices.filter((value) => value.symbol === symbol)[0]

  return (
    symbol && <>
        { assetData.TVsymbol ? <Chart TVsymbol={assetData.TVsymbol}/> : <NoChart />}
        <Predictor id={assetData.id} name={assetData.TVsymbol ? null : assetData.name} />
      </>
  )
}

export default Index