import Preview from '@components/event/Preview'
import { Event } from '@models/event'
import { getEvent } from '@remote/event'
import { GetServerSidePropsContext } from 'next'
import { useQuery } from 'react-query'
import { isAfter, parseISO } from 'date-fns'
import { useAlertContext } from '@contexts/AlertContext'

interface EventPageProps {
  id: string
  initialEvent: Event
}

export default function EventPage({ id, initialEvent }: EventPageProps) {
  const { open } = useAlertContext()
  const { data } = useQuery(['event', id], () => getEvent(id), {
    initialData: initialEvent,
    onSuccess: (event) => {
      const isExitEvent = isAfter(new Date(), parseISO(event.endDate))
      if (isExitEvent) {
        open({
          title: `${event.title} 이벤트가 종료되었어요.`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다.',
          onButtonClick: () => window.history.back(),
        })
      }
    },
  })
  if (data == null) return null
  return <Preview data={data} mode="preview" />
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)
  return {
    props: { id, initialEvent: event },
  }
}
