import React from "react";
import { useSelector } from "react-redux";
import LoginCard from "./LoginCard";
import UserCard from "./UserCard";

function UserInfoCard() {
  const user = useSelector((state) => state.app.user);
  return user ? <UserCard user={user} /> : <LoginCard />;
}

export default UserInfoCard;
