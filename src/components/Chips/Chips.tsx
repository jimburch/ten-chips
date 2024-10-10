import { ResponseType } from "@/types"
import { Flex, Text } from "@chakra-ui/react"

type ChipsProps = {
  generatedResponses: ResponseType[]
}

const Chips = ({ generatedResponses }: ChipsProps) => {
  return (
    <Flex my={4} justify="center" gap={2}>
      {[
        ...generatedResponses.map((answer, i) => (
          <Text key={i} fontSize="xl">
            {answer.answer ? "✅" : "❌"}
          </Text>
        )),
        ...Array.from(
          { length: Math.max(0, 10 - generatedResponses.length) },
          (_, i) => (
            <Text key={i + generatedResponses.length} fontSize="xl">
              ◻️
            </Text>
          )
        ),
      ]}
    </Flex>
  )
}

export default Chips
