'use strict';
// Projects
const projects = document.querySelector('.projects');
console.log(projects);

const result = async () => await (await fetch('./data/projects.json')).json();
result().then(data => {
	data.sort((a, b) => b.stars - a.stars).forEach(d => addProject(d));
});

function addProject(d) {
	const project = document.createElement('div');
	project.classList.add('project');
	const i = document.createElement('i');
	i.classList.add('fa-regular', 'fa-star');
	project.append(i);
	const div = document.createElement('div');
	project.append(div);
	const h3 = document.createElement('h3');
	h3.textContent = d.name;
	const p = document.createElement('p');
	p.textContent = d.description;
	div.append(h3, p);
	projects.append(project);
}
