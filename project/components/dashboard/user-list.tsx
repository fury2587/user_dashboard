"use client";

import { UserListProps } from "@/types/user";
import UserCard from "./user-card";

interface ExtendedUserListProps extends UserListProps {
  onUserDeleted: (id: number) => void;
}

export default function UserList({ users, onUserDeleted }: ExtendedUserListProps) {
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
        <UserCard key={user.id} user={user} onUserDeleted={onUserDeleted} />
      ))}
    </div>
  );
}