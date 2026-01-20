"use client";

import { useState } from "react";

type RequestInfo = {
  headers?: string;
  path?: string;
  query?: string;
  body?: string;
  form?: string;
};

type CurlBuilder = (baseUrl: string, token?: string) => string;

type Endpoint = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  summary: string;
  auth: string;
  request?: RequestInfo;
  response?: string;
  notes?: string[];
  curl: CurlBuilder;
};

type ApiGroup = {
  id: string;
  title: string;
  description?: string;
  endpoints: Endpoint[];
};

const apiGroups: ApiGroup[] = [
  {
    id: "system",
    title: "System",
    description: "Endpoint dasar untuk cek service.",
    endpoints: [
      {
        method: "GET",
        path: "/",
        summary: "Health check sederhana.",
        auth: "Public",
        response: "Hello World!",
        curl: (baseUrl) => `curl "${baseUrl}/"`,
      },
    ],
  },
  {
    id: "auth",
    title: "Auth",
    description: "Login dan profile.",
    endpoints: [
      {
        method: "POST",
        path: "/auth/login",
        summary: "Login dan ambil access token.",
        auth: "Public",
        request: {
          body: `{"email":"admin@example.com","password":"Admin123Password"}`,
        },
        response: `{
  "statusCode": 200,
  "message": "Login berhasil",
  "access_token": "JWT_TOKEN"
}`,
        curl: (baseUrl) =>
          [
            `curl -X POST "${baseUrl}/auth/login" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"email":"admin@example.com","password":"Admin123Password"}'`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/auth/profile",
        summary: "Ambil profile user yang login.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
        },
        response: `{
  "statusCode": 200,
  "message": "Profile details fetched successfully",
  "data": {
    "id": 1,
    "name": "Admin Default",
    "email": "admin@example.com",
    "phoneNumber": "1234567890",
    "role": "ADMIN"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl "${baseUrl}/auth/profile" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
    ],
  },
  {
    id: "users",
    title: "Users",
    description: "Manajemen user. Semua endpoint butuh token.",
    endpoints: [
      {
        method: "POST",
        path: "/users/create",
        summary: "Buat user baru (ADMIN).",
        auth: "Bearer + ADMIN",
        request: {
          headers: "Authorization: Bearer <token>",
          body: `{"name":"User A","email":"usera@example.com","phoneNumber":"08123456789","position":"Supervisor"}`,
        },
        response: `{
  "statusCode": 200,
  "message": "User has been successfully created",
  "data": {
    "id": 10,
    "name": "User A",
    "email": "usera@example.com",
    "phoneNumber": "08123456789",
    "position": "Supervisor",
    "role": "USER"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X POST "${baseUrl}/users/create" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"User A","email":"usera@example.com","phoneNumber":"08123456789","position":"Supervisor"}'`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/users/list",
        summary: "List user aktif (role USER).",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          query: "name, page, pageSize",
        },
        response: `{
  "statusCode": 200,
  "message": "User list retrieved successfully",
  "data": {
    "list": [],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 0,
      "totalPages": 0
    }
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          `curl "${baseUrl}/users/list?name=andi&page=1&pageSize=10" \\\n  -H "Authorization: Bearer ${token}"`,
      },
      {
        method: "GET",
        path: "/users/:id",
        summary: "Detail user (placeholder).",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: "This action returns a #1 user",
        notes: ["Endpoint ini masih placeholder di service."],
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          `curl "${baseUrl}/users/1" \\\n  -H "Authorization: Bearer ${token}"`,
      },
      {
        method: "PATCH",
        path: "/users/update/:id",
        summary: "Update data user.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
          body: `{"name":"User Baru","phoneNumber":"08120000000","position":"Supervisor"}`,
        },
        response: `{
  "statusCode": 200,
  "message": "Update Successful",
  "data": {
    "id": 1,
    "name": "User Baru",
    "email": "user@example.com",
    "phoneNumber": "08120000000",
    "position": "Supervisor",
    "role": "USER"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/users/update/1" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"User Baru","phoneNumber":"08120000000","position":"Supervisor"}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/users/change-password/:id",
        summary: "Ganti password user.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
          body:
            '{"oldPassword":"OldPass123","newPassword":"NewPass123","confirmNewPassword":"NewPass123"}',
        },
        response: `{
  "statusCode": 200,
  "message": "Password successfully reset"
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/users/change-password/1" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"oldPassword":"OldPass123","newPassword":"NewPass123","confirmNewPassword":"NewPass123"}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/users/reset-password/:id",
        summary: "Reset password user (ADMIN).",
        auth: "Bearer + ADMIN",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Password successfully reset"
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/users/reset-password/1" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/users/remove/:id",
        summary: "Soft delete user (ADMIN).",
        auth: "Bearer + ADMIN",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "User deleted successfully"
}`,
        notes: [
          "Soft delete: set deletedAt, user hilang dari list.",
          "User yang dihapus tidak bisa login lagi.",
          "Dokumen tetap menyimpan relasi ke user.",
        ],
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X DELETE "${baseUrl}/users/remove/1" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
    ],
  },
  {
    id: "category",
    title: "Category",
    description: "Kategori untuk sektor dan item.",
    endpoints: [
      {
        method: "POST",
        path: "/category/create",
        summary: "Buat kategori baru.",
        auth: "Public",
        request: {
          body:
            '{"name":"Kategori A","code":"CAT-001","reference":"Ref A","location":"Jakarta"}',
        },
        response: `{
  "statusCode": 200,
  "message": "Register Successfull",
  "data": {
    "id": 1,
    "name": "Kategori A",
    "slug": "kategori-a",
    "code": "CAT-001",
    "reference": "Ref A",
    "location": "Jakarta"
  }
}`,
        curl: (baseUrl) =>
          [
            `curl -X POST "${baseUrl}/category/create" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Kategori A","code":"CAT-001","reference":"Ref A","location":"Jakarta"}'`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/category/list",
        summary: "List kategori.",
        auth: "Public",
        request: {
          query: "name, page, pageSize",
        },
        response: `{
  "statusCode": 200,
  "message": "Categories fetched successfully",
  "data": {
    "list": [],
    "pagination": {
      "currentPage": 1,
      "pageSize": 10,
      "totalItems": 0,
      "totalPages": 0
    }
  }
}`,
        curl: (baseUrl) =>
          `curl "${baseUrl}/category/list?name=kat&page=1&pageSize=10"`,
      },
      {
        method: "GET",
        path: "/category/detail/:id",
        summary: "Detail kategori (dengan sektor dan item).",
        auth: "Public",
        request: {
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Category details fetched successfully",
  "data": {
    "id": 1,
    "name": "Kategori A",
    "slug": "kategori-a",
    "sectors": [
      {
        "id": 2,
        "no": "1",
        "items": []
      }
    ]
  }
}`,
        curl: (baseUrl) => `curl "${baseUrl}/category/detail/1"`,
      },
      {
        method: "PATCH",
        path: "/category/update/:id",
        summary: "Update kategori (semua field wajib).",
        auth: "Public",
        request: {
          path: "id",
          body:
            '{"name":"Kategori Baru","code":"CAT-001","reference":"Ref A","location":"Jakarta"}',
        },
        response: `{
  "statusCode": 200,
  "message": "Update Successful",
  "data": {
    "id": 1,
    "name": "Kategori Baru",
    "slug": "kategori-baru",
    "code": "CAT-001",
    "reference": "Ref A",
    "location": "Jakarta"
  }
}`,
        curl: (baseUrl) =>
          [
            `curl -X PATCH "${baseUrl}/category/update/1" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Kategori Baru","code":"CAT-001","reference":"Ref A","location":"Jakarta"}'`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/category/delete/:id",
        summary: "Hapus kategori.",
        auth: "Public",
        request: {
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Category deleted successfully"
}`,
        curl: (baseUrl) => `curl -X DELETE "${baseUrl}/category/delete/1"`,
      },
    ],
  },
  {
    id: "sector",
    title: "Sector",
    description: "Sektor di bawah kategori.",
    endpoints: [
      {
        method: "POST",
        path: "/sector/create",
        summary: "Buat sektor baru.",
        auth: "Public",
        request: {
          body: '{"no":"1","name":"Sektor A","source":"2025","categoryId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Sector created successfully",
  "data": {
    "id": 1,
    "no": "1",
    "name": "Sektor A",
    "categoryId": 1,
    "categoryCode": "CAT-001"
  }
}`,
        curl: (baseUrl) =>
          [
            `curl -X POST "${baseUrl}/sector/create" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"no":"1","name":"Sektor A","source":"2025","categoryId":1}'`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/sector",
        summary: "List sektor (placeholder).",
        auth: "Public",
        response: "This action returns all sector",
        notes: ["Endpoint ini masih placeholder di service."],
        curl: (baseUrl) => `curl "${baseUrl}/sector"`,
      },
      {
        method: "GET",
        path: "/sector/:id",
        summary: "Detail sektor (placeholder).",
        auth: "Public",
        request: {
          path: "id",
        },
        response: "This action returns a #1 sector",
        notes: ["Endpoint ini masih placeholder di service."],
        curl: (baseUrl) => `curl "${baseUrl}/sector/1"`,
      },
      {
        method: "PATCH",
        path: "/sector/update/:id",
        summary: "Update sektor.",
        auth: "Public",
        request: {
          path: "id",
          body:
            '{"no":"1","name":"Sektor Baru","source":"2025","categoryId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Sector and associated items updated successfully",
  "data": {
    "id": 1,
    "no": "1",
    "name": "Sektor Baru",
    "categoryId": 1,
    "categoryCode": "CAT-001"
  }
}`,
        curl: (baseUrl) =>
          [
            `curl -X PATCH "${baseUrl}/sector/update/1" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"no":"1","name":"Sektor Baru","source":"2025","categoryId":1}'`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/sector/delete/:id",
        summary: "Hapus sektor.",
        auth: "Public",
        request: {
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Sector removed successfully"
}`,
        curl: (baseUrl) => `curl -X DELETE "${baseUrl}/sector/delete/1"`,
      },
    ],
  },
  {
    id: "item",
    title: "Item",
    description: "Item dalam sektor. Upload PDF opsional.",
    endpoints: [
      {
        method: "POST",
        path: "/item/create",
        summary: "Buat item baru.",
        auth: "Public",
        request: {
          form:
            "no (string)\nname (string)\nsource (optional)\nminimum (string number)\nunit (optional)\nmaterialPricePerUnit (string number)\nfeePricePerUnit (string number)\nsingleItem (true/false)\nsectorId (string number)\nfile (PDF, optional)",
        },
        response: `{
  "statusCode": 200,
  "message": "Item created successfully",
  "data": {
    "id": 1,
    "no": "1",
    "name": "Item A",
    "sectorId": 1,
    "singleItem": true,
    "pdfUrl": "/uploads/uuid.pdf"
  }
}`,
        notes: [
          "singleItem wajib string 'true' atau 'false'.",
          "Jika singleItem=false, unit/minimum/material/fee akan di-null.",
          "File hanya PDF, max 1 MB.",
        ],
        curl: (baseUrl) =>
          [
            `curl -X POST "${baseUrl}/item/create" \\`,
            `  -F "no=1" \\`,
            `  -F "name=Item A" \\`,
            `  -F "source=2025" \\`,
            `  -F "minimum=1" \\`,
            `  -F "unit=kg" \\`,
            `  -F "materialPricePerUnit=1000" \\`,
            `  -F "feePricePerUnit=200" \\`,
            `  -F "singleItem=true" \\`,
            `  -F "sectorId=1" \\`,
            `  -F "file=@/path/to/file.pdf"`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/item/update/:id",
        summary: "Update item.",
        auth: "Public",
        request: {
          path: "id",
          form:
            "no, name, source?, minimum?, unit?, materialPricePerUnit?, feePricePerUnit?, singleItem, sectorId, file?",
        },
        response: `{
  "statusCode": 200,
  "message": "Item updated successfully",
  "data": {
    "id": 1,
    "name": "Item A Updated"
  }
}`,
        curl: (baseUrl) =>
          [
            `curl -X PATCH "${baseUrl}/item/update/1" \\`,
            `  -F "no=1" \\`,
            `  -F "name=Item A Updated" \\`,
            `  -F "singleItem=true" \\`,
            `  -F "sectorId=1" \\`,
            `  -F "file=@/path/to/file.pdf"`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/item/search",
        summary: "Cari item (singleItem=true).",
        auth: "Public",
        request: {
          query: "keyword (required)",
        },
        response: `{
  "statusCode": 200,
  "message": "Items found successfully",
  "data": []
}`,
        curl: (baseUrl) => `curl "${baseUrl}/item/search?keyword=cement"`,
      },
      {
        method: "DELETE",
        path: "/item/delete/:id",
        summary: "Hapus item.",
        auth: "Public",
        request: {
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Item removed successfully"
}`,
        curl: (baseUrl) => `curl -X DELETE "${baseUrl}/item/delete/1"`,
      },
    ],
  },
  {
    id: "document",
    title: "Document",
    description: "Dokumen proyek. Semua endpoint butuh token.",
    endpoints: [
      {
        method: "POST",
        path: "/document/create",
        summary: "Buat dokumen baru.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          body: '{"name":"Dokumen A","checkedById":2,"confirmedById":3}',
        },
        response: `{
  "statusCode": 200,
  "message": "Document created successfully",
  "data": {
    "id": 1,
    "name": "Dokumen A",
    "slug": "dokumen-a-20260120000000"
  }
}`,
        notes: [
          "checkedById dan confirmedById harus berbeda.",
          "Keduanya tidak boleh sama dengan creator.",
        ],
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X POST "${baseUrl}/document/create" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Dokumen A","checkedById":2,"confirmedById":3}'`,
          ].join("\n"),
      },
      {
        method: "GET",
        path: "/document/list",
        summary: "List dokumen milik user.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          query: "sortBy (asc|desc|recent|least)",
        },
        response: `{
  "statusCode": 200,
  "message": "Items found successfully",
  "data": []
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          `curl "${baseUrl}/document/list?sortBy=recent" \\\n  -H "Authorization: Bearer ${token}"`,
      },
      {
        method: "GET",
        path: "/document/detail/:slug",
        summary: "Detail dokumen + perhitungan total.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "slug",
        },
        response: `{
  "statusCode": 200,
  "message": "Documents found successfully",
  "data": {
    "id": 1,
    "name": "Dokumen A",
    "jobSections": [],
    "totalMaterialPrice": 0,
    "totalFeePrice": 0,
    "totalPrice": 0
  }
}`,
        notes: ["percentageBenefitsAndRisks wajib sudah terisi."],
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl "${baseUrl}/document/detail/dokumen-a-20260120000000" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/document/update/:id",
        summary: "Update nama atau checker/confirmer.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
          body:
            '{"name":"Dokumen A Updated","checkedById":2,"confirmedById":3}',
        },
        response: `{
  "statusCode": 200,
  "message": "Document  updated successfully",
  "data": {
    "id": 1,
    "name": "Dokumen A Updated",
    "slug": "dokumen-a-updated-20260120000000"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/document/update/1" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Dokumen A Updated","checkedById":2,"confirmedById":3}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/document/update/general-info/:slug",
        summary: "Update job, location, base.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "slug",
          body: '{"job":"Pekerjaan A","location":"Jakarta","base":"Base A"}',
        },
        response: `{
  "statusCode": 200,
  "message": "Document general info updated successfully",
  "data": {
    "id": 1,
    "job": "Pekerjaan A",
    "location": "Jakarta",
    "base": "Base A"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/document/update/general-info/dokumen-a-20260120000000" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"job":"Pekerjaan A","location":"Jakarta","base":"Base A"}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/document/update/percentage/:slug",
        summary: "Update persentase benefits/risks.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "slug",
          body: '{"percentageBenefitsAndRisks":10}',
        },
        response: `{
  "statusCode": 200,
  "message": "Percentage benefits and risks updated successfully",
  "data": {
    "id": 1,
    "percentageBenefitsAndRisks": 10
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/document/update/percentage/dokumen-a-20260120000000" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"percentageBenefitsAndRisks":10}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/document/update/recapitulation-location/:slug",
        summary: "Update recapitulation location.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "slug",
          body: '{"recapitulationLocation":"Jakarta"}',
        },
        response: `{
  "statusCode": 200,
  "message": "Recapitulation location updated successfully",
  "data": {
    "id": 1,
    "recapitulationLocation": "Jakarta"
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/document/update/recapitulation-location/dokumen-a-20260120000000" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"recapitulationLocation":"Jakarta"}'`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/document/delete/:id",
        summary: "Hapus dokumen.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Document deleted successfully"
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X DELETE "${baseUrl}/document/delete/1" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
    ],
  },
  {
    id: "job-section",
    title: "Job Section",
    description: "Section pekerjaan di dokumen.",
    endpoints: [
      {
        method: "POST",
        path: "/job-section/create",
        summary: "Buat job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          body: '{"name":"Pekerjaan A","documentId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Job section created successfully",
  "data": {
    "id": 1,
    "name": "Pekerjaan A",
    "documentId": 1
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X POST "${baseUrl}/job-section/create" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Pekerjaan A","documentId":1}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/job-section/update/:id",
        summary: "Update job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
          body: '{"name":"Pekerjaan A Updated","documentId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Job section updated successfully",
  "data": {
    "id": 1,
    "name": "Pekerjaan A Updated",
    "documentId": 1
  }
}`,
        notes: ["documentId tetap wajib dikirim di body."],
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/job-section/update/1" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Pekerjaan A Updated","documentId":1}'`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/job-section/delete/:id",
        summary: "Hapus job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Job section removed successfully"
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X DELETE "${baseUrl}/job-section/delete/1" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
    ],
  },
  {
    id: "item-job-section",
    title: "Item Job Section",
    description: "Item di dalam job section.",
    endpoints: [
      {
        method: "POST",
        path: "/item-job-section/create",
        summary: "Buat item job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          body:
            '{"name":"Item Pekerjaan A","volume":10,"minimumVolume":1,"materialPricePerUnit":1000,"feePricePerUnit":200,"unit":"m","information":"Info","jobSectionId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Item job section created successfully",
  "data": {
    "id": 1,
    "name": "Item Pekerjaan A",
    "jobSectionId": 1
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X POST "${baseUrl}/item-job-section/create" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Item Pekerjaan A","volume":10,"minimumVolume":1,"materialPricePerUnit":1000,"feePricePerUnit":200,"unit":"m","information":"Info","jobSectionId":1}'`,
          ].join("\n"),
      },
      {
        method: "PATCH",
        path: "/item-job-section/update/:id",
        summary: "Update item job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
          body:
            '{"name":"Item Pekerjaan A Updated","volume":12,"minimumVolume":1,"materialPricePerUnit":1000,"feePricePerUnit":200,"unit":"m","information":"Info","jobSectionId":1}',
        },
        response: `{
  "statusCode": 200,
  "message": "Item job section updated successfully",
  "data": {
    "id": 1,
    "name": "Item Pekerjaan A Updated",
    "jobSectionId": 1
  }
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X PATCH "${baseUrl}/item-job-section/update/1" \\`,
            `  -H "Authorization: Bearer ${token}" \\`,
            `  -H "Content-Type: application/json" \\`,
            `  -d '{"name":"Item Pekerjaan A Updated","volume":12,"minimumVolume":1,"materialPricePerUnit":1000,"feePricePerUnit":200,"unit":"m","information":"Info","jobSectionId":1}'`,
          ].join("\n"),
      },
      {
        method: "DELETE",
        path: "/item-job-section/delete/:id",
        summary: "Hapus item job section.",
        auth: "Bearer",
        request: {
          headers: "Authorization: Bearer <token>",
          path: "id",
        },
        response: `{
  "statusCode": 200,
  "message": "Item job section removed successfully"
}`,
        curl: (baseUrl, token = "YOUR_TOKEN") =>
          [
            `curl -X DELETE "${baseUrl}/item-job-section/delete/1" \\`,
            `  -H "Authorization: Bearer ${token}"`,
          ].join("\n"),
      },
    ],
  },
];

const methodStyles: Record<Endpoint["method"], string> = {
  GET: "bg-emerald-100 text-emerald-700",
  POST: "bg-blue-100 text-blue-700",
  PATCH: "bg-amber-100 text-amber-700",
  DELETE: "bg-red-100 text-red-700",
};

export default function ApiDocsClient() {
  const [baseUrl, setBaseUrl] = useState("http://localhost:3002");
  const [token, setToken] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const normalizedBaseUrl = baseUrl.trim()
    ? baseUrl.trim().replace(/\/+$/, "")
    : "http://localhost:3002";
  const tokenValue = token.trim() ? token.trim() : "YOUR_TOKEN";

  const handleCopy = async (value: string, id: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1500);
    } catch {
      window.prompt("Copy cURL:", value);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              EO Nest API Docs
            </h1>
            <p className="text-sm text-gray-600">
              Dokumentasi lengkap endpoint, siap dicopy ke Postman.
            </p>
          </div>
          <div className="rounded-full bg-primaryBlue/10 px-3 py-1 text-xs font-semibold text-primaryBlue">
            Base: {normalizedBaseUrl}
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-gray-600">
            Base URL
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primaryBlue"
              value={baseUrl}
              onChange={(event) => setBaseUrl(event.target.value)}
              placeholder="http://localhost:3002"
            />
          </label>
          <label className="space-y-1 text-sm text-gray-600">
            Access Token (optional)
            <input
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-primaryBlue"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="paste token here"
            />
          </label>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          Klik tombol Copy cURL lalu paste ke Postman &gt; Import &gt; Raw text.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="h-fit rounded-2xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Groups
          </p>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
            {apiGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:border-primaryBlue hover:text-primaryBlue"
              >
                {group.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-10">
          {apiGroups.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-24">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {group.title}
                </h2>
                {group.description ? (
                  <p className="text-sm text-gray-600">{group.description}</p>
                ) : null}
              </div>
              <div className="space-y-5">
                {group.endpoints.map((endpoint) => {
                  const curlText = endpoint.curl(
                    normalizedBaseUrl,
                    tokenValue,
                  );
                  const copyId = `${group.id}-${endpoint.method}-${endpoint.path}`;

                  return (
                    <article
                      key={copyId}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${methodStyles[endpoint.method]}`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-semibold text-gray-900">
                          {endpoint.path}
                        </code>
                        <span className="text-sm text-gray-600">
                          {endpoint.summary}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="rounded-full bg-gray-100 px-2 py-1">
                          Auth: {endpoint.auth}
                        </span>
                        {endpoint.request?.path ? (
                          <span className="rounded-full bg-gray-100 px-2 py-1">
                            Path: {endpoint.request.path}
                          </span>
                        ) : null}
                        {endpoint.request?.query ? (
                          <span className="rounded-full bg-gray-100 px-2 py-1">
                            Query: {endpoint.request.query}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Request
                          </p>
                          {endpoint.request?.headers ? (
                            <div>
                              <p className="text-xs font-semibold text-gray-600">
                                Headers
                              </p>
                              <pre className="mt-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                                {endpoint.request.headers}
                              </pre>
                            </div>
                          ) : null}
                          {endpoint.request?.body ? (
                            <div>
                              <p className="text-xs font-semibold text-gray-600">
                                Body (JSON)
                              </p>
                              <pre className="mt-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                                {endpoint.request.body}
                              </pre>
                            </div>
                          ) : null}
                          {endpoint.request?.form ? (
                            <div>
                              <p className="text-xs font-semibold text-gray-600">
                                Form Data
                              </p>
                              <pre className="mt-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                                {endpoint.request.form}
                              </pre>
                            </div>
                          ) : null}
                          {endpoint.notes?.length ? (
                            <div>
                              <p className="text-xs font-semibold text-gray-600">
                                Notes
                              </p>
                              <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-gray-600">
                                {endpoint.notes.map((note) => (
                                  <li key={note}>{note}</li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                        <div className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Response
                          </p>
                          <pre className="rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                            {endpoint.response ?? "Response depends on service."}
                          </pre>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            cURL
                          </p>
                          <button
                            type="button"
                            onClick={() => handleCopy(curlText, copyId)}
                            className="rounded-full border border-primaryBlue px-3 py-1 text-xs font-semibold text-primaryBlue hover:bg-primaryBlue hover:text-white"
                          >
                            {copiedId === copyId ? "Copied" : "Copy cURL"}
                          </button>
                        </div>
                        <pre className="mt-2 rounded-lg bg-gray-900 p-4 text-xs text-white">
                          {curlText}
                        </pre>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
