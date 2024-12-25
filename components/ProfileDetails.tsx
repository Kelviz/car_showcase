'use client'
import Image from "next/image";
import { FaUser } from 'react-icons/fa';
import { Fragment } from "react";
import { logOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { UserDataProps } from "@/types";
import CustomButton from "./CustomButton";




interface ProfileDetailsProps {
  isOpen: boolean;
  closeModal: () => void;
  profile: UserDataProps | null
}

const ProfileDetails = ({ isOpen, closeModal, profile }: ProfileDetailsProps) => {
  const router = useRouter();

  const handleUserLogout = () => {

    logOut()
    router.push('/')

  }




  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="Opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="Opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-[350px] max-w-lg max-h-[90vh]
                 overflow-y-auto transform rounded-2xl
                 bg-primary-black-100 text-left shadow-xsl transition-all p-6 flex flex-col">
                  <button type="button" onClick={closeModal}
                    className="absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full"
                  >
                    <Image
                      src="/close.svg"
                      alt="close"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>


                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-3 items-center">
                      <FaUser className="text-white" />
                      <p className="text-white font-bold text-[20px]">{profile?.first_name} {profile?.last_name}</p>
                    </div>
                    <p className="text-white mt-3">Email: {profile?.email}</p>
                    <p className="text-white mt-3">Phone: {profile?.phone}</p>

                    <div className="mt-3 flex justify-center flex-wrap gap-4">
                      <CustomButton
                        title="Sign Out"
                        containerStyles='lg:w-[150px] w-[120px] bg-gray-700 px-3 py-5 border-none rounded-full border border-white'
                        textStyles="text-white lg:text-[14px] text-[12px] leading-[17px] font-bold"
                        handleClick={handleUserLogout}


                      />

                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ProfileDetails