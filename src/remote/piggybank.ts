import { COLLECTIONS } from '@constants/collection'
import { PiggyBank } from '@models/piggybank'
import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from './firebase'

export function createPiggyBank(newPiggyBank: PiggyBank) {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggyBank)
}
