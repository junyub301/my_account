import ListRow from '@shared/ListRow'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

export default function PiggyBankRow() {
  const navigate = useRouter()
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
