import { getCards } from '@remote/card'
import Badge from '@shared/Badge'
import Input from '@shared/Input'
import ListRow from '@shared/ListRow'
import Top from '@shared/Top'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { QueryClient, dehydrate, useInfiniteQuery } from 'react-query'

export default function CardListPage() {
  const navigate = useRouter()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(['cards'], ({ pageParam }) => getCards(pageParam), {
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) return
    fetchNextPage()
  }, [hasNextPage, fetchNextPage, isFetching])

  const cards = data?.pages.map(({ items }) => items).flat()
  return (
    <div>
      <Top title="추천카드" subTitle="회워님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input onFocus={() => navigate.push('/card/search')} />
      </div>
      <InfiniteScroll
        dataLength={cards?.length || 0}
        hasMore={hasNextPage}
        loader={<ListRow.Skeleton />}
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          {cards?.map((card, index) => (
            <ListRow
              key={card.id}
              contents={
                <ListRow.Texts title={`${index + 1}위`} subTitle={card.name} />
              }
              right={
                card.payback != null ? <Badge label={card.payback} /> : null
              }
              withArrow
              onClick={() => {
                navigate.push(`/card/${card.id}`)
              }}
            />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export async function getServerSideProps() {
  const client = new QueryClient()

  await client.prefetchInfiniteQuery(['cards'], () => getCards())

  return {
    props: {
      dehydrateState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}
