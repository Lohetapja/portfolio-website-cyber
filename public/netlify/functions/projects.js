// netlify/functions/projects.js
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
    }
  
    const projects = [
      { id: 1, title: 'Project One', description: 'This is the first project' },
      { id: 2, title: 'Project Two', description: 'This is the second project' }
    ];
  
    return {
      statusCode: 200,
      body: JSON.stringify(projects)
    };
  };
  