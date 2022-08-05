import React from "react"
import Common from "../login/common"
import MainModal from "./MainModal"

//internal import
export interface ILoginModalProps {
  modalOpen: any
  setModalOpen: any
}

const LoginModal: React.FC<ILoginModalProps> = ({
  modalOpen,
  setModalOpen,
}: ILoginModalProps) => {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block w-full max-w-lg p-10 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <Common setModalOpen={setModalOpen} />
      </div>
    </MainModal>
  )
}

export default React.memo(LoginModal)
