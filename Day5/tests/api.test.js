import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import fs from "fs/promises";

import app from "../src/app.ts";

const filePath = "./data/tickets.json";

beforeEach(async () => {
    await fs.writeFile(filePath, "[]");
});
describe("Ticket API", () => {

    it("should create a ticket", async () => {
        const response = await request(app)
            .post("/tickets")
            .send({
                title: "Dark Mode Problem",
                description: "Can't toggle to dark mode",
                priority: "high"
            });

        expect(response.status).toBe(201);
    });


    it("should get all tickets", async () => {
        await request(app)
            .post("/tickets")
            .send({
                title: "Dark Mode Problem",
                description: "Can't toggle to dark mode",
                priority: "high"
            });
        
        const response = await request(app)
            .get("/tickets");

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });

    it("should get a ticket by ID", async () => {
        const createResponse = await request(app)
            .post("/tickets")
            .send({
                title: "Dark Mode Problem",
                description: "Can't toggle to dark mode",
                priority: "high"
            });
        
        const id = createResponse.body.id;
        const response = await request(app)
            .get(`/tickets/${id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(id);
    });


    it("should update ticket status", async () => {
        const createResponse = await request(app)
            .post("/tickets")
            .send({
                title: "Dark Mode Problem",
                description: "Can't toggle to dark mode",
                priority: "high"
            });
        
        const id = createResponse.body.id;
        const response = await request(app)
            .patch(`/tickets/${id}/status`)
            .send({
                status: "resolved"
            });
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("resolved");
    });


    it("should delete a ticket", async () => {
        const createResponse = await request(app)
            .post("/tickets")
            .send({
                title: "Dark Mode Problem",
                description: "Can't toggle to dark mode",
                priority: "high"
            });
        
        const id = createResponse.body.id;
        const response = await request(app)
            .delete(`/tickets/${id}`);
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Ticket deleted successfully");
    });

});