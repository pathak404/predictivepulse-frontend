import SectionHeader from "./SectionHeader"
import { FaEnvelope  } from "react-icons/fa"
import { IoLogoWhatsapp } from "react-icons/io"

const Support = () => {
  return (
    <div className="mx-auto px-4 sm:px-5 md:px-10 lg:px-12 xl:px-20 py-20 block overflow-hidden" id="support"
  >
    <SectionHeader title="Support" heading="Reach Out to Us"
      paragraph="Contact us through given details below, and we'll be more than happy to address your specific queries or concerns."
    />

        <div className="mx-auto w-full max-w-[500px] md:flex flex-warp items-center justify-center gap-5 xl:gap-10 mt-8">
            <div className="w-full md:w-2/4 text-center mb-4 md:mb-0">
                <a href="mailto:support@predictivepulse.in" className="text-base inline-flex gap-2 items-center justify-center">
                  <FaEnvelope  className="w-5 h-5" />
                  <h6 className="font-Inter font-semibold">support@predictivepulse.in</h6>
                </a>
            </div>

            <div className="w-full md:w-2/4 text-center">
              <a href="https://wa.me/918276824136" className="text-base inline-flex gap-2 items-center justify-center" target="_blank">
                <IoLogoWhatsapp  className="w-5 h-5" />
                <h6 className="font-Inter font-semibold">+91 8276824136</h6>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Support