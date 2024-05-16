import useAccount from '@hooks/useAccount'
import { getEventBanners } from '@remote/banner'
import { useQuery } from 'react-query'

export default function useEventBanners() {
  const { data: account } = useAccount()
  return useQuery(
    ['event-banners'],
    () =>
      getEventBanners({
        hasAccount: account != null && account.status === 'DONE',
      }),
    { suspense: true },
  )
}
