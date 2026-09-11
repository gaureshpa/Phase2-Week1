export type Route = 
    | { type: "list-tasks" }
    | { type: "get-task"; id: number}
    | { type: "create-task" }
    | { type: "update-task"; id: number}
    | { type: "delete-task"; id: number}
    | { type: "not-found" }

