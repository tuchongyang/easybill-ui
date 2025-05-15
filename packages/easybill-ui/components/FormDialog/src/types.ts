import type { DialogProps, StepProps } from "element-plus"
import type { Fields, FormContext, FormSchema } from "../../CurdForm"

export interface FormDialogOptions extends Partial<DialogProps> {
  title?: string
  width?: string | number
  fields?: Fields
  stepSchema?: { name: string; description?: string; formSchema: FormSchema }[]
  formSchema?: FormSchema
  handleOk?: (modelRef: Fields) => Promise<void>
  handleClose?: (e: "close" | "cancel") => void
  setForm?: (form: Fields) => void
  stepProps?: Partial<StepProps & Fields>
  extendContext?: FormContext
  confirmBtnText?: string
  cancelBtnText?: string
}
