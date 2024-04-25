import { css } from '@emotion/react'
import emotionStyled from '@emotion/styled'

export default function Home() {
  return (
    <Container>
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
