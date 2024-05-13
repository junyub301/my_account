import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType } from 'react'

export default function withAuth<Props = Record<string, never>>(
  WrappedComponent: ComponentType<Props>,
) {
  return function AuthenticatedComponent(props: Props) {
    const { data, status } = useSession()
    const navigate = useRouter()
    if (status !== 'loading' && data == null) {
      navigate.replace('/auth/signin')
      return null
    }

    return <WrappedComponent {...(props as any)} />
  }
}
