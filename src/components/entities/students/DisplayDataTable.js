import React from "react";

function DisplayDataTable() {
  return (
    <div class="w-full flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Students Catalog
      </h1>
      <table class="w-[80%] text-center overflow-hidden overflow-y-scroll mt-8">
        <thead class="border-b bg-gray-800">
          <tr>
            <th scope="col" class="text-sm font-medium text-white px-6 py-4">
              ID
            </th>
            <th class="text-sm font-medium text-white px-6 py-4">Name</th>
            <th class="text-sm font-medium text-white px-6 py-4">Email</th>
            <th class="text-sm font-medium text-white px-6 py-4">Phone</th>
            <th class="text-sm font-medium text-white px-6 py-4">Address</th>
            <th class="text-sm font-medium text-white px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDataTable;
