import { inject } from "vue"
import { FormContext } from "../types"
export function useForm() {
  const formContext = inject<FormContext>("curdFormContext")
  return { formContext }
}
