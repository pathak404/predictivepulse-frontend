import { useParams } from 'react-router-dom'
import { assetsData } from '../../../assetsData'
import Overview from '../../../components/private/Overview'

const Index = () => {
  const { symbol } = useParams<{ symbol: string}>();
  const assetData = assetsData.indices.filter((value) => value.symbol === symbol)[0]

  return (
    symbol && assetData.YFsymbol && <>
        <Overview name={assetData.name} symbol={assetData.symbol} YFsymbol={assetData.YFsymbol} image={assetData.image} />
      </>
  )
}

export default Index