import { ButtonHTMLAttributes, ReactNode } from "react";

type MenuButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
}

export default function MenuButton({icon, ...buttonprops}: MenuButtonProps) {
  return (
    <>
      <button {...buttonprops} className="bg-slate-700 text-white p-2 border-y-2 -my-2 py-8 flex items-center justify-center w-20">
        {icon}
      </button>
    </>
  );
}