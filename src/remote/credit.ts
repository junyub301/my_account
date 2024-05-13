import { COLLECTIONS } from '@constants/collection'
import { Credit } from '@models/credit'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { store } from './firebase'

export async function updateCredit({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) {
  await setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    userId,
    creditScore,
  })
}

export async function getCredit(userId: string) {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId),
  )
  if (snapshot.exists() === false) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Credit),
  }
}
