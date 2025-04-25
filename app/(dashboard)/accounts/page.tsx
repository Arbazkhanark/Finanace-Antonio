"use client";
import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks";
import { useGetAccounts, useBulkDeleteAccounts } from "@/features/accounts/api";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";

const AccountsPage = () => {
  const newAccount = useNewAccount();
  const deleteAccount = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];


  console.log(accountsQuery,"accountsQuery")
  console.log(accounts,"accounts")

  const isDisabled = deleteAccount.isPending || accountsQuery.isLoading;
  if (accountsQuery.isLoading)
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button size={"sm"} onClick={newAccount.onOpen}>
            <Plus className="mr-2 size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            filterKey="name"
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccount.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsPage;













// "use client";
// import { useState, useEffect } from "react";
// import { Loader2, Plus } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import { useNewAccount } from "@/features/accounts/hooks"; // Form ke liye
// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/data-table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { columns } from "./columns";

// const AccountsPage = () => {
//   const { getToken } = useAuth();
//   const newAccount = useNewAccount(); // Form hook
//   const [accounts, setAccounts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         setIsLoading(true);
//         const token = await getToken();
//         console.log("Clerk Token:", token ? "Token Found" : "No Token");

//         if (!token) {
//           throw new Error("No auth token available");
//         }

//         const response = await fetch("http://localhost:3000/api/accounts", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Fetch Accounts Response Status:", response.status);

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch accounts: ${response.status} ${errorText}`);
//         }

//         const { data } = await response.json();
//         console.log("Fetched Accounts:", data);
//         setAccounts(data || []);
//       } catch (err) {
//         console.error("Error fetching accounts:", err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccounts();
//   }, [getToken]);

//   // Delete single account
//   const handleDelete = async (rows) => {
//     const ids = rows.map((row) => row.original.id);
//     try {
//       setIsDeleting(true);
//       const token = await getToken();
//       if (!token) {
//         throw new Error("No auth token available");
//       }

//       // Single delete ke liye loop mein har ID ke liye DELETE call
//       for (const id of ids) {
//         const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log(`Delete Account ${id} Response Status:`, response.status);

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to delete account ${id}: ${response.status} ${errorText}`);
//         }
//       }

//       // Update local state
//       setAccounts(accounts.filter((account) => !ids.includes(account.id)));
//     } catch (err) {
//       console.error("Error deleting accounts:", err);
//       setError(err.message);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardHeader>
//             <Skeleton className="h-8 w-48" />
//           </CardHeader>
//           <CardContent>
//             <div className="h-[500px] w-full flex items-center justify-center">
//               <Loader2 className="size-6 text-slate-300 animate-spin" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardContent>
//             <div>Error: {error}</div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//       <Card className="border-none drop-shadow-sm">
//         <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
//           <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
//           <Button size="sm" onClick={newAccount.onOpen} disabled={isLoading || isDeleting}>
//             <Plus className="mr-2 size-4" />
//             Add new
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             columns={columns}
//             data={accounts}
//             filterKey="name"
//             disabled={isLoading || isDeleting}
//             onDelete={handleDelete}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AccountsPage;













// "use client";
// import { useState, useEffect } from "react";
// import { Loader2, Plus } from "lucide-react";
// import { useAuth } from "@clerk/nextjs";
// import { useNewAccount } from "@/features/accounts/hooks"; // Form ke liye
// import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/data-table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { columns } from "./columns";

// const AccountsPage = () => {
//   const { getToken } = useAuth();
//   const newAccount = useNewAccount(); // Form hook
//   const [accounts, setAccounts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   // Fetch accounts
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       try {
//         setIsLoading(true);
//         const token = await getToken();
//         console.log("Clerk Token:", token ? "Token Found" : "No Token");

//         if (!token) {
//           throw new Error("No auth token available");
//         }

//         const response = await fetch("http://localhost:3000/api/accounts", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log("Fetch Accounts Response Status:", response.status);

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Failed to fetch accounts: ${response.status} ${errorText}`);
//         }

//         const { data } = await response.json();
//         console.log("Fetched Accounts:", data);
//         setAccounts(data || []);
//       } catch (err) {
//         console.error("Error fetching accounts:", err);
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAccounts();
//   }, [getToken]);

//   // Delete accounts using bulk-delete API
//   const handleDelete = async (rows) => {
//     const ids = rows.map((row) => row.original.id);
//     console.log("Deleting Accounts with IDs:", ids);

//     try {
//       setIsDeleting(true);
//       const token = await getToken();
//       if (!token) {
//         throw new Error("Bhai, token nahi mila!");
//       }

//       const response = await fetch("http://localhost:3000/api/accounts/bulk-delete", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ ids }),
//       });

//       console.log("Bulk Delete Response Status:", response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Delete nahi hua bhai: ${response.status} ${errorText}`);
//       }

//       // Update local state
//       setAccounts(accounts.filter((account) => !ids.includes(account.id)));
//       console.log("Accounts delete ho gaye, state updated!");
//     } catch (err) {
//       console.error("Delete mein gadbad:", err);
//       setError(err.message);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardHeader>
//             <Skeleton className="h-8 w-48" />
//           </CardHeader>
//           <CardContent>
//             <div className="h-[500px] w-full flex items-center justify-center">
//               <Loader2 className="size-6 text-slate-300 animate-spin" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardContent>
//             <div>Error: {error}</div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
//       <Card className="border-none drop-shadow-sm">
//         <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
//           <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
//           <Button size="sm" onClick={newAccount.onOpen} disabled={isLoading || isDeleting}>
//             <Plus className="mr-2 size-4" />
//             Add new
//           </Button>
//         </CardHeader>
//         <CardContent>
//           <DataTable
//             columns={columns}
//             data={accounts}
//             filterKey="name"
//             disabled={isLoading || isDeleting}
//             onDelete={handleDelete}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AccountsPage;