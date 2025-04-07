const LocationMap = () => {
  return (
    <div className='mt-8 w-full'>
      <iframe
        src='https://www.google.com/maps?&q=place_id:ChIJ7aVxnOTHwjsRz5oF4_4DsgY&output=embed'
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
