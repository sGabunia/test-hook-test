import React from "react";
import axios from "axios";
import { useAsync } from "./hooks/useAsync";
import { ErrorBoundary } from "react-error-boundary";

import List from "./List";
import "./styles.css";

export default function App() {
  const { data: posts, run, error, status } = useAsync({ status: "idle" });

  React.useEffect(() => {
    run(
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((data) => data.data)
    );
  }, [run]);

  switch (status) {
    case "idle":
      return <p>submit</p>;

    case "pending":
      return <p>pending</p>;

    case "rejected":
      throw error;

    case "resolved":
      return (
        <ErrorBoundary>
          <List posts={posts} />
        </ErrorBoundary>
      );

    default:
      throw new Error("this is error");
  }
}
