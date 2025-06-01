"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import UserList from "@/components/dashboard/user-list";
import UserListPagination from "@/components/dashboard/user-list-pagination";
import { User } from "@/types/user";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { fetchUsers } from "@/lib/api";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import AddUserDialog from "@/components/dashboard/add-user-dialog";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  const page = Number(searchParams.get("page") || "1");
  const limit = 5; // Items per page

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (page !== 1) {
      router.push("/dashboard?page=1");
    }
  };

  const handleUserAdded = (newUser: User) => {
    setUsers(prevUsers => [newUser, ...prevUsers]);
  };

  const handleUserDeleted = (userId: number) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
  };

  const totalPages = Math.ceil(filteredUsers.length / limit);
  const startIndex = (page - 1) * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
  
  return (
    <DashboardShell>
      <DashboardHeader
        heading="User Dashboard"
        description="View and manage all user profiles in one place."
      >
        <AddUserDialog onUserAdded={handleUserAdded} />
      </DashboardHeader>
      
      <div className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        
        {isLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <UserList users={paginatedUsers} onUserDeleted={handleUserDeleted} />
            
            {filteredUsers.length > 0 ? (
              <UserListPagination 
                totalPages={totalPages} 
                currentPage={page} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search term
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardShell>
  );
}