import Account from '@components/home/Account'
import { CreditScoreSkeleton } from '@components/home/CreditScore'
import { BannerSkeleton } from '@components/home/EventBanners'
import Skelton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => <BannerSkeleton />,
})
const CreditScore = dynamic(() => import('@components/home/CreditScore'), {
  ssr: false,
  loading: () => <CreditScoreSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
    </>
  )
}
