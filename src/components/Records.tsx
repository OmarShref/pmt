import { useSelector } from "react-redux";

export default function Records() {
  const { user } = useSelector((state) => state.user);

  return <section className="flex-auto">{user.email}</section>;
}
