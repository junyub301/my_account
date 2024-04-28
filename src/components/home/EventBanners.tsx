import useEventBanners from './hooks/useEventBanners'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import withSuspense from '@shared/hocs/withSuspense'
import { css } from '@emotion/react'
import Skelton from '@shared/Skeleton'
import Image from 'next/image'

function EventBanners() {
  const { data } = useEventBanners()
  console.log('🚀 ~ EventBanners ~ data:', data)

  return (
    <div>
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

export default withSuspense(EventBanners, {
  fallback: <Skelton width="100%" height={100} style={{ borderRadius: 8 }} />,
})
