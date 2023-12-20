import React from "react";

function DisplayDataTable() {
  return (
    <div class="w-full flex min-h-[50vh] justify-center items-center">
      <table class="w-[80%] text-center overflow-hidden overflow-y-scroll">
        <thead class="border-b bg-gray-800">
            <tr>
                <th scope="col" class="text-sm font-medium text-white px-6 py-4">ID</th>
                <th class="text-sm font-medium text-white px-6 py-4">Name</th>
                <th class="text-sm font-medium text-white px-6 py-4">Email</th>
                <th class="text-sm font-medium text-white px-6 py-4">Phone</th>
                <th class="text-sm font-medium text-white px-6 py-4">Address</th>
                <th class="text-sm font-medium text-white px-6 py-4">Actions</th>
            </tr>
        </thead>

      </table>
    </div>
  );
}

export default DisplayDataTable;
