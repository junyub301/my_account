import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/collection'
import { Transaction } from '@models/transaction'
import { store } from './firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}
