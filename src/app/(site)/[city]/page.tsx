import BannerComponent from '@/components/layout/banner'
import CityComponent from '@/views/city'

const CityPage = async ({ params }: { params: Promise<{ city: string }> }) => {
  const getParams = await params

  return (
    <>
      <BannerComponent data={[{ path: `/${getParams?.city}`, title: getParams.city }]} title='City' />
      <CityComponent city={getParams?.city} />
    </>
  )
}

export default CityPage
