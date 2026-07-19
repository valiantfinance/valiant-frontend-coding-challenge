import { beforeEach, describe, expect, it, vi } from 'vitest'

import { fetchLoanOptions } from '@/services/loanApi'
import { useLoanOptions } from '@/composables/useLoanOptions'

vi.mock('@/services/loanApi', () => ({
  fetchLoanOptions: vi.fn(),
}))

describe('useLoanOptions', () => {
  beforeEach(() => {
    vi.mocked(fetchLoanOptions).mockReset()
  })

  it('starts with empty option collections and no loading/error state', () => {
    const { loanOptions, isLoading, error } = useLoanOptions()

    expect(loanOptions.value).toEqual({ purpose: [], period: [], term: [] })
    expect(isLoading.value).toBe(false)
    expect(error.value).toBeNull()
  })

  it('sets isLoading while the request is in flight and clears it afterwards', async () => {
    let resolveFetch
    vi.mocked(fetchLoanOptions).mockReturnValue(new Promise((resolve) => {
      resolveFetch = resolve
    }))

    const { isLoading, loadLoanOptions } = useLoanOptions()
    const loadPromise = loadLoanOptions()

    expect(isLoading.value).toBe(true)

    resolveFetch({ purpose: [], period: [], term: [] })
    await loadPromise

    expect(isLoading.value).toBe(false)
  })

  it('populates loanOptions on a successful fetch', async () => {
    const options = {
      purpose: [{ label: 'General', value: 'general', annualRate: 0.1 }],
      period: [{ label: 'Monthly', value: 12 }],
      term: [{ label: '12 months', value: 12 }],
    }
    vi.mocked(fetchLoanOptions).mockResolvedValue(options)

    const { loanOptions, error, loadLoanOptions } = useLoanOptions()
    await loadLoanOptions()

    expect(loanOptions.value).toEqual(options)
    expect(error.value).toBeNull()
  })

  it('sets a user-facing error and keeps previous options when the fetch fails', async () => {
    const options = {
      purpose: [{ label: 'General', value: 'general', annualRate: 0.1 }],
      period: [],
      term: [],
    }
    vi.mocked(fetchLoanOptions).mockResolvedValueOnce(options)

    const { loanOptions, isLoading, error, loadLoanOptions } = useLoanOptions()
    await loadLoanOptions()

    vi.mocked(fetchLoanOptions).mockRejectedValueOnce(new Error('Network error'))
    await loadLoanOptions()

    expect(error.value).toBe('Unable to load loan options. Please try again later.')
    expect(isLoading.value).toBe(false)
    // Previously loaded options are kept as a safe fallback.
    expect(loanOptions.value).toEqual(options)
  })

  it('clears a previous error at the start of a new request', async () => {
    vi.mocked(fetchLoanOptions).mockRejectedValueOnce(new Error('Network error'))

    const { error, loadLoanOptions } = useLoanOptions()
    await loadLoanOptions()
    expect(error.value).not.toBeNull()

    vi.mocked(fetchLoanOptions).mockResolvedValueOnce({ purpose: [], period: [], term: [] })
    const loadPromise = loadLoanOptions()

    expect(error.value).toBeNull()
    await loadPromise
  })
})
