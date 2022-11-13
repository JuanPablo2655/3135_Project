'use strict';
// Projects
const projects = document.querySelector('.projects');
// console.log(projects);

const _projects = async () => await (await fetch('./data/projects.json')).json();
_projects().then(data => {
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

// Blogs

const blogs = document.querySelector('.main-blogs');
console.log(blogs);
const _blogs = async () => await (await fetch('./data/blogs.json')).json();
_blogs().then(data => {
	const years = [...new Set(data.map(d => d.date.split('-')[0]))].sort((a, b) => b - a);
	console.log(years);
	years.forEach(y => {
		addYear(y);
		data.filter(d => d.date.split('-')[0] === y).forEach(d => addBlog(d));
	});
	// data.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(d => addBlog(d));
});

function addYear(y) {
	const year = document.createElement('div');
	year.classList.add('blog-year');
	blogs.append(year);
	const h2 = document.createElement('h2');
	h2.textContent = y;
	year.append(h2);
	const blogs = document.createElement('div');
	blogs.classList.add('blogs');
	year.append(blogs);
}

function addBlog(d) {}
