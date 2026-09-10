import { addTask, completeTask, deleteTask, filterTasks, listTasks } from "../services/task-service";

async function handleCommand(args: string[]): Promise<void> {
    const command = args[0];

    switch(command) {
        case "add": {
            const title = args.slice(1).join(" ");

            if(!title.trim()) {
                throw new Error("Task little is required");
            }

            const task = await addTask(title);
            console.log(`Task added: [${task.id}] ${task.title}`);
            break;
        }

        case "list": {
            const tasks = await listTasks();

            if (tasks.length === 0) {
                console.log("No tasks found");
                break;
            }

            for (const task of tasks) {
                const status = task.completed ? "Done" : " ";
                console.log(`[${status}] ${task.id}: ${task.title}`);
            }

            break;
        }

        case "complete": {
            const id = Number(args[1]);

            if (!Number.isInteger(id)) {
                throw new Error("A valid task ID is required");
            }

            const task = await completeTask(id);
            console.log(`Task completed: [${task.id}] ${task.title}`);
            break
        }

        case "delete": {
            const id = Number(args[1]);

            if (!Number.isInteger(id)) {
                throw new Error("A valid task ID is required");
            }

            await deleteTask(id);
            console.log(`Task deleted: ${id}`);
            break;
        }

        case "filter": {
            const filter = args[1];

            if (
                filter !== "all" &&
                filter !== "completed" &&
                filter !== "pending" 
            ) {
                throw new Error("Filter must be: all, completed, or pending.");
            }

            const tasks = await filterTasks(filter);

            if (tasks.length === 0) {
                console.log("No tasks found");
                break;
            }

            for (const task of tasks) {
                const status = task.completed ? "Done": " ";
                console.log(`[${status}] ${task.id}: ${task.title}`);
            }

            break;
        }

        default:
            throw new Error("Unknown command. Use: add, list, complete, delete, or filter");
    }
}

const args = process.argv.slice(2);

handleCommand(args).catch((error: unknown) => {
    if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
    }
    else {
        console.error("An unexpected error occured");
    }

    process.exitCode = 1;
});
