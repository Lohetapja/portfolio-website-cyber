document.addEventListener('DOMContentLoaded', () => {
    // Load projects
    loadProjects();

    // Update the year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

/*
// Function to fetch and display projects
function loadProjects() {
    fetch('/api/projects')
        .then(response => response.json())
        .then(projects => {
            const projectGrid = document.querySelector('.project-container');
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-item';
                projectCard.innerHTML = `
                    <img src="${project.imageUrl}" alt="${project.title}" class="project-thumbnail">
                    <div class="project-details">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.projectUrl}" target="_blank" class="btn">View Project</a>
                    </div>
                `;
                projectGrid.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
}
*/