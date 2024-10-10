import { useRef, useEffect } from "react"
import { Button, Input as ChakraInput, Flex } from "@chakra-ui/react"

interface InputProps {
  inputValue: string
  setInputValue: (value: string) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isAnswering: boolean
}

const Input = ({
  inputValue,
  setInputValue,
  handleSubmit,
  isAnswering,
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isAnswering) {
      inputRef.current?.focus()
    }
  }, [isAnswering])

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap={2} py={4}>
        <ChakraInput
          ref={inputRef}
          value={inputValue}
          placeholder="Say something..."
          onChange={(e) => setInputValue(e.target.value)}
          isDisabled={isAnswering}
        />
        <Button
          type="submit"
          isDisabled={isAnswering}
          isLoading={isAnswering}
          loadingText="Answering..."
        >
          Submit
        </Button>
      </Flex>
    </form>
  )
}

export default Input
