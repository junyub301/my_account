import { colors } from '@/styles/colorPalette'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const opacity = keyframes`
    0% {
        opacity:1;
    }

    50% {
        opacity:0.4;
    }
    100%{
        opacity:1;
    }
`

const Skelton = styled.div<{ width: number | string; height: number | string }>(
  ({ width, height }) => ({
    width,
    height,
    backgroundColor: colors.gray100,
    animation: `${opacity} 2s ease-in-out 0.5s infinite`,
  }),
)

export default Skelton
