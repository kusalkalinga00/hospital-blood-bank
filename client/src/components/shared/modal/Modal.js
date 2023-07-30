import React, { useState } from "react";
import InputType from "./../form/InputType";
import API from "./../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [quantity, setQuantity] = useState(0);
  // const [organization, setOrganization] = useState("");
  // const [hospital, setHospital] = useState("");
  // const [donor, setDonor] = useState("");

  const { user } = useSelector((state) => state.auth);

  //handle modal submit
  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        alert("Please fill all the fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType,
        bloodGroup,
        donorEmail,
        quantity,
        email: user?.email,
        organization: user?._id,
      });
      if (data?.success) {
        alert("Inventory created successfully");
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Records
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex mb-3 ">
                Inventory Type: &nbsp;
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    defaultChecked
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="in">
                    IN
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    type="radio"
                    name="inRadio"
                    className="form-check-input"
                    defaultChecked
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="out">
                    OUT
                  </label>
                </div>
              </div>

              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option defaultValue>Select the blood group</option>
                <option value={"O+"}>O+</option>
                <option value={"O-"}>O-</option>
                <option value={"A+"}>A+</option>
                <option value={"A-"}>A-</option>
                <option value={"B+"}>B+</option>
                <option value={"A-"}>A-</option>
                <option value={"AB+"}>AB+</option>
                <option value={"AB-"}>AB-</option>
              </select>
              <InputType
                labelText={"Donor Email"}
                labelFor={"donorEmail"}
                inputType={"email"}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                name={"donorEmail"}
              />
              <InputType
                labelText={"Quantity"}
                labelFor={"quantity"}
                inputType={"number"}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                name={"quantity"}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
