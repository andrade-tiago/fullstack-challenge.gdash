import React from "react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"

const SHOW_PASSWORD_TEXT = "Exibir senha"
const HIDE_PASSWORD_TEXT = "Ocultar senha"

type PassowrdInputProps = Omit<React.ComponentProps<typeof InputGroupInput>, 'type'>

function PassowordInput({ className, ...props }: PassowrdInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <InputGroup>
      <InputGroupInput type={showPassword ? "text": "password"} {...props} />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          onClick={() => setShowPassword(state => !state)}
          aria-label={showPassword ? HIDE_PASSWORD_TEXT : SHOW_PASSWORD_TEXT}
          size="icon-xs"
          title={showPassword ? HIDE_PASSWORD_TEXT : SHOW_PASSWORD_TEXT}
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export {
  PassowordInput,
}
