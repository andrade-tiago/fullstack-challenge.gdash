import { Input } from "@/components/ui/input";
import React from "react";

type PaginationInputProps = {
  currentPage: number
  totalPages: number 
  onChangePage: (value: number) => void
  className?: string
}

function PaginationInput(props: PaginationInputProps) {
  const [inputValue, setInputValue] = React.useState(
    props.currentPage.toString())

  function handleSetPageNumber() {
    if (!inputValue.trim()) {
      setInputValue(props.currentPage.toString())
      return
    }

    let pageNumber = Number(inputValue)

    if (!Number.isInteger(pageNumber))
      pageNumber = 1
    else if (pageNumber < 1)
      pageNumber = 1
    else if (pageNumber > props.totalPages)
      pageNumber = props.totalPages

    if (pageNumber !== props.currentPage)
      props.onChangePage(pageNumber)

    setInputValue(props.currentPage.toString())
  }

  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === "Enter") handleSetPageNumber()
  }

  React.useEffect(() => {
    setInputValue(props.currentPage.toString())
  }, [props.currentPage])

  return (
    <Input
      type="number"
      value={inputValue}
      onChange={event => setInputValue(event.target.value)}
      onKeyUp={handleKeyPress}
      onBlur={handleSetPageNumber}
      className={props.className}
      min={1}
      max={props.totalPages}
    />
  )
}

export {
  PaginationInput,
}
