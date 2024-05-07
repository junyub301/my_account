import Button from '@shared/Button'
import CreditScoreChart from '@shared/CreditScoreChart'
import Flex from '@shared/Flex'
import Skelton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Link from 'next/link'

function CreditScore() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Text bold>
            나의 신용도를 증명하고
            <br /> 점수를 올리세요
          </Text>
          <Spacing size={8} />
          <Link href="/credit">
            <Button>내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart score={500} width={80} height={80} />
      </Flex>
    </div>
  )
}

export function CreditScoreSkeleton() {
  return (
    <div style={{ padding: 24 }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column">
          <Skelton width={155} height={59} />
          <Spacing size={8} />
          <Skelton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  )
}

export default CreditScore
