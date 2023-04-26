type HeaderProps = {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return <h1 className="title">{title}</h1>
}
