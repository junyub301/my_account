import { COLLECTIONS } from '@constants/collection'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { store } from './firebase'
import { EventBanner } from '@models/banner'

export async function getEventBanners({ hasAccount }: { hasAccount: boolean }) {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )
  const snapshot = await getDocs(eventBannerQuery)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}
