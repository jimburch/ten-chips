import { Input as ChakraInput } from "@chakra-ui/react"

interface InputProps {
  inputValue: string
  setInputValue: (value: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Input = ({ inputValue, setInputValue, handleSubmit }: InputProps) => {
  return (
    <form onSubmit={handleSubmit}>
      <ChakraInput
        value={inputValue}
        placeholder="Say something..."
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
        my={4}
      />
    </form>
  )
}

export default Input
