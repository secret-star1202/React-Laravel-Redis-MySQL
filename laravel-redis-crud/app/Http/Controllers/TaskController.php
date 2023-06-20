<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class TaskController extends Controller
{
    public function index()
    {
        $tasksFromRedis = json_decode(Redis::get('tasks'));


        if ($tasksFromRedis) {
            foreach ($tasksFromRedis as $task) {
                $task->source = 'Redis';
            }
        } else {
            $tasksFromDatabase = Task::all();

            foreach ($tasksFromDatabase as $task) {
                $task->source = 'Database';
            }

            Redis::set('tasks', json_encode($tasksFromDatabase));

            $tasksFromRedis = $tasksFromDatabase;
        }

        return response()->json($tasksFromRedis);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
        ]);

        $task = Task::create($request->all());

        $tasks = Task::all();

        Redis::del('tasks.');

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->title = $request->title;
        $task->save();

        Redis::del('tasks');
        $tasks = Task::all();
        Redis::set('tasks', json_encode($tasks));

        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        $task->delete();

        Redis::del('tasks');
        $tasks = Task::all();
        Redis::set('tasks', json_encode($tasks));

        return response()->json(null, 204);
    }
}
