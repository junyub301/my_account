import { getAccount } from '@remote/account'
import React from 'react'
import { useQuery } from 'react-query'
import useUser from './useUser'

export default function useAccount() {
  const user = useUser()
  return useQuery(['account', user?.id], () => getAccount(user?.id as string), {
    enabled: user != null,
  })
}
