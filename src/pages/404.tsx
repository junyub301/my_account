import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Image from 'next/image'
import React from 'react'

export default function NotFoundPage() {
  return (
    <div>
      <Spacing size={100} />
      <Flex align="center" direction="column">
        <Image
          width={80}
          height={80}
          src="https://cdn3.iconfinder.com/data/icons/network-and-communications-10/32/network_Error_lost_no_page_not_found-64.png"
          alt=""
        />
        <Spacing size={20} />
        <Text>찾으시는 페이지가 없습니다.</Text>
        <Spacing size={100} />
        <Button
          onClick={() => {
            window.history.back()
          }}
        >
          돌아가기
        </Button>
      </Flex>
    </div>
  )
}
