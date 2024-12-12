import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";

type FooterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}

export default function FooterButton({children, ...buttonProps}: FooterButtonProps) {
  return (
    <Button {...buttonProps}>{children}</Button>
  )
}