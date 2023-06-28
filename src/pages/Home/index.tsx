import { useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { HomeContainer } from './styles'

import { Countdown } from './components/Countdown'
import { CountdownButton } from './components/CountdownButton'
import { NewCycleForm } from './components/NewCycleForm'
import { CyclesContext } from '../../context/CyclesContext'

// function register(name:string) {
//   return {
//     onChange: () => void,
//     onBlur: () => void,
//     onClick: () => void,
//   }
// }

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number().min(5).max(60),
})

// interface NewCycleFormData {
//   task: string
//   minutsAmout: number
// }

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // dessa forma o contexto não precisa do useForm
  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)

    reset()
  }

  const task = watch('task')
  const isSubmitDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        <CountdownButton isSubmitDisable={isSubmitDisable} />
      </form>
    </HomeContainer>
  )
}
