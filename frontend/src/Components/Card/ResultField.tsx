import styled from "@emotion/styled"
import { useRecoilValue } from "recoil"
import { themeState } from "../States/Colors"

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0.25rem 0;
`

const FieldTitle = styled.p`
  font-size: 1rem;
`

const FieldValue = styled.p`
  font-family: Lato !important;
  font-size: 2.5rem;
  margin: 0;
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
  const theme = useRecoilValue(themeState)
  return (
    <FlexContainer>
      <FieldTitle
        style={{
          color: theme === "dark" ? "white" : "black",
          fontSize: "1.5rem",
        }}
      >
        {title}
      </FieldTitle>
      <FlexContainer style={{ color: color }}>
        <FieldValue>{value}</FieldValue>
        <p style={{ fontSize: "1.5rem" }}>{unit}</p>
      </FlexContainer>
    </FlexContainer>
  )
}

export default ResultField
