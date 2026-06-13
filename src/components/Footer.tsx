import {
  FiFacebook,
  FiLinkedin,
  FiMail,
  FiCode,
  FiGithub,
} from "react-icons/fi";

import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900/20 backdrop-blur-xl border border-white/10 rounded-t-xl text-white mt-16 shadow-lg">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ABOUT */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-400">
            Interactive Maps
          </h3>
          <p className="text-white/70 text-sm">
            Build, explore, and manage your SVG maps with ease. Learn to
            structure your SVGs correctly in Figma and visualize routes
            dynamically.
          </p>
        </div>

        {/* LINKS */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-400">Quick Links</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>
              <a
                href="/"
                className="hover:text-green-400 transition flex items-center gap-2"
              >
                <span>
                  <FiGithub />
                </span>
                Home
              </a>
            </li>

            <li>
              <a
                href="/upload"
                className="hover:text-green-400 transition flex items-center gap-2"
              >
                <span>
                  <FiCode />
                </span>
                Upload Map
              </a>
            </li>

            <li>
              <a
                href="/guide"
                className="hover:text-green-400 transition flex items-center gap-2"
              >
                <span>
                  <FiMail />
                </span>
                Guide
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        {/* SOCIAL */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-green-400">Connect</h3>

          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.facebook.com/john.paul.quintana.180852"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-green-400 transition text-xl"
              aria-label="Facebook"
            >
              <FiFacebook />
            </a>

            <a
              href="https://linkedin.com/in/john-paul-quintana118145287/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-green-400 transition text-xl"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>

            <a
              href="https://t.me/exousianavi2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-green-400 transition text-xl"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>

            <a
              href="mailto:jpquintana01@gmail.com"
              className="text-white/70 hover:text-green-400 transition text-xl"
              aria-label="Email"
            >
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      {/* DEVELOPER + VERSION BAR */}
      <div className="border-t border-white/10 px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-3">
        {/* DEVELOPER */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">
            <FiCode />
          </span>
          <span>
            Developed by{" "}
            <span className="text-white/80 font-medium">JP Quintana</span>
          </span>
        </div>

        {/* VERSION */}
        <div className="flex items-center gap-2">
          <span className="text-green-400">
            <FiGithub />
          </span>
          <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 backdrop-blur-md">
            v1.0.0
          </span>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-white/40 text-[11px] py-3">
        &copy; {new Date().getFullYear()} Interactive Maps. All rights reserved.
      </div>
    </footer>
  );
}
