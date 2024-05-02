import CardListAddButton from '@components/test/CardListAddButton'
import EventBannerAddButton from '@components/test/EventBannerAddButton'
import EventForm from '@components/test/EventForm'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

export default function test() {
  return (
    <Flex direction="column">
      <Text bold>배너</Text>
      <EventBannerAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text bold>카드</Text>
      <CardListAddButton />
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Text>이벤트</Text>
      <EventForm />
    </Flex>
  )
}
