export interface SelectTenant {
    id: string;
    name: string;
    email: string;
}

export interface Tenant {
    id: string
    name: string
    phoneNo: string
    email: string
    status: string
    unitName: string
    propertyName: string
    leaseEndingDate: Date | null
    createdAt: Date
  }