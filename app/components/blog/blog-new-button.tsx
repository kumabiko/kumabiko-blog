"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import useStore from "../../../store";
import { Button } from "@mantine/core";
import { PlusIcon } from "@heroicons/react/24/solid";

// 新規投稿ボタン
const BlogNewButton = () => {
  const { user } = useStore();
  const [login, setLogin] = useState(false);

  // ログインしている人のみ表示
  const renderButton = () => {
    if (login) {
      return (
        <div className="mb-5 flex justify-end">
          <Link href="blog/new">
            <Button
              color="dark"
              leftIcon={<PlusIcon className="h-5 w-5 text-white" />}
            >
              新規投稿
            </Button>
          </Link>
        </div>
      );
    }
  };

  useEffect(() => {
    if (user.id) {
      setLogin(true);
    }
  }, [user]);

  return <>{renderButton()}</>;
};

export default BlogNewButton;
