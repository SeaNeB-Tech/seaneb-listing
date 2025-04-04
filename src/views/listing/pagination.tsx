'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface Props {
  value: number // current page (1-indexed)
  onChange: (page: number) => void
  total: number // total items
  pageSize: number // items per page
  siblingCount?: number // optional: pages to show around current
}

export function PaginationComponent({ value, onChange, total, pageSize, siblingCount = 1 }: Props) {
  const totalPages = Math.ceil(total / pageSize)

  const handlePageChange = (page: number) => {
    if (page !== value && page >= 1 && page <= totalPages) {
      onChange(page)
    }
  }

  const handleNextPage = () => {
    handlePageChange(value + 1)
  }

  const handlePreviousPage = () => {
    handlePageChange(value - 1)
  }

  const generatePageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const startPage = Math.max(2, value - siblingCount)
    const endPage = Math.min(totalPages - 1, value + siblingCount)

    pages.push(1)

    if (startPage > 2) {
      pages.push('ellipsis')
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (endPage < totalPages - 1) {
      pages.push('ellipsis')
    }

    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = generatePageNumbers()

  return (
    <Pagination>
      <PaginationContent>
        {value > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={value === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href='#'
                isActive={page === value}
                onClick={e => {
                  e.preventDefault()
                  handlePageChange(page)
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {value < totalPages && (
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={value === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
