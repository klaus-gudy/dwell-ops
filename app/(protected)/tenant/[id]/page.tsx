"use client"

import { useState } from "react"
import { format } from "date-fns"
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  FileText, 
  Download,
  Eye,
  Edit,
  Plus,
  Building,
  User,
  CreditCard,
  Wrench,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Mock data - replace with actual data fetching
const tenantData = {
  id: "1",
  name: "Jabir Jabir",
  email: "jabir@gmail.com",
  phone: "N/A",
  nationalId: "19950123-12345-67890-12",
  status: "Active",
  joinDate: new Date("2025-06-22"),
  emergencyContacts: [
    {
      name: "Amina Jabir",
      relationship: "Sister",
      phone: "+255 712 345 678",
      email: "amina.jabir@email.com"
    },
    {
      name: "Hassan Jabir",
      relationship: "Father",
      phone: "+255 713 456 789",
      email: "hassan.jabir@email.com"
    }
  ],
  currentProperty: {
    name: "Kachua Apartments",
    unit: "102",
    address: "123 Kachua Street, Dar es Salaam",
    leaseStart: new Date("2025-01-01"),
    leaseEnd: new Date("2025-12-31"),
    monthlyRent: 450000,
    deposit: 900000,
    status: "Active"
  },
  propertyHistory: [
    {
      property: "Kachua Apartments",
      unit: "102",
      leaseStart: new Date("2025-01-01"),
      leaseEnd: new Date("2025-12-31"),
      status: "Current"
    }
  ],
  activities: [
    {
      id: "1",
      type: "lease_start",
      title: "Lease Agreement Signed",
      description: "Lease for Unit 102 at Kachua Apartments",
      date: new Date("2025-01-01"),
      icon: FileText,
      status: "completed"
    },
    {
      id: "2",
      type: "payment",
      title: "Rent Payment",
      description: "Monthly rent payment for January 2025",
      date: new Date("2025-01-05"),
      icon: DollarSign,
      status: "completed"
    },
    {
      id: "3",
      type: "maintenance",
      title: "Maintenance Request",
      description: "Leaking faucet in kitchen - Fixed",
      date: new Date("2025-02-15"),
      icon: Wrench,
      status: "completed"
    },
    {
      id: "4",
      type: "payment",
      title: "Rent Payment Due",
      description: "Monthly rent payment for July 2025",
      date: new Date("2025-07-01"),
      icon: DollarSign,
      status: "pending"
    }
  ],
  documents: [
    {
      id: "1",
      name: "Lease Agreement 2025",
      type: "lease_agreement",
      size: "2.3 MB",
      uploadDate: new Date("2025-01-01"),
      url: "/documents/lease-agreement-2025.pdf"
    },
    {
      id: "2",
      name: "Security Deposit Receipt",
      type: "receipt",
      size: "1.1 MB",
      uploadDate: new Date("2025-01-01"),
      url: "/documents/security-deposit-receipt.pdf"
    },
    {
      id: "3",
      name: "National ID Copy",
      type: "identification",
      size: "850 KB",
      uploadDate: new Date("2025-01-01"),
      url: "/documents/national-id-copy.pdf"
    },
    {
      id: "4",
      name: "Income Verification",
      type: "financial",
      size: "1.5 MB",
      uploadDate: new Date("2025-01-01"),
      url: "/documents/income-verification.pdf"
    }
  ]
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'lease_start':
    case 'lease_end':
      return FileText
    case 'payment':
      return DollarSign
    case 'maintenance':
      return Wrench
    default:
      return Calendar
  }
}

const getActivityStatus = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-600" />
    case 'overdue':
      return <AlertCircle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-gray-600" />
  }
}

export default function TenantProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container px-6 py-2 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Link
          href="/tenant"
          className="text-muted-foreground hover:text-foreground text-md"
        >
          Tenant
        </Link>
        <span className="text-muted-foreground text-md">/</span>
        <span>{tenantData.name}</span>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="property">Property & Lease</TabsTrigger>
          <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <Card className="gap-0 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center">
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p></p>
                <div className="grid grid-cols-1 space-y-2">
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-muted-foreground">Full name</label>
                    <p className="w-2/3 text-sm">{tenantData.name}</p>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-muted-foreground">Email address</label>
                    <p className="w-2/3 text-sm">{tenantData.email}</p>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-muted-foreground">Phone number</label>
                    <p className="w-2/3 text-sm">{tenantData.phone}</p>
                  </div>
                  <Separator />
                  <div className="flex items-center">
                    <label className="w-1/3 text-sm font-medium text-muted-foreground">National ID</label>
                    <p className="w-2/3 font-mono text-base">{tenantData.nationalId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="gap-0 shadow-none">
              <CardHeader>
                <CardTitle>Emergency contacts</CardTitle>
                <CardDescription className="pb-2">People to contact in case of emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tenantData.emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">{contact.name}</h4>
                      <Badge variant="secondary">{contact.relationship}</Badge>
                    </div>
                    <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span>{contact.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Property & Lease Tab */}
        <TabsContent value="property" className="space-y-6">
          <div className="space-y-6">
            {/* Current Lease Details */}
            <Card>
              <CardHeader>
                <CardTitle>Current Lease Details</CardTitle>
                <CardDescription>Active lease information and terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lease Start Date</label>
                    <p className="text-base">{format(tenantData.currentProperty.leaseStart, 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lease End Date</label>
                    <p className="text-base">{format(tenantData.currentProperty.leaseEnd, 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                    <p className="text-base font-medium">TSh {tenantData.currentProperty.monthlyRent.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Security Deposit</label>
                    <p className="text-base">TSh {tenantData.currentProperty.deposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lease Status</label>
                    <Badge className={getStatusColor(tenantData.currentProperty.status)}>
                      {tenantData.currentProperty.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property History */}
            <Card>
              <CardHeader>
                <CardTitle>Property History</CardTitle>
                <CardDescription>Previous and current property assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenantData.propertyHistory.map((property, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{property.property}</h4>
                          <Badge variant="outline">Unit {property.unit}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(property.leaseStart, 'MMM dd, yyyy')} - {format(property.leaseEnd, 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Timeline Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Chronological record of tenant interactions and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenantData.activities.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type)
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <IconComponent className="w-4 h-4 text-primary" />
                        </div>
                        {getActivityStatus(activity.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className="text-sm text-muted-foreground">
                            {format(activity.date, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Lease agreements, receipts, and other important documents</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tenantData.documents.map((document) => (
                  <div key={document.id} className="p-4 transition-shadow border rounded-lg hover:shadow-md">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <h4 className="text-sm font-medium">{document.name}</h4>
                          <p className="text-xs capitalize text-muted-foreground">{document.type.replace('_', ' ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs text-muted-foreground">
                      <p>Size: {document.size}</p>
                      <p>Uploaded: {format(document.uploadDate, 'MMM dd, yyyy')}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" variant="outline" className="gap-1 text-xs">
                        <Eye className="w-3 h-3" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1 text-xs">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}