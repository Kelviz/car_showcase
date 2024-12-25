import Image from "next/image"
import Link from "next/link"
import { footerLinks } from "@/constants"

const Footer = () => {
        const currentYear = new Date().getFullYear();
        return (
                <footer className="flex flex-col text-gray-300 mt-5 border-t border-gray-600">
                        <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
                                <div className="flex flex-col justify-start items-start gap-6">
                                        <Link href="/" className="lg:w-[150px] lg:h-[110px] md:w-[120px] md:h-[90px] w-[100px] h-[70px]">
                                                <Image src="/car-logo.png" alt="logo" width={300}
                                                        height={200} className="object-contain w-full  h-full" />
                                        </Link>

                                        <p className="text-base text-white">Carhuby {currentYear} <br /> All rights reserved &copy;</p>
                                </div>

                                <div className="footer__links">
                                        {footerLinks.map((link) => (
                                                <div key={link.title}
                                                        className="footer__link"
                                                >
                                                        <h3 className="font-bold">{link.title}</h3>
                                                        {link.links.map((item) => (
                                                                <Link
                                                                        key={item.title}
                                                                        href={item.url}
                                                                        className="text-gray-300"
                                                                >{item.title}
                                                                </Link>
                                                        ))}

                                                </div>
                                        ))}

                                </div>


                        </div>

                        <div className="flex justify-between items-center flex-wrap mt-10 border-t border-gray-600 sm:px-16 px-6 py-10">
                                <p>{currentYear} CarHub. All Rights Reserved</p>
                                <div className="footer__copyrights-link">
                                        <Link href="/" className="text-gray-300">
                                                Privacy Policy
                                        </Link>

                                        <Link href="/" className="text-gray-300">
                                                Terms of Use
                                        </Link>

                                </div>

                        </div>



                </footer>
        )
}

export default Footer