'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Axios from 'axios'

type VerifyStatus = 'loading' | 'success' | 'error'

interface VerifyResponse {
  title?: string
  message?: string
  subtitle?: string
  success?: boolean
}

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<VerifyStatus>('loading')
  const [response, setResponse] = useState<VerifyResponse | null>(null)

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get('token')
      const email = searchParams.get('email')
      const purposeStr = searchParams.get('purpose')

      if (!token || !email || !purposeStr) {
        setStatus('error')
        setResponse({
          title: 'Invalid Link',
          message: 'The verification link is missing required parameters.'
        })

        return
      }

      try {
        const purpose = parseInt(purposeStr, 10)

        const res = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/email/verify-token`, {
          token,
          email,
          purpose
        })

        const data = res?.data

        if (data?.success) {
          setStatus('success')
          setResponse(data)
        } else {
          setStatus('error')
          setResponse({
            title: 'Verification Failed',
            message: data?.message || 'The token is invalid or has expired.'
          })
        }
      } catch (err: any) {
        setStatus('error')
        setResponse({
          title: 'Verification Failed',
          message: err?.response?.data?.message || err?.message || 'Something went wrong.'
        })
      }
    }

    verifyToken()
  }, [searchParams])

  if (status === 'loading') {
    return (
      <div className='verify-email-wrapper'>
        <div className='verify-email-card'>
          <div className='verify-email-spinner' />
          <h2 className='verify-email-title'>Verifying Email...</h2>
          <p className='verify-email-subtitle'>Please wait while we verify your secure link.</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className='verify-email-wrapper'>
        <div className='verify-email-card'>
          <div className='verify-email-icon verify-email-icon--success'>
            <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h2 className='verify-email-title'>{response?.title || 'Email Verified!'}</h2>
          <p className='verify-email-subtitle'>{response?.message || 'Your email address has been successfully verified.'}</p>
          {response?.subtitle && <p className='verify-email-extra'>{response.subtitle}</p>}
          <p className='verify-email-badge verify-email-badge--success'>You can now close this tab.</p>
        </div>
      </div>
    )
  }

  // Error state
  return (
    <div className='verify-email-wrapper'>
      <div className='verify-email-card'>
        <div className='verify-email-icon verify-email-icon--error'>
          <svg width='32' height='32' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2.5}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
        <h2 className='verify-email-title'>{response?.title || 'Verification Failed'}</h2>
        <p className='verify-email-subtitle'>{response?.message || 'The verification link is invalid or has expired.'}</p>
        <p className='verify-email-hint'>Please try requesting a new link.</p>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <>
      <style>{`
        .verify-email-wrapper {
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, #f0f4ff 0%, #fef3f2 50%, #f0fdf4 100%);
        }

        .verify-email-card {
          background: #ffffff;
          border-radius: 1.25rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04);
          border: 1px solid #e5e7eb;
          padding: 2.5rem 2rem;
          max-width: 28rem;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: verify-email-fadeIn 0.5s ease-out;
        }

        @keyframes verify-email-fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Spinner */
        .verify-email-spinner {
          width: 3rem;
          height: 3rem;
          border: 4px solid var(--marketing-primary, #085294);
          border-top-color: transparent;
          border-radius: 50%;
          animation: verify-email-spin 0.8s linear infinite;
          margin-bottom: 1.25rem;
        }

        @keyframes verify-email-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Icons */
        .verify-email-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .verify-email-icon--success {
          background-color: #ecfdf5;
          color: #059669;
        }

        .verify-email-icon--error {
          background-color: #fef2f2;
          color: #dc2626;
        }

        /* Typography */
        .verify-email-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 0.5rem;
          line-height: 1.3;
        }

        .verify-email-subtitle {
          font-size: 0.9375rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.5;
        }

        .verify-email-extra {
          font-size: 0.8125rem;
          color: #9ca3af;
          margin: 0.25rem 0 0;
        }

        .verify-email-badge {
          margin-top: 1.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          display: inline-block;
        }

        .verify-email-badge--success {
          color: var(--marketing-primary, #085294);
          background-color: rgba(8, 82, 148, 0.08);
        }

        .verify-email-hint {
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          margin-top: 1.75rem;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .verify-email-card {
            padding: 2rem 1.5rem;
          }

          .verify-email-title {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <Suspense
        fallback={
          <div className='verify-email-wrapper'>
            <div className='verify-email-spinner' />
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </>
  )
}
