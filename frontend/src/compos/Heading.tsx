
export const Heading = ({text}:any) => {
  return (
    <header className="flex items-center h-[50px]">
      <h2
      className="pb-1 text-lg font-semibold underline"
      >
        {text}
      </h2>
    </header>
  )
}
