"use client";

import { useState } from "react";
import { AddUnitSchema } from "@/schemas";
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

import {  createUnit } from "@/lib/db/property";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddUnitDialog({ propertyId }: { propertyId: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof AddUnitSchema>>({
    resolver: zodResolver(AddUnitSchema),
    defaultValues: {
        propertyId: propertyId,
        name: "",
        status: "vacant",
        baseRent: 0,
    }
  });

async function onSubmit(values: z.infer<typeof AddUnitSchema>) {
    console.log("Form values:", values);
    try {
        toast.promise(
            createUnit(values),
            {
                loading: "Creating unit...",
                success: "Unit created successfully.",
                error: "Failed to create unit. Please try again.",
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
        <Button size="sm" className="gap-1">
          <Plus className="w-4 h-4" /> Add new unit
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add new unit</DialogTitle>
          <DialogDescription>
            Enter the details for the new unit listing.
          </DialogDescription>
        </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-1 pr-2 space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit number</FormLabel>
                    <FormControl>
                      <Input placeholder="101" type="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="baseRent"
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
                <Button type="submit">Add unit</Button>
              </div>
            </form>
          </Form>
      </DialogContent>
    </Dialog>
  );
}
