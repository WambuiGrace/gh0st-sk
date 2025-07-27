import { addTodo, getTodos } from '../../lib/db.js';

export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const category = url.searchParams.get('category');
    
    let todos;
    if (category && category !== 'all') {
      const { getTodosByCategory } = await import('../../lib/db.js');
      todos = await getTodosByCategory(category, limit, skip);
    } else {
      todos = await getTodos(limit, skip);
    }
    
    return new Response(JSON.stringify(todos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch todos' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function POST({ request }) {
  try {
    const formData = await request.formData();
    
    const todoText = formData.get('todoText');
    const userName = formData.get('userName') || 'Anonymous Doer';
    const category = formData.get('category') || 'other';
    const isPublic = formData.get('isPublic') === 'on';
    
    // Validation
    if (!todoText || todoText.length < 10 || todoText.length > 200) {
      return new Response(JSON.stringify({ 
        error: 'Todo text must be between 10 and 200 characters' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    
    const todoData = {
      text: todoText,
      user: userName,
      category,
      isPublic
    };
    
    const result = await addTodo(todoData);
    
    return new Response(JSON.stringify({ 
      success: true, 
      id: result.insertedId 
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding todo:', error);
    return new Response(JSON.stringify({ error: 'Failed to add todo' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
