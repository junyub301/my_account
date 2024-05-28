import useDebounce from '@hooks/useDebounce'
import { getSearchCards } from '@remote/card'
import Badge from '@shared/Badge'
import Input from '@shared/Input'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Top from '@shared/Top'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

export default function CardSearchPage() {
  const [keyword, setKeyword] = useState<string>('')
  const debouncedKeyword = useDebounce(keyword)
  const navigate = useRouter()
  const ref = useRef<HTMLInputElement>(null)

  const { data } = useQuery(
    ['cards', debouncedKeyword],
    () => getSearchCards(debouncedKeyword),
    {
      enabled: debouncedKeyword !== '',
    },
  )

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const handleKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
    },
    [],
  )

  return (
    <div>
      <Top title="추천카드" subTitle="회워님을 위해 준비했어요" />
      <div style={{ padding: '0 24px 12px 24px' }}>
        <Input value={keyword} ref={ref} onChange={handleKeyword} />
      </div>
      {keyword !== '' && data?.length === 0 ? (
        <div style={{ padding: 24 }}>
          <Text>찾으시는 카드가 없습니다.</Text>
        </div>
      ) : (
        <ul>
          {data?.map((card, index) => (
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
      )}
    </div>
  )
}
