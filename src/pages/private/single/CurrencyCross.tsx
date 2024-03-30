import { useParams } from 'react-router-dom'
import { assetsData } from '../../../assetsData'
import OverviewCurrency from '../../../components/private/OverviewCurrency';

const CurrencyCross = () => {
    const { symbol } = useParams<{ symbol: string}>();
    const assetData = assetsData.currency_crosses.filter((value) => value.symbol === symbol)[0]
  return (
    symbol && assetData.YFsymbol && <>
        <OverviewCurrency 
          name={assetData.name}
          base_name={assetData.base_name}
          base_image={assetData.base_image}
          second_name={assetData.second_name}
          second_image={assetData.second_image}
          YFsymbol={assetData.YFsymbol}
        />
      </>
  )
}

export default CurrencyCross