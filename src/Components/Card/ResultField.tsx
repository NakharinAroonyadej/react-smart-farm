import styled from "@emotion/styled"

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FieldTitle = styled.p`
  font-size: 1rem;
`

const FieldValue = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  margin-right: 0.25rem;
`

type ResultFieldProps = {
  color: string
  title: string
  value: string
  unit: string
}

function ResultField({ color, title, value, unit }: ResultFieldProps) {
  return (
    <FlexContainer>
      <FieldTitle>{title}</FieldTitle>
      <FlexContainer style={{ color: color }}>
        <FieldValue>{value}</FieldValue>
        <p>{unit}</p>
      </FlexContainer>
    </FlexContainer>
  )
}

export default ResultField
