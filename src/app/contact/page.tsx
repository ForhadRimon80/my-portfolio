import PageHeading from "@/components/common/PageHeading";
import ContactForm from "@/components/contact/ContactForm";
import { profile } from "@/data/profile";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

export const metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <>
      <PageHeading label="SAY HELLO" title="Every good project starts somewhere." description="A project idea, an opportunity, or a conversation about the web. I’d like to hear it." />

      <div className="detail-grid items-stretch">
        <ContactForm />

        <aside className="flex">
          <div className="card flex w-full flex-col">
            <h3>Prefer a direct connection?</h3>

            <p>Find me on LinkedIn or explore my work on GitHub.</p>

            <div className="mt-6 flex flex-col gap-4">
              <a className="button flex w-full items-center justify-center gap-3" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn aria-hidden="true" />
                <span>LinkedIn</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>

              <a className="button flex w-full items-center justify-center gap-3" href={profile.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                <span>GitHub</span>
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
