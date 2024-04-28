import { css } from '@emotion/react'
import emotionStyled from '@emotion/styled'
import Skelton from '@shared/Skeleton'
import dynamic from 'next/dynamic'

const EventBanners = dynamic(() => import('@components/home/EventBanners'), {
  ssr: false,
  loading: () => (
    <Skelton width="100%" height={100} style={{ borderRadius: 8 }} />
  ),
})

export default function Home() {
  return (
    <Container>
      <EventBanners />
      <div>Hello</div>
    </Container>
  )
}

const Container = emotionStyled.div`
  background-color: pink;
`

const bold = css`
  font-weight: bold;
`
