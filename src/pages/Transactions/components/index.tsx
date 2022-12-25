import { SearchFormContainer } from './style'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { TransactionContext } from '../../../contexts/TransactionsContext'
const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormsInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransaction = useContextSelector(TransactionContext, (context) => {
    return context.fetchTransaction
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormsInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormsInputs) {
    await fetchTransaction(data.query)
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        placeholder="Busque uma transação"
        type="text"
        {...register('query')}
      />
      <button disabled={isSubmitting}>
        <MagnifyingGlass size={24} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
