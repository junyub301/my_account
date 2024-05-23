import useUser from '@hooks/useUser'
import withSuspense from '@hooks/withSuspense'
import { getPiggyBank } from '@remote/piggybank'
import Flex from '@shared/Flex'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import addDelimiter from '@utils/addDelimiter'
import { differenceInDays } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

function PiggyBankRow() {
  const navigate = useRouter()
  const user = useUser()
  const { data } = useQuery(
    ['piggy_bank', user?.id],
    () => getPiggyBank(user?.id as string),
    {
      suspense: true,
    },
  )

  if (data == null) {
    return (
      <div>
        <ul>
          <ListRow
            left={
              <Image
                src="https://cdn4.iconfinder.com/data/icons/PLASTICXP/accounting/png/64/deposit.png"
                width={40}
                height={40}
                alt=""
              />
            }
            contents={
              <ListRow.Texts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요"
              />
            }
            withArrow
            onClick={() => {
              navigate.push('/account/piggybank/new')
            }}
          />
        </ul>
      </div>
    )
  }

  const { balance, endDate, goalAmount } = data
  const dDay = differenceInDays(endDate, new Date())

  return (
    <div>
      <ul>
        <ListRow
          left={
            <Image
              src="https://cdn4.iconfinder.com/data/icons/PLASTICXP/accounting/png/64/deposit.png"
              width={40}
              height={40}
              alt=""
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold>
                D-{dDay}
              </Text>
              <Text>{addDelimiter(goalAmount - balance)}원 남았어요</Text>
            </Flex>
          }
          withArrow
          onClick={() => {}}
        />
      </ul>
    </div>
  )
}

export default withSuspense(PiggyBankRow, { fallback: <div>로딩중 ...</div> })
