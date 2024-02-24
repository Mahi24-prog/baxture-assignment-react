"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { SimpleGrid, Skeleton } from "@mantine/core";
import { UserCard } from "../../components/userCard/UserCard";

import * as T from "../../components/userCard/UserCard.types";

export default function Users() {
  /* States */
  const [users, setUsers] = useState<T.User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // functions 
  const onDelete = (id: number) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  };

  // This functions will fe the data 
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (err: any) {
      const errorMessage = "Error: " + err.message;
      setError(errorMessage);
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  // UseEffect added to call fetch data function on first render 
  useEffect(() => {
    fetchData();
  }, []);

  if (error) return error;

  return (
    <SimpleGrid
      p={20}
      cols={{ base: 1, sm: 2, lg: 4 }}
    >
      {!isLoading ? users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      )):   [...Array(10)].map((e, i) => <Skeleton key={i} height={400}/>) }
    </SimpleGrid>
  );
}
