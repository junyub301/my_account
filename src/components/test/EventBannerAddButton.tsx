import { EVENT_BANNERS } from '@/mock/banner'
import Button from '@components/shared/Button'
import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import { collection, doc, writeBatch } from 'firebase/firestore'

export default function EventBannerAddButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(store)
    EVENT_BANNERS.forEach((banner) => {
      const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER))
      batch.set(bannerRef, banner)
    })
    await batch.commit()
    alert('배터 데이터가 추가되었습니다.')
  }
  return <Button onClick={handleButtonClick}>이벤트 배너 데이터 추가</Button>
}
