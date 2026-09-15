import express from "express";
import { getTickets, saveTickets } from "./ticketStore.js";
import { Ticket } from "./types.js";
import { validateCreateTicket, isValidAssignee, isValidStatus, isValidId } from "./validation.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    const tickets = await getTickets();

    res.json(tickets);
});

app.post("/tickets", async(req, res) => {
    const error = validateCreateTicket(req.body);

    if (error) {
        res.status(400).json({
            messagge: error
        });
        return;
    }

    const input = req.body; 
    const tickets = await getTickets();

    const newId = tickets.length === 0 
        ? 1 
        : Math.max(...tickets.map((ticket) => ticket.id)) + 1;

    const ticket: Ticket = {
        id: newId,
        title: input.title,
        description: input.description,
        priority: input.priority,
        status: "open",
        assignee: null
    };

    tickets.push(ticket);
    await saveTickets(tickets);

    res.status(201).json(ticket);
})

app.get("/tickets", async(req, res) => {
    const tickets = await getTickets();
    res.json(tickets);
});

app.get("/tickets/:id", async(req, res) => {

    if (!isValidId(req.params.id)) {
        res.status(400).json({
            message: "Invalid ticket ID"
        });
        return;
    }

    const id = Number(req.params.id);
    const tickets = await getTickets();
    const ticket = tickets.find((ticket) => ticket.id === id);

    if(!ticket) {
        res.status(404).json({
            message: "Ticket not found"
        });
        return;
    }

    res.json(ticket);
});

app.patch("/tickets/:id/status", async(req, res) => {

    if(!isValidId(req.params.id)) {
        res.status(400).json({
            message: "Invalid ticket ID"
        });
        return;
    }

    const id = Number(req.params.id);
    const { status } = req.body;

    if (!isValidStatus(status)) {
        res.status(400).json({
            message: "Status must be open, in-progress or resolved"
        });
    }

    const tickets = await getTickets();
    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
        res.status(404).json({
            message: "Ticket not found"
        });
        return;
    }

    ticket.status = status;
    await saveTickets(tickets);

    res.json(ticket);
});

app.patch("/tickets/:id/assign", async(req, res) => {

    if (!isValidId(req.params.id)) {
        res.status(400).json({
            message: "Invalid ticket ID"
        });
        return;
    }

    const id = Number(req.params.id);
    const { assignee } = req.body;

    if (!isValidAssignee(assignee)) {
        res.status(400).json({
            message: "Assignee must be a non-empty string or null"
        });
        return;
    }

    const tickets = await getTickets();
    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
        res.status(404).json({
            message: "Ticket not found"
        });
        return;
    }

    ticket.assignee = assignee;
    await saveTickets(tickets);

    res.json(ticket);

});


app.delete("/tickets/:id", async(req, res) => {

    if (!isValidId(req.params.id)) {
        res.status(400).json({
            message: "Invalid ticket ID"
        });
        return;
    }

    const id = Number(req.params.id);
    const tickets = await getTickets();
    const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);

    if (ticketIndex === -1) {
        res.status(404).json({
            message: "Ticket not found"
        });
        return;
    }

    tickets.splice(ticketIndex, 1);
    await saveTickets(tickets);
    res.json({
        message: "Ticker deleted successfully"
    });

});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
