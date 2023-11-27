

function Row({ title, children }: any) {
  return (
    <div className="bg-white pt-5 border border-borderColor rounded-lg">

      <div className="flex justify-between">
        <h2 className="px-5 text-primaryColor text-md">{title}</h2>
        <p className="text-md text-secondaryColor hover:text-primaryColor transition cursor-pointer px-5">Sell All</p>
      </div>

      {/* nothing to show  */}
      {/* <div>
        <h2 className="text-primaryColor text-md">No pending invitations</h2>
      </div> */}

      <div className="my-3 ">
        {children}
      </div>

    </div>
  )
}

export default Row


