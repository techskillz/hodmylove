// const Main = () => {
//   return (
//     <form>
//       <img src="" alt="" />

//       <h1 className="text-5xl font-normal">Junior Church Monitor</h1>

//       <div className="flex justify-between gap-10">
//         <h3 className="font-bold bg-amber-600">
//           Parent Information (All fields are required unless specified optional)
//         </h3>

//         <h3 className="">
//           Child Information (All fields are required unless specified optional)
//         </h3>

//         <h3>Care Giver (All fields are required unless specified optional)</h3>
//       </div>

//       <div>
//         <div>
//           <h1>Parent full name </h1>
//           <div className="flex justify-between">
//             <div>
//               <input type="text" placeholder="First Name" />
//             </div>
//             <input type="text" placeholder="Last Name" />
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Main;
import React, { useState } from "react";

const FormField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
  error,
}) => (
  <div className="mb-4">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
      htmlFor={name}
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error ? "border-red-500" : ""
      }`}
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

const GenderSelection = ({ value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      Gender<span className="text-red-500 ml-1">*</span>
    </label>
    <div className="flex space-x-4">
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio"
          name="gender"
          value="male"
          checked={value === "male"}
          onChange={onChange}
        />
        <span className="ml-2">Male</span>
      </label>
      <label className="inline-flex items-center">
        <input
          type="radio"
          className="form-radio"
          name="gender"
          value="female"
          checked={value === "female"}
          onChange={onChange}
        />
        <span className="ml-2">Female</span>
      </label>
    </div>
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

const Main = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    roleInChurch: "",
    meansOfIdentification: "",
    primaryPhoneNumber: "",
    secondaryPhoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "This field is required.";
    if (!formData.lastName) newErrors.lastName = "This field is required.";
    if (!formData.email) newErrors.email = "This field is required.";
    if (!formData.gender) newErrors.gender = "Please select a gender.";
    if (!formData.roleInChurch)
      newErrors.roleInChurch = "This field is required.";
    if (!formData.meansOfIdentification)
      newErrors.meansOfIdentification = "This field is required.";
    if (!formData.primaryPhoneNumber)
      newErrors.primaryPhoneNumber = "This field is required.";
    if (!formData.address) newErrors.address = "This field is required.";

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (
      formData.primaryPhoneNumber &&
      !/^\d{10}$/.test(formData.primaryPhoneNumber)
    ) {
      newErrors.primaryPhoneNumber =
        "Invalid phone number. Please enter 10 digits.";
    }

    if (
      formData.secondaryPhoneNumber &&
      !/^\d{10}$/.test(formData.secondaryPhoneNumber)
    ) {
      newErrors.secondaryPhoneNumber =
        "Invalid phone number. Please enter 10 digits.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form data:", formData);
      // Here you would typically send the data to a server
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg"
    >
      <img
        src="../assets/HOD-logo-black-1-1 (1).png"
        alt="HOD"
        className="w-[300px] mx-auto mb-6"
      />
      <h1 className="text-5xl font-bold mb-6 text-center">
        Junior Church Monitor
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <h3 className="font-bold bg-amber-600 p-2 rounded text-center">
          Parent Information (All fields are required unless specified optional)
        </h3>
        <h3 className="font-bold bg-blue-500 p-2 rounded text-center">
          Child Information (All fields are required unless specified optional)
        </h3>
        <h3 className="font-bold bg-green-500 p-2 rounded text-center">
          Care Giver Information (All fields are required unless specified
          optional)
        </h3>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Parent Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="First Name"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required={true}
            error={errors.firstName}
          />
          <FormField
            label="Last Name"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required={true}
            error={errors.lastName}
          />
        </div>
        <FormField
          label="Email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required={true}
          error={errors.email}
        />
        <GenderSelection
          value={formData.gender}
          onChange={handleChange}
          error={errors.gender}
        />
        <FormField
          label="Role in Church"
          type="text"
          name="roleInChurch"
          placeholder="e.g. Member, Deacon, Elder"
          value={formData.roleInChurch}
          onChange={handleChange}
          required={true}
          error={errors.roleInChurch}
        />
        <FormField
          label="Means of Identification"
          type="text"
          name="meansOfIdentification"
          placeholder="e.g. Driver's License, Passport"
          value={formData.meansOfIdentification}
          onChange={handleChange}
          required={true}
          error={errors.meansOfIdentification}
        />
        <FormField
          label="Primary Phone Number"
          type="tel"
          name="primaryPhoneNumber"
          placeholder="10-digit phone number"
          value={formData.primaryPhoneNumber}
          onChange={handleChange}
          required={true}
          error={errors.primaryPhoneNumber}
        />
        <FormField
          label="Secondary Phone Number (Optional)"
          type="tel"
          name="secondaryPhoneNumber"
          placeholder="10-digit phone number"
          value={formData.secondaryPhoneNumber}
          onChange={handleChange}
          required={false}
          error={errors.secondaryPhoneNumber}
        />
        <FormField
          label="Address"
          type="text"
          name="address"
          placeholder="Full address"
          value={formData.address}
          onChange={handleChange}
          required={true}
          error={errors.address}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Main;
