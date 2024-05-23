import { COLLECTIONS } from '@constants/collection'
import { PiggyBank } from '@models/piggybank'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { store } from './firebase'

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}

export async function getPiggyBank(userId: string) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'),
      limit(1),
    ),
  )

  if (snapshot.docs.length === 0) {
    return null
  }

  const piggyBank = snapshot.docs[0].data()
  return {
    id: snapshot.docs[0].id,
    ...(piggyBank as PiggyBank),
    startDate: piggyBank.startDate.toDate(),
    endDate: piggyBank.endDate.toDate(),
  }
}
