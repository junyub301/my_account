import { Event } from '@models/event'
import { getEvent } from '@remote/event'
import { GetServerSidePropsContext } from 'next'

interface EventPageProps {
  id: string
  initialEvent: Event
}

export default function EventPage({ id, initialEvent }: EventPageProps) {
  console.log('🚀 ~ EventPage ~ id:', id)
  console.log('🚀 ~ EventPage ~ initialEvent:', initialEvent)
  return <div></div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query
  const event = await getEvent(id as string)
  console.log('🚀 ~ getServerSideProps ~ event:', event)
  return {
    props: { id, initialEvent: event },
  }
}
