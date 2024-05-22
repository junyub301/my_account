import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { COLLECTIONS } from '@constants/collection'
import { Transaction, TransactionFilterType } from '@models/transaction'
import { store } from './firebase'

export function createTransaction(newTransaction: Transaction) {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

export async function getTransactions({
  pageParam,
  userId,
  filter,
}: {
  userId: string
  pageParam?: QuerySnapshot<Transaction>
  filter?: TransactionFilterType
}) {
  const transactionQuery = generateQuery({ userId, pageParam, filter })

  const transactionSnapshot = await getDocs(transactionQuery)
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]
  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return { items, lastVisible }
}

function generateQuery({
  filter = 'all',
  pageParam,
  userId,
}: {
  userId: string
  pageParam?: QuerySnapshot<Transaction>
  filter?: TransactionFilterType
}) {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )
  if (filter !== 'all') {
    if (pageParam == null) {
      return query(baseQuery, where('type', '==', filter))
    }
    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    if (pageParam == null) {
      return baseQuery
    }
    return query(baseQuery, startAfter(pageParam))
  }
}
