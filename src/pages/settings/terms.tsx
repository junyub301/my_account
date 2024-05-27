import { 약관목록 } from '@constants/account'
import useUser from '@hooks/useUser'
import { User } from '@models/user'
import { getTerms, updateTerms } from '@remote/account'
import Button from '@shared/Button'
import ListRow from '@shared/ListRow'
import Text from '@shared/Text'
import Top from '@shared/Top'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useMemo } from 'react'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query'

export default function TermsPage() {
  const user = useUser()
  const client = useQueryClient()
  const { data } = useQuery(
    ['terms', user?.id],
    () => getTerms(user?.id as string),
    {
      enabled: user != null,
    },
  )
  const { mutate, isLoading } = useMutation(
    (termIds: string[]) => updateTerms(user?.id as string, termIds),
    {
      onSuccess: () => {
        client.invalidateQueries(['terms', user?.id])
      },
      onError: () => {},
    },
  )

  const agreeTermsList = useMemo(() => {
    if (data == null) return null

    const allAgreeTerms = 약관목록.filter(({ id }) => data.termIds.includes(id))

    const requiredTerms = allAgreeTerms.filter(
      ({ mandatory }) => mandatory === true,
    )
    const choiceTerms = allAgreeTerms.filter(
      ({ mandatory }) => mandatory === false,
    )
    return { requiredTerms, choiceTerms }
  }, [data])

  const handleDisagree = (selectedTermId: string) => {
    const updatedTermIds = data?.termIds.filter(
      (termId) => termId !== selectedTermId,
    )
    if (updatedTermIds != null) {
      mutate(updatedTermIds)
    }
  }

  return (
    <div>
      <Top title="약관" subTitle="약관 리스트 및 철회" />
      {agreeTermsList == null ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {agreeTermsList.requiredTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[필수] ${term.title}`} subTitle="" />
              }
            />
          ))}
          {agreeTermsList.choiceTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.Texts title={`[선택] ${term.title}`} subTitle="" />
              }
              right={
                <Button
                  disabled={isLoading}
                  onClick={() => handleDisagree(term.id)}
                >
                  철회
                </Button>
              }
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)

  if (session != null && session.user != null) {
    const client = new QueryClient()

    await client.prefetchQuery(['terms', (session.user as User).id], () =>
      getTerms((session.user as User).id),
    )

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }
  return {
    props: {},
  }
}
