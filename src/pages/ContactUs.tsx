import React, { useState } from "react"
import Image from "next/image"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import PageHeader from "@modules/products/components/header/PageHeader"
import { useForm } from "react-hook-form"
import { notifySuccess } from "@services/Toast"
import {
  // FiUser,
  FiGift,
  FiAlertCircle,
  FiHelpCircle,
  FiTruck,
  FiPhoneCall,
  FiCreditCard,
  FiMail,
  FiMapPin,
} from "react-icons/fi"
import InputArea from "@modules/account/components/form/InputArea"
import Error from "@modules/account/components/form/Error"
import Label from "@modules/account/components/form/Label"

const ContactUs = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const submitHandler = () => {
    notifySuccess(
      "your message sent successfully. We will contact you shortly."
    )
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
  }

  const ContactData = [
    {
      id: 1,
      className: "bg-emerald-100",
      contact: "kachabazar@gmail.com",
      info: "Interactively grow empowered for process-centric total linkage.",
      title: "Email Us",
      icon: FiMail,
    },
    {
      id: 2,
      className: "bg-yellow-100",
      contact: "029-00124667",
      info: "Distinctively disseminate focused solutions clicks-and-mortar ministate.",
      title: "Call Us",
      icon: FiPhoneCall,
    },
    {
      id: 3,
      className: "bg-indigo-100",
      contact: "",
      info: "Cecilia Chapman, 561-4535 Nulla LA, United States 96522",
      title: "Location",
      icon: FiMapPin,
    },
  ]
  return (
    <>
      <PageHeader title="Contact Us" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8 font-serif">
            {ContactData.map((data) => (
              <div key={data.id} className="border p-10 rounded-lg text-center">
                <span className="flex justify-center text-4xl text-emerald-500 mb-4">
                  <data.icon />
                </span>
                <h5 className="text-xl mb-2 font-bold">{data.title}</h5>
                <p className="mb-0 text-base opacity-90 leading-7">
                  <a
                    href={`mailto:${data.contact}`}
                    className="text-emerald-500"
                  >
                    {data.contact}
                  </a>{" "}
                  {data.info}
                </p>
              </div>
            ))}
          </div>
          <div className="px-0 pt-24 mx-auto items-center flex flex-col md:flex-row w-full justify-between">
            <div className="hidden md:w-full lg:w-5/12 lg:flex flex-col h-full">
              <Image
                width={874}
                height={874}
                src="/contact-us.png"
                alt="logo"
                className="block w-auto"
              />
            </div>
            <div className="px-0 pb-2 lg:w-5/12 flex flex-col md:flex-row">
              <form
                onSubmit={handleSubmit(submitHandler)}
                className="w-full mx-auto flex flex-col justify-center"
              >
                <div className="mb-12">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold font-serif mb-3">
                    For any suppoort just send your query
                  </h3>
                  <p className="text-base opacity-90 leading-7">
                    Collaboratively promote client-focused convergence vis-a-vis
                    customer directed alignments via plagiarize strategic users
                    and standardized infrastructures.
                  </p>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-col md:flex-row space-y-5 md:space-y-0">
                    <div className="w-full md:w-1/2 ">
                      <InputArea
                        register={register}
                        label="Your Name"
                        name="name"
                        value={name}
                        type="text"
                        placeholder="Inter Your Name"
                        /*  onChange={e=> {
                            setName(e.target.value);
                          }} */
                        onChange={(e: any) => setName(e.target.value)}
                      />
                      <Error errorName={errors.name} />
                    </div>
                    <div className="w-full md:w-1/2 md:ml-2.5 lg:ml-5 mt-2 md:mt-0">
                      <InputArea
                        register={register}
                        label="Your Email"
                        name="email"
                        type="email"
                        placeholder="Inter Your Email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                      />
                      <Error errorName={errors.email} />
                    </div>
                  </div>
                  <div className="relative">
                    <InputArea
                      register={register}
                      label="Subject"
                      name="subject"
                      type="text"
                      value={subject}
                      placeholder="Inter Your Subject"
                      onChange={(e: any) => setSubject(e.target.value)}
                    />
                    <Error errorName={errors.subject} />
                  </div>
                  <div className="relative mb-4">
                    <Label label="Message" />
                    <textarea
                      {...register("message", {
                        required: `Message is required!`,
                      })}
                      name="message"
                      className="px-4 py-3 flex items-center w-full rounded appearance-none opacity-75 transition duration-300 ease-in-out text-sm focus:ring-0 bg-white border border-gray-300 focus:shadow-none focus:outline-none focus:border-gray-500 placeholder-body"
                      autoComplete="off"
                      spellCheck="false"
                      rows={4}
                      value={message}
                      onChange={(e: any) => setMessage(e.target.value)}
                      placeholder="Write your message here"
                    ></textarea>
                    <Error errorName={errors.message} />
                  </div>
                  <div className="relative">
                    <button
                      data-variant="flat"
                      className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-emerald-500 text-white px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 hover:text-white hover:bg-emerald-600 h-12 mt-1 text-sm lg:text-base w-full sm:w-auto"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

ContactUs.getLayout = (page: ReactElement) => {
  return (
    <Layout title="Contact Us" description="This is contact us page">
      {page}
    </Layout>
  )
}

export default ContactUs
