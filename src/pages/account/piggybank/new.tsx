import { useAlertContext } from '@contexts/AlertContext'
import useUser from '@hooks/useUser'
import withAuth from '@hooks/withAuth'
import { PiggyBank } from '@models/piggybank'
import { createPiggyBank } from '@remote/piggybank'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)
function NewPiggyBankPage() {
  const { open } = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const user = useUser()
  const { mutate, isLoading } = useMutation(
    (newPiggyBank: PiggyBank) => createPiggyBank(newPiggyBank),
    {
      onSuccess: () => {
        open({
          title: '새로운 저금통을 만들었어요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        open({
          title: '저금통을 만들지 못했어요',
          description: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const handleFormValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value, name },
      } = e
      setFormValues((pre) => ({ ...pre, [name]: value }))
    },
    [],
  )

  const handleSubmit = () => {
    const newPiggyBank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as PiggyBank
    mutate(newPiggyBank)
  }

  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])
  return (
    <div>
      <Flex direction="column">
        <TextField
          name="name"
          label="저금통 이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextField
          name="endDate"
          type="date"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <TextField
          name="goalAmount"
          type="number"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedBottomButton
        disabled={isLoading}
        label="저금통 생성하기"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default withAuth(NewPiggyBankPage)
