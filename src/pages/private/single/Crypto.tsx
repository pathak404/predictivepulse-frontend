import { useParams } from 'react-router-dom'
import { assetsData } from '../../../assetsData'
import OverviewCrypto from '../../../components/private/OverviewCrypto'

const Crypto = () => {
  const { symbol } = useParams<{ symbol: string}>();
  const assetData = assetsData.crypto_currencies.filter((value) => value.symbol === symbol)[0]

  return (
    symbol && assetData.YFsymbol && <>
        <OverviewCrypto name={assetData.name} symbol={assetData.symbol} YFsymbol={assetData.YFsymbol} image={assetData.image} />
      </>
  )
}

export default Crypto