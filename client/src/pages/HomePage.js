import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import Layout from "../components/shared/layout/Layout";
import { IoMdAdd } from "react-icons/io";
import Modal from "../components/shared/modal/Modal";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);

  return (
    <Layout>
      {error && <span>{toast.error(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h4
            className="ms-4"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            style={{
              cursor: "pointer",
            }}
          >
            <IoMdAdd />
            Add Inventory
          </h4>
          <Modal />
        </>
      )}
    </Layout>
  );
};

export default HomePage;
