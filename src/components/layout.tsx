interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return <div>{props.children}</div>;
}
