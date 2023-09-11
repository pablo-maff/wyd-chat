export function Typing({ typing }) {
  return (
    <>
      {typing ?
        <h6 className="text-blue-600">Typing ...</h6>
        :
        <div className="h-6">{" "}</div>
      }
    </>
  )
}