import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/shared/layout/Layout";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>HomePage</h1>
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
