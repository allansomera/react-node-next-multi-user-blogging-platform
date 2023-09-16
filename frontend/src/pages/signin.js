import SigninComponent from '@components/auth/signin/signin-component'
const Signin = () => {
  return (
    <>
      <h2 className="text-center pb-[10px]">Signin page</h2>
      <div className="flex justify-center border-dashed border-1 border-red-500">
        <SigninComponent />
      </div>
    </>
  )
}

export default Signin
