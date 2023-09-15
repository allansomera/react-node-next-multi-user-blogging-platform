import SignupComponent from '@components/auth/signup/signup-component'
const Signup = () => {
  return (
    <>
      <h2 className="blue_bg">Signup page</h2>
      <div className="flex justify-center border-dashed border-1 border-red-500">
        <SignupComponent />
      </div>
    </>
  )
}

export default Signup
