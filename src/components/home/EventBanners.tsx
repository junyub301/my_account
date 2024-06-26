import useEventBanners from './hooks/useEventBanners'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import Skelton from '@shared/Skeleton'
import Image from 'next/image'
import withSuspense from '@hooks/withSuspense'
import ErrorBoundary from '@shared/ErrorBoundary'

function EventBanners() {
  const { data } = useEventBanners()

  return (
    <div style={{ padding: 24 }}>
      <Swiper spaceBetween={8}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.link}>
              <Flex
                css={bannerStyles}
                justify="space-between"
                style={{ backgroundColor: banner.backgroundColor }}
              >
                <Flex direction="column">
                  <Text bold>{banner.title}</Text>
                  <Text typography="t6">{banner.subTitle}</Text>
                </Flex>
                <Image src={banner.iconUrl} width={40} height={40} alt="" />
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

function WrapErrorBoundary() {
  return (
    <ErrorBoundary
      fallbackComponent={<div>이벤트 배너에 문제가 생겼어요.</div>}
    >
      <EventBanners />
    </ErrorBoundary>
  )
}

export function BannerSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Skelton width="100%" height={100} style={{ borderRadius: 8 }} />
    </div>
  )
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
})
