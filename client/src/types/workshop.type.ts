export interface Workshop {
    _id: string
    workshopId: string
    name: string
    email: string
    city: string
    state: string
    country: string
    streetAddress: string
    approvalStatus: "approved" | "pending" | "rejected"
    isActive: boolean
    isBlocked: boolean
    bio?: string
    image?: string | null
    rejectionReason?: string
}