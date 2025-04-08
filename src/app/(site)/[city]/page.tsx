import { capitalizeFirstLetterOfEachWord } from '@/utils'

import BannerComponent from '@/components/layout/banner'
import CityComponent from '@/views/city'

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const getParams = await params

  const decodedCity = decodeURIComponent(getParams?.city || '')

  // const areas = await axios.get(
  //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=areas+in+${getParams?.city}&key=${process.env.GOOGLE_API_KEY}`
  // )

  return (
    <>
      <BannerComponent
        data={[{ path: `/${decodedCity}`, title: decodedCity }]}
        title={`${capitalizeFirstLetterOfEachWord(decodedCity)}`}
      />
      <CityComponent city={decodedCity} />
    </>
  )
}

export default CityPage
