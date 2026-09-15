export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    status: "open" | "in-progress" | "resolved";
    assignee: string | null;
}

export interface CreateTicketInput {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
}
