import Link from "next/link";
import "./style.scss";

const CardButton = ({
  text,
  link,
  type = "primary",
}: {
  text: string;
  link: string;
  type?: "primary" | "secondary";
}) => {
  return (
    <Link id="CardButton" className={type} href={link}>
      {text}
    </Link>
  );
};

export default CardButton;
