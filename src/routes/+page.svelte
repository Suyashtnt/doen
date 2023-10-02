<script lang="ts">
    import { browser } from "$app/environment";
    import { flip } from 'svelte/animate'

    interface Todo {
        done: boolean
        id: string
        text: string
    }

    let todos: Todo[] = []

    const addTodo = (text: string) => {
        todos = [
            ...todos,
            {
                done: false,
                id: createUniqueId(),
                text,
            },
        ]
    }

    const removeTodo = (id: string) => {
        todos = todos.filter(todo => todo.id !== id)
    }

    const createUniqueId = () => {
        let id = window.crypto.randomUUID()

        const todoExists = todos.find(todo => todo.id === id)
        if (todoExists) {
            id = createUniqueId()
        }

        return id
    }

    if (browser) {
        const rawTodos = localStorage.getItem('todos')

        if (rawTodos) {
            todos = JSON.parse(rawTodos)
        }
    }

    $: if (browser) {
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    let newTodo = ''

    let showDone = true

    $: todoList = showDone ? todos : todos.filter(todo => !todo.done)
</script>

<div class="flex flex-row gap-4 mb-4">
    <h3 class="my-auto">Todos</h3>
    <div class="flex gap-4 items-center">
        <label for="show-done">Show done</label>
        <input
            type="checkbox"
            bind:checked={showDone}
            id="show-done"
        >
    </div>
</div>

<ul class="flex flex-col">
    {#each todoList as todo (todo.id)}
        <li class="grid grid-cols-6 gap-4" animate:flip={{ duration: 150 }}>
            <input
                type="text"
                bind:value={todo.text}
                class="col-span-4 {todo.done ? 'bg-green-500/40' : ''}"
            >

            <button
                on:click={() => todo.done = !todo.done}
                class:bg-red-500={todo.done}
                class:bg-blue-500={!todo.done}
            >
                {#if todo.done}
                    Unmark
                {:else}
                    Mark Done
                {/if}
            </button>
            <button on:click={() => removeTodo(todo.id)}>Remove</button>
        </li>
    {/each}
</ul>

<form
    on:submit|preventDefault={() => addTodo(newTodo)}
    class="grid grid-cols-7 gap-4"
>
    <input
        type="text"
        bind:value={newTodo}
        placeholder="What needs to be done?"
        class="col-span-6"
    >
    <button type="submit">Add</button>
</form>
