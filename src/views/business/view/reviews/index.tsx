import { TestimonialItem } from '@/types/business'
import { Review } from './single'
import { generatePublicImageUserLink } from '@/lib/utils'

import dayjs from 'dayjs'

const BusinessReviews = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  return (
    <div className='mt-8 space-y-4'>
      <h2 className='text-2xl'>
        Reviews <span className='text-lg'>{`(${testimonials?.length})`}</span>
      </h2>

      {testimonials?.map((item, index) => (
        <Review
          key={index}
          name={item?.user?.first_name}
          content={item?.feedback}
          date={dayjs(item?.created_at).format('MMMM YYYY')}
          isVerified={false}
          avatarSrc={generatePublicImageUserLink('india', item?.users_u_id, item?.user?.image)}
          rating={Number(item?.rating || 0)}
        />
      ))}
    </div>
  )
}

export default BusinessReviews
