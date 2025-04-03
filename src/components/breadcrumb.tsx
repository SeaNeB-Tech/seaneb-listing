import { Fragment, useMemo } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from './ui/breadcrumb'

interface Props {
  data: { path: string; title: string }[]
}

const BreadcrumbComponent = ({ data }: Props) => {
  const hasData = useMemo(() => data?.length > 0, [data])

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className='text-sm font-medium uppercase' href='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {hasData &&
          data?.map((val, index) => (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              {index < data?.length - 1 ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink className='text-sm font-medium uppercase' href={val?.path}>
                      {val?.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-sm font-medium uppercase'>{val?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbComponent
