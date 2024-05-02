import { COLLECTIONS } from '@constants/collection'
import { store } from '@remote/firebase'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextField from '@shared/TextField'
import { collection, doc, setDoc } from 'firebase/firestore'
import { useCallback, useState } from 'react'

export default function EventForm() {
  const [formValues, setFormValues] = useState({
    title: '',
    subTitle: '',
    contents: '',
    buttonLabel: '',
    link: '',
    endDate: '',
  })

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {
        currentTarget: { name, value },
      } = e
      setFormValues((pre) => ({ ...pre, [name]: value }))
    },
    [],
  )
  const handleSubmit = async () => {
    await setDoc(doc(collection(store, COLLECTIONS.EVENT)), formValues)
    alert('이벤트 정보 추가')
  }

  const enabledSubmit = Object.values(formValues).every((value) => value !== '')

  return (
    <Flex direction="column">
      <Flex>
        <Flex direction="column" style={{ flex: 1 }}>
          <TextField
            name="title"
            label="이벤트 제목"
            onChange={handleFormValues}
            value={formValues.title}
          />
          <TextField
            name="subTitle"
            label="이벤트 부제목"
            onChange={handleFormValues}
            value={formValues.subTitle}
          />
          <textarea
            style={{ height: 400 }}
            name="contents"
            onChange={handleFormValues}
            value={formValues.contents}
          />
          <TextField
            name="buttonLabel"
            label="버튼명"
            onChange={handleFormValues}
            value={formValues.buttonLabel}
          />
          <TextField
            name="link"
            label="링크"
            onChange={handleFormValues}
            value={formValues.link}
          />
          <TextField
            name="endDate"
            label="이벤트 종료일"
            onChange={handleFormValues}
            value={formValues.endDate}
          />
        </Flex>
        <Flex style={{ flex: 2 }}>Preview</Flex>
      </Flex>
      <Button disabled={enabledSubmit === false} onClick={handleSubmit}>
        저장하기
      </Button>
    </Flex>
  )
}
