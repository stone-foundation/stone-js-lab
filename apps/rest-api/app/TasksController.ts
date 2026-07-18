import { ILogger } from '@stone-js/core'
import { Delete, EventHandler, Get, Post } from '@stone-js/router'
import { IncomingHttpEvent, JsonHttpResponse, NotFoundError } from '@stone-js/http-core'

/**
 * A task record.
 */
export interface Task {
  id: number
  title: string
  done: boolean
}

/**
 * Tasks REST controller.
 *
 * `@EventHandler('/tasks')` groups the routes under `/tasks`; each method is a route. This
 * single controller exercises: GET collection, GET one with a regex path param, POST with a
 * parsed JSON body, PATCH-like toggle, DELETE with a 204, and a 404 via a thrown HttpError.
 *
 * Note (0.8.0): route params are now raw strings (no implicit numeric coercion), so numeric
 * ids are parsed explicitly with `Number(...)` — exactly the real-world behaviour the lab
 * exists to confirm.
 */
@EventHandler('/tasks', { name: 'tasks' })
export class TasksController {
  private readonly logger: ILogger
  private tasks: Task[] = [{ id: 1, title: 'Try Stone.js', done: false }]
  private sequence = 1

  /**
   * @param dependencies - Auto-wired services.
   */
  constructor ({ logger }: { logger: ILogger }) {
    this.logger = logger
  }

  /**
   * List all tasks.
   */
  @Get('/', { name: 'list' })
  @JsonHttpResponse(200)
  list (): Task[] {
    return this.tasks
  }

  /**
   * Show a single task by numeric id.
   */
  @Get('/:id(\\d+)', { name: 'show' })
  @JsonHttpResponse(200)
  show (event: IncomingHttpEvent): Task {
    return this.find(Number(event.get<string>('id', '0')))
  }

  /**
   * Create a task from the JSON body.
   */
  @Post('/', { name: 'create' })
  @JsonHttpResponse(201)
  create (event: IncomingHttpEvent): Task {
    const task: Task = { id: ++this.sequence, title: event.get<string>('title', 'Untitled'), done: false }
    this.tasks.push(task)
    this.logger.info(`Created task #${task.id}`)
    return task
  }

  /**
   * Toggle a task's done flag.
   */
  @Post('/:id(\\d+)/toggle', { name: 'toggle' })
  @JsonHttpResponse(200)
  toggle (event: IncomingHttpEvent): Task {
    const task = this.find(Number(event.get<string>('id', '0')))
    task.done = !task.done
    return task
  }

  /**
   * Delete a task.
   */
  @Delete('/:id(\\d+)', { name: 'remove' })
  @JsonHttpResponse(204)
  remove (event: IncomingHttpEvent): void {
    this.tasks = this.tasks.filter((task) => task.id !== Number(event.get<string>('id', '0')))
  }

  /**
   * Find a task or throw a 404.
   */
  private find (id: number): Task {
    const task = this.tasks.find((t) => t.id === id)
    if (task === undefined) {
      throw new NotFoundError(`Task #${id} not found.`)
    }
    return task
  }
}
