'use client';

import { useEffect, useState } from "react";
// import { AssignUnitSchema } from "@/schemas";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Unit } from "@/types/property";
import { getAllTenants } from "@/lib/db/tenant";
import { SelectTenant } from "@/types/tenant";
import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { assignUnitToTenant } from "@/lib/db/unit";

const AssignUnitSchema = z.object({
  unitId: z.string(),
  tenantId: z.string(),
});

export function AssignUnitDialog() {
  const [open, setOpen] = useState(false);
  const [tenants, setTenants] = useState<SelectTenant[]>([]);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);

  const form = useForm<z.infer<typeof AssignUnitSchema>>({
    resolver: zodResolver(AssignUnitSchema),
    defaultValues: {
      unitId: "1", // Placeholder unit ID, replace with actual unit ID
      tenantId: "",
    },
  });

  async function fetchTenants() {
    setIsLoadingTenants(true);
    try {
      const fetchedTenants = await getAllTenants();
      setTenants(
        fetchedTenants.map((tenant) => ({
          ...tenant,
          name: tenant.name ?? "Unknown Tenant",
        }))
      );
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setIsLoadingTenants(false);
    }
  }

  useEffect(() => {
    fetchTenants();
  }, []);

  async function onSubmit(values: z.infer<typeof AssignUnitSchema>) {
    console.log("Form values:", values);
    try {
    //   toast.promise(assignUnitToTenant(values), {
    //     loading: "Assigning unit...",
    //     success: "Unit assigned successfully.",
    //     error: "Failed to assign unit. Please try again.",
    //   });
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error assigning unit:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-sm font-medium cursor-pointer text-primary hover:underline">
          Assign Unit
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Unit to Tenant</DialogTitle>
          <DialogDescription>
            Select a tenant to assign this unit.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-1 pr-2 space-y-4"
          >
            <FormField
              control={form.control}
              name="unitId"
              render={() => (
                <FormItem>
                  <FormLabel>Unit name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Unit name"
                      type="text"
                      value="Unit 1" // Placeholder, replace with actual unit name
                      readOnly
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tenantId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select tenant</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            isLoadingTenants
                              ? "Loading tenants..."
                              : "Choose an existing tenant"
                          }
                          className="w-full"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingTenants ? (
                        <div className="flex items-center justify-center py-4">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span className="ml-2 text-sm">Loading tenants...</span>
                        </div>
                      ) : tenants.length === 0 ? (
                        <div className="flex items-center justify-center py-4">
                          <span className="text-sm text-gray-500">No tenants found</span>
                        </div>
                      ) : (
                        tenants.map((tenant) => (
                          <SelectItem
                            key={tenant.id}
                            value={tenant.id.toString()}
                          >
                            {tenant.name} ({tenant.email})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Assign Unit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}