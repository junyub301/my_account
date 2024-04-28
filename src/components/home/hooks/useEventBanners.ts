import { getEventBanners } from '@remote/banner'
import { useQuery } from 'react-query'

export default function useEventBanners() {
  return useQuery(
    ['event-banners'],
    () => getEventBanners({ hasAccount: false }),
    { suspense: true },
  )
}
