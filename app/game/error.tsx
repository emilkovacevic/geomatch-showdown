'use client'

import { Button } from "@/components/ui/button"

 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {  

 
  return (
    <div className="flex flex-col justify-center text-center align-middle">
      <h2
      className="text-lg "
      >Something went wrong!</h2>
      <p>{error.toString()}</p>
      <Button
      className="mx-auto my-8 w-fit"
      variant={"game_option"}
        onClick={
          () => reset()
        }
      >
         Refresh
      </Button>
    </div>
  )
}