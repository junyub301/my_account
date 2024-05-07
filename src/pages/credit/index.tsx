import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import CreditScoreChart from '@shared/CreditScoreChart'
import ListRow from '@shared/ListRow'
import useUser from '@hooks/useUser'
import { useAlertContext } from '@contexts/AlertContext'
import { useCallback } from 'react'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

export default function CreditPage() {
  const isFetchCreditScore = true
  const navigate = useRouter()
  const user = useUser()
  const { open } = useAlertContext()

  const handleCheck = useCallback(() => {
    if (user == null) {
      open({
        title: '로그인이 필요한 기능이예요',
        description: '정확한 신용정보를 확인을 위해 로그인을 먼저 진행해주세요',
        onButtonClick: () => {
          navigate.push('/auth/siginin')
        },
      })
      return
    }

    navigate.push('/credit/check')
  }, [user, navigate, open])

  return isFetchCreditScore ? (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold textAlign="center">
          나의 신용점수
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <Spacing size={80} />
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="추천카드"
              subTitle="나에게 맞는 카드 찾아보기"
            />
          }
          withArrow={true}
          onClick={() => navigate.push('/card')}
        />
      </ul>
      <FixedBottomButton label="신용점수 올리기" onClick={handleCheck} />
    </div>
  ) : (
    <div>
      <Spacing size={40} />
      <Flex align="center" direction="column">
        <Text typography="t4" bold textAlign="center">
          내 신용 점수를 <br /> 조회하고 관리해보세요.
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>
      <ul>
        <ListRow
          contents={
            <ListRow.Texts
              title="정확한 신용평점"
              subTitle="대표 신용 평가 기관의 데이터로 관리해요"
            />
          }
        />
        <ListRow
          contents={
            <ListRow.Texts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회가 가능해요"
            />
          }
        />
      </ul>
      <FixedBottomButton
        label="30초만에 신용점수 조회하기"
        onClick={handleCheck}
      />
    </div>
  )
}