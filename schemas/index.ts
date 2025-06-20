import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export const AddPropertySchema = z.object({
    name: z.string().min(1, "Property name is required"),
    description: z.string().optional(),

    street: z.string().min(1, "Street is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),

    buildingType: z.string().optional(),
    yearBuilt: z.coerce.number().int().min(1900, "Year must be at least 1900").max(new Date().getFullYear(), "Year cannot be in the future").optional(),
    areaInSquareFeet: z.coerce.number().positive("Area must be positive").optional(),
    numberOfFloors: z.coerce.number().int().positive("Floors must be a positive integer").optional(),
    parkingSpaces: z.coerce.number().int().min(0, "Parking spaces cannot be negative").optional(),
    // amenities: z.string().optional(),
});

export const AddUnitSchema = z.object({
    propertyId: z.string().min(1, "Property ID is required"),
    name: z.string().min(1, "Unit name is required"),
    status: z.string().min(1, "Status is required"),
    floorNumber: z.coerce.number().int().positive("Floor number must be a positive integer").optional(),
    baseRent: z.coerce.number().positive("Base rent must be a positive number"),
});