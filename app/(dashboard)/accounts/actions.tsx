"use client";
// schadcn components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// account api
import { useDeleteAccount } from "@/features/accounts/api";
// account hook
import { useOpenAccount } from "@/features/accounts/hooks";
// global hook
import { useConfirm } from "@/hooks/use-confirm";
// icons
import { Edit, MoreHorizontal, Trash } from "lucide-react";

export const Actions = ({ id }: { id: string }) => {
  const deleteMutation = useDeleteAccount(id);
  const { onOpen } = useOpenAccount();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Delete Account",
    "Are you sure you want to delete this account?"
  );
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate();
    }
  };
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => handleDelete()}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};









// "use client";
// import { useDeleteAccount } from "@/features/accounts/api";
// // account hook
// import { useOpenAccount } from "@/features/accounts/hooks";
// import { useEditAccount } from "@/features/accounts/api";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "@clerk/nextjs";
// import { useState } from "react";
// import { toast } from "sonner";

// export const EditAccountModal = () => {
//   const { id, isOpen, onClose } = useOpenAccount();
//   const { getToken } = useAuth();
//   const updateMutation = useEditAccount(id || "");
//   const [name, setName] = useState("");

//   // Fetch account details for prefill
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["account", id],
//     queryFn: async () => {
//       if (!id) return null;
//       const token = await getToken();
//       if (!token) throw new Error("Bhai, token nahi mila!");

//       const response = await fetch(`http://localhost:3000/api/accounts/${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Account fetch nahi hua: ${response.status} ${errorText}`);
//       }

//       return response.json();
//     },
//     enabled: !!id,
//     onSuccess: (response) => {
//       if (response?.data?.name) {
//         setName(response.data.name); // Prefill name
//       }
//     },
//     onError: (err: Error) => {
//       console.error("Fetch mein lafda:", err);
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: err.message || "Account details nahi mile!",
//       });
//     },
//   });

//   const handleSubmit = async () => {
//     try {
//       await updateMutation.mutateAsync({ name });
//       onClose(); // Modal band karo
//     } catch (err) {
//       // Error toast already handled in useUpdateAccount
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Edit Account</DialogTitle>
//         </DialogHeader>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div className="text-red-500">Error loading account details!</div>
//         ) : (
//           <div className="space-y-4">
//             <Input
//               placeholder="Account name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               disabled={updateMutation.isPending}
//             />
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={onClose}
//                 disabled={updateMutation.isPending}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 disabled={updateMutation.isPending || !name}
//               >
//                 Save
//               </Button>
//             </DialogFooter>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };