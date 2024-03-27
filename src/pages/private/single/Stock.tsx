import { useParams } from 'react-router-dom'
import { assetsData } from '../../../assetsData'
import Overview from '../../../components/private/Overview'

const Stock = () => {
  const { symbol } = useParams<{ symbol: string}>();
  const assetData = assetsData.stocks.filter((value) => value.symbol === symbol)[0]

  return (
    symbol && assetData.YFsymbol && <>
        <Overview full_name={assetData.full_name} name={assetData.name} symbol={assetData.symbol} YFsymbol={assetData.YFsymbol} image={assetData.image} />
      </>
  )
}

export default Stock