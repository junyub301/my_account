import Text from '@shared/Text'
import useCards from './hooks/useCards'
import ListRow from '@shared/ListRow'
import Badge from '@shared/Badge'
import Button from '@shared/Button'
import Skelton from '@shared/Skeleton'
import { useRouter } from 'next/router'
import withSuspense from '@hooks/withSuspense'

function CardList() {
  const { data } = useCards()
  const navigate = useRouter()
  const isShowMoreButton = data?.items.length ?? 0 > 5
  return (
    <div style={{ padding: '24px 0' }}>
      <Text bold style={{ padding: '12px 24px' }} display="inline-block">
        추천 카드
      </Text>
      <ul>
        {data?.items.slice(0, 5).map((card, index) => (
          <ListRow
            key={card.id}
            contents={
              <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
            }
            right={card.payback != null ? <Badge label={card.payback} /> : null}
            withArrow
            onClick={() => {
              navigate.push(`/card/${card.id}`)
            }}
          />
        ))}
      </ul>
      {isShowMoreButton ? (
        <div style={{ padding: '12px 24px 0 24px' }}>
          <Button
            full
            weak
            size="medium"
            onClick={() => navigate.push('/card')}
          >
            더보기
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export function CardListSkeleton() {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text bold style={{ padding: '12px 24px' }} display="inline-block">
        추천 카드
      </Text>
      {[...new Array(5)].map((_, index) => (
        <ListRow
          key={index}
          contents={
            <ListRow.Texts
              title={<Skelton width={30} height={25} />}
              subTitle={<Skelton width={45} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

export default withSuspense(CardList, { fallback: <CardListSkeleton /> })
