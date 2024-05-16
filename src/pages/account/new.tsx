import Form from '@components/account/Form'
import Terms from '@components/account/Terms'
import useUser from '@hooks/useUser'
import withAuth from '@hooks/withAuth'
import { Account } from '@models/account'
import { User } from '@models/user'
import { createAccount, getAccount, getTerms, setTerms } from '@remote/account'
import FullPageLoader from '@shared/FullPageLoader'
import ProgressBar from '@shared/ProgressBar'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

const LAST_STEP = 2

function AccountNew({ initalStep }: { initalStep: number }) {
  const [step, setStep] = useState<number>(initalStep)
  const user = useUser()
  const navigate = useRouter()

  const handleTerms = async (termIds: string[]) => {
    await setTerms({ userId: user?.id as string, termIds })
    setStep((pre) => pre + 1)
  }

  const handleForm = async (formValues: any) => {
    const newAccount = {
      ...formValues,
      accountNumber: Date.now(),
      balance: 0,
      status: 'READY',
      userId: user?.id as string,
    } as Account

    await createAccount(newAccount)
    setStep((pre) => pre + 1)
  }

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 && <Terms onNext={handleTerms} />}
      {step === 1 && <Form onNext={handleForm} />}
      {step === 2 && (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었습니다." />
          <FixedBottomButton label="확인" onClick={() => navigate.push('/')} />
        </>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const aggredTerms = await getTerms((session?.user as User).id)
  if (aggredTerms == null) {
    return {
      props: {
        initalStep: 0,
      },
    }
  }
  const account = await getAccount((session?.user as User).id)

  if (account == null) {
    return {
      props: {
        initalStep: 1,
      },
    }
  }

  return {
    props: {
      initalStep: 2,
    },
  }
}

export default withAuth(AccountNew)
