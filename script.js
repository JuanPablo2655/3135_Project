'use strict';
// Projects
const projects = document.querySelector('.projects');

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
const _blogs = async () => await (await fetch('./data/blogs.json')).json();
_blogs().then(data => {
	const years = [...new Set(data.map(d => d.date.split('-')[0]))].sort((a, b) => b - a);
	years.forEach(y => {
		const year = addYear(y);
		data
			.filter(d => d.date.split('-')[0] === y)
			.sort((a, b) => new Date(b.date.replace(/-/g, '/')) - new Date(a.date.replace(/-/g, '/')))
			.forEach(d => addBlog(year, d));
	});
});

function addYear(y) {
	const year = document.createElement('div');
	year.classList.add('blog-year');
	blogs.append(year);
	const h2 = document.createElement('h2');
	h2.textContent = y;
	year.append(h2);
	const _blogs = document.createElement('div');
	_blogs.classList.add('blogs');
	year.append(_blogs);
	return _blogs;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function addBlog(year, d) {
	const div = document.createElement('div');
	div.classList.add('blog');
	const h3 = document.createElement('h3');
	h3.innerText = d.name;
	div.append(h3);
	const p = document.createElement('p');
	const date = new Date(d.date.replace(/-/g, '/'));
	p.innerText = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
	div.append(p);
	year.append(div);
}
