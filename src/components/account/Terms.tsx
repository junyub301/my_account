import React, { useState } from 'react'
import { 약관목록 } from '@constants/account'
import { Term } from '@models/account'
import Agreement from '@shared/Agreement'
import dynamic from 'next/dynamic'
const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

export default function Terms({
  onNext,
}: {
  onNext: (termIds: string[]) => void
}) {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateIntitalValues(약관목록),
  )

  const handleAgreement = (id: string, checked: boolean) => {
    setTermsAgreements((pre) => {
      return pre.map((term) => (term.id === id ? { ...term, checked } : term))
    })
  }

  const handleAllAgreement = (
    _: React.MouseEvent<HTMLElement>,
    checked: boolean,
  ) => {
    setTermsAgreements((pre) => pre.map((term) => ({ ...term, checked })))
  }

  const allAgreement = termsAgreements.every((val) => val.checked)
  const allMandatoryIsAgreement = termsAgreements
    .filter((val) => val.mandatory)
    .every((val) => val.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={allAgreement} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => (
          <Agreement.Description
            key={term.id}
            link={term.link}
            checked={term.checked}
            onChange={(_, checked) => {
              handleAgreement(term.id, checked)
            }}
          >
            {term.mandatory ? '[필수]' : '[선택]'} {term.title}
          </Agreement.Description>
        ))}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!allMandatoryIsAgreement}
        onClick={() => {
          onNext(
            termsAgreements.filter((val) => val.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

function generateIntitalValues(temrs: Term[]) {
  return temrs.map((term) => ({ ...term, checked: false }))
}
