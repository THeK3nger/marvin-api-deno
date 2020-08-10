import { MarvinTask } from "./datamodel/Task.ts";
import { MarvinTrackedTask } from "./datamodel/TrackedTask.ts";
import { Label } from "./datamodel/Label.ts";

export class MarvinClient {
  MARVIN_URL = "https://serv.amazingmarvin.com/api";

  constructor(readonly api_token: string) {}

  public async test(): Promise<boolean> {
    const response = await this.marvinRequest("POST", "/test");
    return (await response.text()) == "OK";
  }

  public async createTask(task: Partial<MarvinTask>): Promise<MarvinTask> {
    const response = await this.marvinRequest(
      "POST",
      "/addTask",
      JSON.stringify(task)
    );

    return await response.json();
  }

  public async createProject(task: Partial<MarvinTask>): Promise<MarvinTask> {
    task.title = `p: ${task.title}`;
    const response = await this.marvinRequest(
      "POST",
      "/addTask",
      JSON.stringify(task)
    );

    return await response.json();
  }

  public async getTrackedTask(): Promise<MarvinTrackedTask> {
    const response = await this.marvinRequest("GET", "/trackedItem");
    return await response.json();
  }

  public async getScheduledTodayTask(): Promise<MarvinTask[]> {
    const response = await this.marvinRequest("GET", "/todayItems");
    return await response.json();
  }

  public async getDueTodayTask(): Promise<MarvinTask[]> {
    const response = await this.marvinRequest("GET", "/dueItems");
    return await response.json();
  }

  public async getLabels(): Promise<Label[]> {
    const response = await this.marvinRequest("GET", "/labels");
    return await response.json();
  }

  private async marvinRequest(
    method: "POST" | "GET",
    endpoint: string,
    body?: string
  ): Promise<Response> {
    return fetch(`${this.MARVIN_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "X-API-Token": this.api_token,
      },
      body: body,
    });
  }
}
