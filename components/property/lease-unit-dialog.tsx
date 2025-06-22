"use client";

import { useEffect, useState } from "react";
import {  CreateLeaseSchema } from "@/schemas";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";  
import { Unit } from "@/types/property";
import { getAllTenants } from "@/lib/db/tenant";
import { SelectTenant } from "@/types/tenant";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createLease } from "@/lib/db/lease";


export function CreateLeaseDialog({ unit }: { unit: Unit }) {
  const [open, setOpen] = useState(false);
  const [tenants, setTenants] = useState<SelectTenant[]>([]);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);

  const form = useForm<z.infer<typeof CreateLeaseSchema>>({
    resolver: zodResolver(CreateLeaseSchema),
    defaultValues: {
        unitId: unit.id,
        tenantId: "",
        monthlyRent: "",
        startDate: new Date().toISOString().split("T")[0], 
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split("T")[0],
    }
  });

  async function fetchTenants() {
    setIsLoadingTenants(true);
    try {
      const fetchedTenants = await getAllTenants();
      setTenants(fetchedTenants.map(tenant => ({
        ...tenant,
        name: tenant.name ?? "Unknown Tenant",
      })));
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setIsLoadingTenants(false);
    }
  }
  
  useEffect(() => {
    fetchTenants();
  }, []);


async function onSubmit(values: z.infer<typeof CreateLeaseSchema>) {
    console.log("Form values:", values);
    try {
        toast.promise(
            createLease(values),
            {
                loading: "Creating lease...",
                success: "Lease created successfully.",
                error: "Failed to lease unit. Please try again.",
            }
        );
        form.reset();
        setOpen(false);
    } catch (error) {
        console.error("Error creating unit:", error);
    }
}


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span className="text-sm font-medium cursor-pointer text-primary hover:underline">
          Available for rent
        </span>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create a new lease</DialogTitle>
          <DialogDescription>
            Enter lease agreement details for this unit.
          </DialogDescription>
        </DialogHeader>
        {/* <Card className="gap-2 py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-md">Unit Information</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Unit number:</span> {unit.name}
              </div>
              <div>
                <span className="font-medium">Floor:</span>{" "}
                {unit.floorNumber ?? "N/A"}
              </div>
              <div>
                <span className="font-medium">Base rent:</span> ${unit.baseRent}
              </div>
              <div>
                <span className="font-medium">Status:</span>{" "}
                {unit.status === "OCCUPIED" ? "Occupied" : "Vacant"}
              </div>
            </div>
          </CardContent>
        </Card> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-1 pr-2 space-y-4"
          >
            <FormField
              control={form.control}
              name="unitId"
              render={({ }) => (
                <FormItem>
                  <FormLabel>Unit name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Unit name"
                      type="text"
                      value={unit.name}
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease start date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease end date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="monthlyRent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly rent</FormLabel>
                  <FormControl>
                    <Input placeholder="150,000" type="" {...field} />
                  </FormControl>

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
              <Button type="submit">Create lease </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
