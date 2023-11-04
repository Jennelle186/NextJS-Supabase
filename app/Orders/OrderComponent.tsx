'use client'
import React, { useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  contactNo: string;
  address: string;
  groups: {
    selectValue: string;
    numberValue: string;
  }[];
  delivery_mode: string;
}

export default function OrderComponent() {
  const [user, setUser] = useState<User>({
    firstName: '',
    lastName: '',
    contactNo: '',
    address: '',
    groups: [{ selectValue: '', numberValue: '' }],
    delivery_mode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleGroupInputChange = (index: number, field: 'selectValue' | 'numberValue', value: string) => {
    const updatedGroups = [...user.groups];
    updatedGroups[index][field] = value;
    setUser({ ...user, groups: updatedGroups });
  };

  const addGroupField = () => {
    setUser({
      ...user,
      groups: [...user.groups, { selectValue: '', numberValue: '' }],
    });
  };

  const removeGroupField = (index: number) => {
    const updatedGroups = [...user.groups];
    updatedGroups.splice(index, 1);
    setUser({ ...user, groups: updatedGroups });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(user); // You can handle form submission here
  };

  return (
    <div>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Contact No:</label>
          <input
            type="text"
            name="contactNo"
            value={user.contactNo}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
          />
        </div>

        {user.groups.map((group, index) => (
          <div key={index}>
            <label>Group {index + 1}:</label>
            <select
              name={`selectValue-${index}`}
              value={group.selectValue}
              onChange={(e) =>
                handleGroupInputChange(index, 'selectValue', e.target.value)
              }
            >
              <option value="">Select an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
            <input
              type="number"
              name={`numberValue-${index}`}
              value={group.numberValue}
              onChange={(e) =>
                handleGroupInputChange(index, 'numberValue', e.target.value)
              }
            />
            <button type="button" onClick={() => removeGroupField(index)}>
              Remove Group
            </button>
          </div>
        ))}
        <button type="button" onClick={addGroupField}>
          Add Group
        </button>

        <div>
          <label>Delivery Mode:</label>
          <input
            type="text"
            name="delivery_mode"
            value={user.delivery_mode}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
