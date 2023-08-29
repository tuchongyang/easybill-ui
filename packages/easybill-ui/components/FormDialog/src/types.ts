import { Fields, FormSchema } from "../../CurdForm"
import { DialogProps } from "element-plus"
import { StepProps } from "element-plus"

export interface FormDialogOptions extends Partial<DialogProps> {
  title?: string
  width?: string | number
  fields?: Fields
  stepSchema?: { name: string; description?: string; formSchema: FormSchema }[]
  formSchema?: FormSchema
  handleOk?: (modelRef: Fields) => Promise<void>
  setForm?: (form: Fields) => void
  stepProps?: Partial<StepProps & Fields>
}
