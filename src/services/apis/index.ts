import { endpoint } from './endpoint'
import { callApi } from '@/utils/api-utils'
import { ApiResponse } from '@/types/api-response'
import { CategoryListItem } from './types'

// ** Category List
export const fetchCategoryList = async (): Promise<{ data: CategoryListItem[] }> => {
  const response = await callApi({ uriEndPoint: endpoint.categoryList })
    .then(res => res)
    .catch((err: ApiResponse) => {
      return err
    })

  return response
}
