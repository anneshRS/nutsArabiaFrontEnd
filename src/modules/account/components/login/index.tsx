import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { useRouter } from "next/router"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import InputArea from "../form/InputArea"
import { FiLock, FiMail } from "react-icons/fi"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    credentials["email"]="justin@gmail.com"
    credentials["password"]="12345678"
    console.log("onSubmit = handleSubmit",credentials)
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    // <div className="max-w-sm w-full flex flex-col items-center">
    // <h1 className="text-large-semi uppercase mb-6">Welcome back</h1>
    // <p className="text-center text-base-regular text-gray-700 mb-8">
    //   Sign in to access an enhanced shopping experience.
    // </p>
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">Login</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
          Login with your email and password
        </p>
      </div>
      <form
        /* className="w-full" */ className="flex flex-col justify-center"
        onSubmit={onSubmit}
      >
        {/* <div className="flex flex-col w-full gap-y-2"> */}
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            {/* <Input
              label="Email"
              {...register("email", { required: "Email is required" })}
              autoComplete="email"
              errors={errors}
            /> */}
            <InputArea
              register={register}
              defaultValue="justin@gmail.com"
              label="Email"
              name="registerEmail"
              type="email"
              placeholder="Email"
              Icon={FiMail}
            />
            {/* <Error errorName={errors.registerEmail} /> */}
          </div>
          <div className="form-group">
            {/* <Input
              label="Password"
              {...register("password", { required: "Password is required" })}
              type="password"
              autoComplete="current-password"
              errors={errors}
            /> */}
            <InputArea
              register={register}
              defaultValue="12345678"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              Icon={FiLock}
            />
            {/* <Error errorName={errors.password} /> */}
          </div>

          {/* </div> */}
          {/* {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              These credentials do not match our records
            </span>
          </div>
        )} */}
          {/* <Button className="mt-6">Enter</Button> */}

          {/* <span className="text-center text-gray-700 text-small-regular mt-6">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span> */}
          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                // onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            // disabled={loading}
            type="submit"
            className="w-full text-center py-3 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition-all focus:outline-none my-1"
          >
            Login
          </button>
        </div>
      </form>
    </>
    // </div>
  )
}

export default Login
