import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import ListRow from '@shared/ListRow'
import { collection, getDocs } from 'firebase/firestore'
import React from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
}

export default function FAQPage({ faqs }: { faqs: FAQ[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <ListRow
          key={faq.id}
          contents={
            <ListRow.Texts title={faq.question} subTitle={faq.answer} />
          }
        />
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const snapshot = await getDocs(collection(store, COLLECTIONS.FAQ))

  const faqs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  return {
    props: { faqs },
  }
}
