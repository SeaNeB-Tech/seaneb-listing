const LocationMap = ({ lat, long }: { lat: string; long: string }) => {
  const mapSrc = `https://www.google.com/maps?q=${lat},${long}&z=15&output=embed`

  return (
    <div className='mt-8 w-full'>
      <iframe
        src={mapSrc}
        width='100%'
        height='450'
        allowFullScreen={true}
        className='rounded-md border-none shadow-xl'
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
      />
    </div>
  )
}

export default LocationMap
